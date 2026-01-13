
import React, { useState } from 'react';
import { ADMIN_CREDENTIALS } from '../constants';

interface AdminModalProps {
  onClose: () => void;
  onLogin: () => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Zəhmət olmasa düzgün email formatı daxil edin.');
      return;
    }

    setIsLoading(true);

    // Süni gecikmə - UX üçün
    setTimeout(() => {
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        onLogin();
      } else {
        setError('Email və ya şifrə yanlışdır.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative bg-[#F5F5DC] w-full max-w-md p-8 shadow-2xl animate-fade-in border border-black/10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-serif-elegant font-bold tracking-tight uppercase">Giriş</h2>
          <button onClick={onClose} className="p-2 hover:opacity-60 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-transparent border-b border-black py-3 focus:outline-none focus:border-[#8B4513] transition-colors"
              placeholder="nümunə@gmail.com"
              required
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Şifrə</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="bg-transparent border-b border-black py-3 focus:outline-none focus:border-[#8B4513] transition-colors"
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>

          {error && <p className="text-[10px] text-red-600 italic font-medium uppercase tracking-wider">{error}</p>}

          <div className="flex flex-col gap-3">
            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full bg-black text-white py-4 uppercase tracking-[0.2em] text-xs font-bold transition-all duration-300 transform active:scale-95 shadow-lg flex items-center justify-center gap-2
                ${isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:bg-[#8B4513]'}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Yüklənir...
                </>
              ) : (
                'Daxil Ol'
              )}
            </button>
          </div>
        </form>
        
        <p className="text-[9px] text-center mt-6 text-gray-400 uppercase tracking-widest italic">
          Soriadesignco Management System v2.0
        </p>
      </div>
    </div>
  );
};

export default AdminModal;
