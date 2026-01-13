
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAdd: () => void;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd, onClick }) => {
  return (
    <div className="group flex flex-col items-start w-full cursor-pointer" onClick={onClick}>
      <div className="relative aspect-square w-full bg-white overflow-hidden mb-4">
        <img 
          src={product.imageUrl} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center animate-opacity-fade">
            <span className="text-white uppercase tracking-widest text-xs font-bold border border-white px-4 py-2">
              Tükənib
            </span>
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (product.inStock) onAdd();
          }}
          disabled={!product.inStock}
          className={`absolute bottom-4 right-4 bg-black text-white w-10 h-10 flex items-center justify-center rounded-full opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0
            ${!product.inStock ? 'cursor-not-allowed opacity-0' : 'hover:bg-[#8B4513]'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      
      <div className="w-full">
        <h3 className="text-sm md:text-base font-serif-elegant font-bold leading-tight uppercase tracking-wide mb-1">
          {product.title}
        </h3>
        <p className="text-xs md:text-sm text-[#8B4513] font-medium tracking-widest">
          {product.price.toFixed(2)} AZN
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
