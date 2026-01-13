
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAdd: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onAdd }) => {
  const [activeImage, setActiveImage] = useState(product.imageUrl);
  const allImages = [product.imageUrl, ...(product.additionalImages || [])];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-0 md:p-6 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md" 
        onClick={onClose}
      />
      
      <div className="relative bg-[#F5F5DC] w-full max-w-5xl h-full md:h-auto md:max-h-[90vh] overflow-y-auto animate-fade-in shadow-2xl flex flex-col md:flex-row">
        {/* Close button for mobile */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-2 bg-black/10 rounded-full md:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Gallery */}
        <div className="w-full md:w-1/2 p-6 flex flex-col gap-4">
          <div className="aspect-square w-full bg-white overflow-hidden rounded-sm">
            <img 
              src={activeImage} 
              alt={product.title} 
              className="w-full h-full object-cover transition-opacity duration-500"
            />
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
              {allImages.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 shrink-0 border-2 transition-colors rounded-sm overflow-hidden 
                    ${activeImage === img ? 'border-[#8B4513]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B4513] font-bold mb-2 block">
              {product.category}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif-elegant font-bold leading-tight mb-4 uppercase tracking-tight">
              {product.title}
            </h2>
            <p className="text-xl font-medium text-black/80 tracking-widest">
              {product.price.toFixed(2)} AZN
            </p>
          </div>

          <div className="space-y-6 mb-10">
            {product.description && (
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">Təsvir</h4>
                <p className="text-sm leading-relaxed text-gray-700 italic">
                  {product.description}
                </p>
              </div>
            )}
            
            {product.materials && (
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">Materiallar</h4>
                <p className="text-sm text-gray-700">
                  {product.materials}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <button 
              disabled={!product.inStock}
              onClick={onAdd}
              className={`w-full py-4 uppercase tracking-[0.2em] text-xs font-bold transition-all duration-300
                ${product.inStock 
                  ? 'bg-black text-white hover:bg-[#8B4513]' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              {product.inStock ? 'Səbətə Əlavə Et' : 'Tükənib'}
            </button>
            
            <button 
              onClick={onClose}
              className="w-full py-4 uppercase tracking-[0.2em] text-[10px] font-bold text-black/40 hover:text-black transition-colors md:block hidden"
            >
              Bağla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
