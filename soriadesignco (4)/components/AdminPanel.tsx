
import React, { useState } from 'react';
import { Product, Category } from '../types';
import { CATEGORIES } from '../constants';

interface AdminPanelProps {
  products: Product[];
  onAdd: (product: Omit<Product, 'id'>) => void;
  onDelete: (id: string) => void;
  onToggleStock: (id: string) => void;
}

type AdminTab = 'list' | 'add';

const AdminPanel: React.FC<AdminPanelProps> = ({ products, onAdd, onDelete, onToggleStock }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('list');
  const [isQuickAdd, setIsQuickAdd] = useState(true);
  
  const [newProd, setNewProd] = useState<Omit<Product, 'id'>>({
    title: '',
    price: 0,
    imageUrl: '',
    category: 'Saatlar',
    inStock: true,
    description: '',
    materials: ''
  });

  const [quickProd, setQuickProd] = useState({
    title: '',
    category: 'Saatlar' as Category
  });

  const handleFullSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.title || !newProd.imageUrl || newProd.price <= 0) {
      alert('Zəhmət olmasa bütün xanaları tam doldurun.');
      return;
    }
    onAdd(newProd);
    setNewProd({
      title: '',
      price: 0,
      imageUrl: '',
      category: 'Saatlar',
      inStock: true,
      description: '',
      materials: ''
    });
    setActiveTab('list');
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickProd.title) {
      alert('Zəhmət olmasa başlıq daxil edin.');
      return;
    }
    
    onAdd({
      title: quickProd.title,
      category: quickProd.category,
      price: 0,
      imageUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000&auto=format&fit=crop',
      inStock: true,
      description: 'Məhsul haqqında ətraflı məlumat tezliklə əlavə olunacaq.',
      materials: '-'
    });

    setQuickProd({ ...quickProd, title: '' });
    setActiveTab('list');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Tab Switcher */}
      <div className="flex border-b border-black/5 mb-8">
        <button
          onClick={() => setActiveTab('list')}
          className={`px-6 py-4 text-[11px] uppercase tracking-[0.2em] font-bold transition-all relative ${
            activeTab === 'list' ? 'text-black' : 'text-gray-400 hover:text-black'
          }`}
        >
          Məhsul İdarəetməsi
          {activeTab === 'list' && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8B4513]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('add')}
          className={`px-6 py-4 text-[11px] uppercase tracking-[0.2em] font-bold transition-all relative ${
            activeTab === 'add' ? 'text-black' : 'text-gray-400 hover:text-black'
          }`}
        >
          Yeni Məhsul
          {activeTab === 'add' && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8B4513]" />
          )}
        </button>
      </div>

      {activeTab === 'add' ? (
        <section className="bg-white/50 p-6 md:p-10 rounded-sm shadow-sm border border-black/5 animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <h3 className="text-xl font-serif-elegant font-bold uppercase tracking-widest">
              {isQuickAdd ? 'Tez Əlavə Et' : 'Tam Məlumatlı Məhsul'}
            </h3>
            <div className="flex bg-black/5 p-1 rounded-full">
              <button 
                onClick={() => setIsQuickAdd(true)}
                className={`px-4 py-1.5 text-[9px] uppercase tracking-widest font-bold rounded-full transition-all duration-300 ${isQuickAdd ? 'bg-black text-white shadow-md' : 'text-gray-400 hover:text-black'}`}
              >
                Tez
              </button>
              <button 
                onClick={() => setIsQuickAdd(false)}
                className={`px-4 py-1.5 text-[9px] uppercase tracking-widest font-bold rounded-full transition-all duration-300 ${!isQuickAdd ? 'bg-black text-white shadow-md' : 'text-gray-400 hover:text-black'}`}
              >
                Tam
              </button>
            </div>
          </div>

          {isQuickAdd ? (
            <form onSubmit={handleQuickSubmit} className="flex flex-col md:flex-row items-end gap-8 animate-fade-in">
              <div className="flex flex-col space-y-2 flex-grow w-full">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Məhsulun Adı</label>
                <input 
                  type="text" 
                  value={quickProd.title} 
                  onChange={e => setQuickProd({...quickProd, title: e.target.value})}
                  className="bg-transparent border-b border-black py-2 focus:outline-none focus:border-[#8B4513] text-sm w-full"
                  placeholder="Məs: Yeni Kolleksiya Saat"
                />
              </div>
              <div className="flex flex-col space-y-2 w-full md:w-64">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Kateqoriya</label>
                <select 
                  value={quickProd.category} 
                  onChange={e => setQuickProd({...quickProd, category: e.target.value as Category})}
                  className="bg-transparent border-b border-black py-2 focus:outline-none focus:border-[#8B4513] text-sm w-full"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <button 
                type="submit"
                className="w-full md:w-auto bg-black text-white px-12 py-4 uppercase tracking-widest text-[10px] font-bold hover:bg-[#8B4513] transition-colors"
              >
                Təsdiqlə
              </button>
            </form>
          ) : (
            <form onSubmit={handleFullSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Başlıq</label>
                <input 
                  type="text" 
                  value={newProd.title} 
                  onChange={e => setNewProd({...newProd, title: e.target.value})}
                  className="bg-transparent border-b border-black py-2 focus:outline-none focus:border-[#8B4513] text-sm"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Qiymət (AZN)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={newProd.price || ''} 
                  onChange={e => setNewProd({...newProd, price: parseFloat(e.target.value)})}
                  className="bg-transparent border-b border-black py-2 focus:outline-none focus:border-[#8B4513] text-sm"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Kateqoriya</label>
                <select 
                  value={newProd.category} 
                  onChange={e => setNewProd({...newProd, category: e.target.value as Category})}
                  className="bg-transparent border-b border-black py-2 focus:outline-none focus:border-[#8B4513] text-sm"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              
              <div className="flex flex-col space-y-2 md:col-span-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Təsvir</label>
                <textarea 
                  value={newProd.description} 
                  onChange={e => setNewProd({...newProd, description: e.target.value})}
                  className="bg-transparent border-b border-black py-2 focus:outline-none focus:border-[#8B4513] text-sm resize-none h-24"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Materiallar</label>
                <input 
                  type="text" 
                  value={newProd.materials} 
                  onChange={e => setNewProd({...newProd, materials: e.target.value})}
                  className="bg-transparent border-b border-black py-2 focus:outline-none focus:border-[#8B4513] text-sm"
                />
              </div>

              <div className="flex flex-col space-y-2 md:col-span-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Şəkil URL</label>
                <div className="flex items-center gap-6">
                  <input 
                    type="text" 
                    value={newProd.imageUrl} 
                    onChange={e => setNewProd({...newProd, imageUrl: e.target.value})}
                    className="flex-grow bg-transparent border-b border-black py-2 focus:outline-none focus:border-[#8B4513] text-sm"
                  />
                  <div className="w-16 h-16 bg-black/5 border border-black/10 rounded-sm overflow-hidden flex items-center justify-center shrink-0">
                    {newProd.imageUrl ? (
                      <img src={newProd.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-end">
                <button 
                  type="submit"
                  className="w-full bg-black text-white py-4 uppercase tracking-widest text-[10px] font-bold hover:bg-[#8B4513] transition-colors"
                >
                  Məhsulu Əlavə Et
                </button>
              </div>
            </form>
          )}
        </section>
      ) : (
        <section className="animate-fade-in">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-serif-elegant font-bold uppercase tracking-widest">
              İnventar ({products.length})
            </h3>
            <div className="text-[10px] uppercase tracking-widest text-gray-400">
              Satışda: {products.filter(p => p.inStock).length} | Tükənib: {products.filter(p => !p.inStock).length}
            </div>
          </div>
          
          <div className="overflow-x-auto bg-white/30 rounded-sm border border-black/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/10 bg-black/5">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">Şəkil</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">Ad</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">Kateqoriya</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">Qiymət</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">Status</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-400 text-right">Əməliyyat</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b border-black/5 hover:bg-black/5 transition-colors group">
                    <td className="px-6 py-4">
                      <img src={p.imageUrl} className="w-14 h-14 object-cover rounded-sm grayscale group-hover:grayscale-0 transition-all duration-500" alt="" />
                    </td>
                    <td className="px-6 py-4 text-xs font-bold uppercase tracking-wide">{p.title}</td>
                    <td className="px-6 py-4 text-[10px] text-gray-500 uppercase tracking-widest">{p.category}</td>
                    <td className="px-6 py-4 text-xs font-medium">{p.price.toFixed(2)} AZN</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => onToggleStock(p.id)}
                        className={`text-[9px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full border transition-all duration-300
                          ${p.inStock ? 'text-green-600 border-green-600 hover:bg-green-600 hover:text-white' : 'text-red-600 border-red-600 hover:bg-red-600 hover:text-white'}`}
                      >
                        {p.inStock ? 'Satışda' : 'Tükənib'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => {
                          if (confirm('Silmək istədiyinizə əminsiniz?')) onDelete(p.id);
                        }}
                        className="text-red-300 hover:text-red-600 transition-colors p-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};

export default AdminPanel;
