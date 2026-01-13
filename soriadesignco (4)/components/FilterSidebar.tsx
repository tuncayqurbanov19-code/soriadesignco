
import React from 'react';
import { Category, StockFilter } from '../types';
import { CATEGORIES } from '../constants';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: Category | 'Home';
  setActiveCategory: (cat: Category | 'Home') => void;
  stockFilter: StockFilter;
  setStockFilter: (filter: StockFilter) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  activeCategory,
  setActiveCategory,
  stockFilter,
  setStockFilter
}) => {
  const stockOptions: StockFilter[] = ['Hamısı', 'Satışda', 'Tükənib'];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-full sm:w-80 bg-[#F5F5DC] z-50 shadow-2xl transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-black/10 flex justify-between items-center">
            <h2 className="text-xl font-serif-elegant font-bold uppercase tracking-widest">Filtrlər</h2>
            <button onClick={onClose} className="p-2 hover:opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-8 space-y-12">
            {/* Category Filter */}
            <section>
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40 mb-6">Kateqoriya</h3>
              <ul className="space-y-4">
                <li>
                  <button
                    onClick={() => { setActiveCategory('Home'); onClose(); }}
                    className={`text-xs uppercase tracking-widest transition-colors ${activeCategory === 'Home' ? 'font-bold text-[#8B4513]' : 'text-gray-500 hover:text-black'}`}
                  >
                    Bütün Məhsullar
                  </button>
                </li>
                {CATEGORIES.map(cat => (
                  <li key={cat}>
                    <button
                      onClick={() => { setActiveCategory(cat); onClose(); }}
                      className={`text-xs uppercase tracking-widest transition-colors ${activeCategory === cat ? 'font-bold text-[#8B4513]' : 'text-gray-500 hover:text-black'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            {/* Stock Filter */}
            <section>
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40 mb-6">Status</h3>
              <div className="flex flex-col gap-4">
                {stockOptions.map(option => (
                  <label key={option} className="flex items-center gap-3 group cursor-pointer">
                    <div 
                      className="relative w-4 h-4 border border-black/20 rounded-full flex items-center justify-center transition-colors group-hover:border-black"
                      onClick={() => setStockFilter(option)}
                    >
                      {stockFilter === option && (
                        <div className="w-2 h-2 bg-[#8B4513] rounded-full animate-opacity-fade" />
                      )}
                    </div>
                    <span 
                      onClick={() => setStockFilter(option)}
                      className={`text-xs uppercase tracking-widest transition-colors ${stockFilter === option ? 'font-bold text-black' : 'text-gray-500'}`}
                    >
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          <div className="p-8 border-t border-black/5">
            <button 
              onClick={onClose}
              className="w-full bg-black text-white py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-[#8B4513] transition-colors"
            >
              Nəticələri Göstər
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
