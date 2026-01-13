
import React from 'react';

interface FooterProps {
  onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-white/30 border-t border-black/5 py-16 px-4 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-12">
        <div className="flex flex-col md:flex-row justify-between w-full gap-12 text-center md:text-left">
          {/* Brand Info */}
          <div className="space-y-4 md:max-w-xs">
            <h3 className="text-2xl font-serif-elegant font-bold tracking-tight">Soriadesignco</h3>
            <p className="text-xs leading-loose text-gray-500 uppercase tracking-widest italic">
              Minimalist ruh, lüks dizayn. Biz sizin tərzinizi tamamlayacaq ən zərif aksesuarları təqdim edirik.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40">Əlaqə</h4>
            <ul className="text-xs space-y-3 font-medium uppercase tracking-widest">
              <li><a href="tel:+994602377137" className="hover:text-[#8B4513] transition-colors">+994 (60) 237 71 37</a></li>
              <li><a href="mailto:info@soriadesignco.com" className="hover:text-[#8B4513] transition-colors">info@soriadesignco.com</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40">Sosial</h4>
            <ul className="text-xs space-y-3 font-medium uppercase tracking-widest">
              <li>
                <a 
                  href="https://instagram.com/soriadesignco" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#8B4513] transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/message/NGD7TDTTFZM6I1" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#8B4513] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full border-t border-black/5 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 select-none">
            <span 
              onClick={onAdminClick} 
              className="cursor-default opacity-50 hover:opacity-100 transition-opacity mr-1"
            >
              &copy;
            </span> 
            {new Date().getFullYear()} Soriadesignco. Bütün hüquqlar qorunur.
          </p>
          
          <div className="flex gap-6 text-[10px] uppercase tracking-widest text-gray-400">
            <span>Bakı, Azərbaycan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
