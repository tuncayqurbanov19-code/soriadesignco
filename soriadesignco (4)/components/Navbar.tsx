
import React, { useState, useEffect } from 'react';
import { Category } from '../types';
import { CATEGORIES } from '../constants';

interface NavbarProps {
  activeCategory: Category | 'Home';
  setActiveCategory: (cat: Category | 'Home') => void;
  onCartClick: () => void;
  onLogoClick: () => void;
  onLoginClick: () => void;
  isAdminLoggedIn: boolean;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ 
  activeCategory, 
  setActiveCategory, 
  onCartClick, 
  onLogoClick, 
  onLoginClick,
  isAdminLoggedIn,
  cartCount 
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleString('az-AZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#F5F5DC]/95 backdrop-blur-md z-40 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-4">
        <div className="flex justify-between items-center">
          {/* Left: Clock */}
          <div className="hidden sm:block text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium text-gray-400 w-1/3">
            {formattedTime}
          </div>

          {/* Center: Brand (Clickable Logo) */}
          <div className="flex flex-col items-center w-full sm:w-1/3 cursor-pointer" onClick={onLogoClick}>
            <h1 className="text-2xl md:text-4xl font-serif-elegant font-bold tracking-tight hover:opacity-70 transition-opacity">
              Soriadesignco
            </h1>
            <p className="text-[9px] md:text-xs uppercase tracking-[0.3em] mt-1 italic text-[#8B4513]">
              Lüks & Minimalizm
            </p>
          </div>

          {/* Right: Actions (Login & Cart) */}
          <div className="flex items-center justify-end w-1/3 gap-4 md:gap-8">
            <button 
              onClick={onLoginClick}
              className="group flex items-center transition-all duration-300"
            >
              <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold group-hover:text-[#8B4513]">
                {isAdminLoggedIn ? 'Admin Panel' : 'Daxil ol'}
              </span>
            </button>

            <button 
              onClick={onCartClick}
              className="relative flex items-center group hover:opacity-70 transition-opacity"
            >
              <span className="hidden sm:inline text-xs uppercase tracking-widest font-semibold mr-2">Səbət</span>
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center bg-[#8B4513] text-white rounded-full w-4 h-4 text-[8px] font-bold animate-opacity-fade">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Categories Tabs */}
        <nav className="mt-6 -mx-4 px-4 overflow-x-auto no-scrollbar">
          <ul className="flex whitespace-nowrap md:flex-wrap justify-start md:justify-center gap-x-6 md:gap-x-12 pb-2 md:pb-0">
            <li>
              <button
                onClick={() => setActiveCategory('Home')}
                className={`text-[11px] md:text-sm uppercase tracking-[0.15em] py-2 transition-all duration-300 relative
                  ${activeCategory === 'Home' ? 'font-bold text-black' : 'font-normal text-gray-400 hover:text-black'}`}
              >
                Ana Səhifə
                {activeCategory === 'Home' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#8B4513] transform scale-x-100 transition-transform duration-300"></span>
                )}
              </button>
            </li>
            {CATEGORIES.map(cat => (
              <li key={cat} className="shrink-0">
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[11px] md:text-sm uppercase tracking-[0.15em] py-2 transition-all duration-300 relative
                    ${activeCategory === cat ? 'font-bold text-black' : 'font-normal text-gray-400 hover:text-black'}`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#8B4513] transform scale-x-100 transition-transform duration-300"></span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
