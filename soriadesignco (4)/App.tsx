
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Product, CartItem, Category, StockFilter } from './types';
import { CATEGORIES, INITIAL_PRODUCTS } from './constants';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import FilterSidebar from './components/FilterSidebar';
import AdminPanel from './components/AdminPanel';
import AdminModal from './components/AdminModal';
import Footer from './components/Footer';
import ProductDetailModal from './components/ProductDetailModal';

const App: React.FC = () => {
  // State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('soria_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('soria_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeCategory, setActiveCategory] = useState<Category | 'Home'>('Home');
  const [stockFilter, setStockFilter] = useState<StockFilter>('Hamısı');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('soria_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('soria_cart', JSON.stringify(cart));
  }, [cart]);

  // Cart Handlers
  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  // Admin Handlers
  const addProduct = useCallback((newProd: Omit<Product, 'id'>) => {
    const product: Product = { ...newProd, id: Date.now().toString() };
    setProducts(prev => [product, ...prev]);
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const toggleStock = useCallback((id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p));
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;
    
    // Category filter
    if (activeCategory !== 'Home') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Stock filter
    if (stockFilter === 'Satışda') {
      result = result.filter(p => p.inStock);
    } else if (stockFilter === 'Tükənib') {
      result = result.filter(p => !p.inStock);
    }

    return result;
  }, [products, activeCategory, stockFilter]);

  const handleLogoClick = () => {
    setActiveCategory('Home');
    setStockFilter('Hamısı');
    setShowAdminPanel(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginClick = () => {
    if (isAdminLoggedIn) {
      setShowAdminPanel(true);
      setActiveCategory('Home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsAdminModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        onCartClick={() => setIsCartOpen(true)}
        onLogoClick={handleLogoClick}
        onLoginClick={handleLoginClick}
        isAdminLoggedIn={isAdminLoggedIn}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
      />

      <main className="flex-grow pt-44 pb-16 px-4 md:px-12 max-w-7xl mx-auto w-full transition-all duration-500">
        {showAdminPanel && isAdminLoggedIn ? (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-serif-elegant font-bold uppercase tracking-widest">Admin Paneli</h2>
              <button 
                onClick={() => setShowAdminPanel(false)}
                className="text-xs uppercase tracking-widest border-b border-black hover:opacity-60 transition-opacity"
              >
                Mağazaya Qayıt
              </button>
            </div>
            <AdminPanel 
              products={products} 
              onAdd={addProduct} 
              onDelete={deleteProduct} 
              onToggleStock={toggleStock} 
            />
          </div>
        ) : (
          <div className="animate-fade-in">
            {activeCategory === 'Home' && (
              <section className="text-center mb-20 px-4">
                <h2 className="text-4xl md:text-6xl font-serif-elegant font-bold mb-6 tracking-tight animate-fade-in">
                  Xoş Gəlmisiniz
                </h2>
                <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-500 uppercase tracking-[0.2em] leading-relaxed italic">
                  Minimalist dizayn, yüksək keyfiyyət və lüksün ən sadə halı. <br className="hidden md:block"/> Soriadesignco ilə öz tərzinizi kəşf edin.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <div className="w-12 h-[1px] bg-black/10 self-center"></div>
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#8B4513]">Kollesiyanı İndi Görün</span>
                    <div className="w-12 h-[1px] bg-black/10 self-center"></div>
                </div>
              </section>
            )}

            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
              <h1 className="text-2xl md:text-4xl font-serif-elegant text-center md:text-left tracking-tight uppercase">
                {activeCategory === 'Home' ? 'Bütün Məhsullar' : activeCategory}
              </h1>

              <button 
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2 group border border-black/10 px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span className="text-[10px] uppercase tracking-widest font-bold">Filtrlər</span>
                {stockFilter !== 'Hamısı' && (
                  <span className="w-2 h-2 bg-[#8B4513] rounded-full" />
                )}
              </button>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAdd={() => addToCart(product)} 
                    onClick={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500 italic px-4 uppercase tracking-widest text-xs">
                Bu kriteriyalara uyğun məhsul yoxdur.
              </div>
            )}
          </div>
        )}
      </main>

      <Footer 
        onAdminClick={handleLoginClick} 
      />

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />

      <FilterSidebar 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        stockFilter={stockFilter}
        setStockFilter={setStockFilter}
      />

      {isAdminModalOpen && (
        <AdminModal 
          onClose={() => setIsAdminModalOpen(false)} 
          onLogin={() => {
            setIsAdminLoggedIn(true);
            setIsAdminModalOpen(false);
            setShowAdminPanel(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />
      )}

      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAdd={() => {
            addToCart(selectedProduct);
            setSelectedProduct(null);
          }}
        />
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes opacity-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-opacity-fade {
          animation: opacity-fade 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
