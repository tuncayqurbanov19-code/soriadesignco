
import React from 'react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cart, updateQuantity, removeFromCart }) => {
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    const itemsText = cart.map(item => `- ${item.title} (${item.quantity} ədəd) - ${(item.price * item.quantity).toFixed(2)} AZN`).join('%0A');
    const message = `Salam, Soriadesignco! Mən sifariş vermək istəyirəm:%0A%0A${itemsText}%0A%0AÜmumi Məbləğ: ${totalPrice.toFixed(2)} AZN`;
    const whatsappUrl = `https://wa.me/994602377137?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-[#F5F5DC] z-50 shadow-2xl transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-black/10 flex justify-between items-center">
            <h2 className="text-xl font-serif-elegant font-bold uppercase tracking-widest">Səbətiniz</h2>
            <button onClick={onClose} className="p-2 hover:opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="italic uppercase text-xs tracking-widest">Səbətiniz boşdur</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-20 bg-white shrink-0">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wide leading-tight">{item.title}</h4>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-black">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                         </svg>
                      </button>
                    </div>
                    <p className="text-xs text-[#8B4513] mt-1 font-semibold">{item.price.toFixed(2)} AZN</p>
                    <div className="flex items-center gap-3 mt-3">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 border border-black/10 flex items-center justify-center text-xs hover:bg-black hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 border border-black/10 flex items-center justify-center text-xs hover:bg-black hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-black/10 bg-white/30">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm uppercase tracking-widest font-bold">Cəmi:</span>
                <span className="text-lg font-serif-elegant font-bold">{totalPrice.toFixed(2)} AZN</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-[#8B4513] text-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-black transition-colors duration-300"
              >
                Sifarişi Tamamla
              </button>
              <p className="text-[10px] text-center mt-4 text-gray-500 uppercase tracking-widest italic">
                WhatsApp vasitəsilə təsdiqləyin
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
