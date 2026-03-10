
import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const Header: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-orange-400 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-orange-200">K</div>
        <span className="font-black text-xl tracking-tighter text-gray-900">KANINA</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right mr-2 hidden sm:block">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Rol Activo</p>
          <p className="text-xs font-black text-orange-500 uppercase">{user?.activeRole}</p>
        </div>
        <img 
          src={user?.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100'} 
          className="w-10 h-10 rounded-full border-2 border-orange-50 object-cover" 
          alt="Avatar"
        />
      </div>
    </header>
  );
};
