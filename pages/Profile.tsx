
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { RoleSwitcher } from '../components/RoleSwitcher';
import { Button } from '../components/Button';

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <div className="relative mb-12">
        <div className="h-40 bg-gradient-to-tr from-orange-500/20 to-coral-500/20 rounded-[40px] mb-[-40px]"></div>
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-[48px] border-8 border-white shadow-2xl relative overflow-hidden mb-4 bg-white">
            <img 
              src={user?.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300'} 
              className="w-full h-full object-cover" 
              alt="Profile"
            />
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter">{user?.displayName}</h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{user?.email}</p>
        </div>
      </div>

      <div className="bg-gray-50/50 p-6 rounded-[40px] border-2 border-gray-50 mb-8">
        <div className="flex items-center justify-between mb-6 px-1">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Roles de Comunidad</h3>
          <span className="text-[10px] font-black bg-orange-500 text-white px-3 py-1 rounded-full uppercase">Multi-Rol</span>
        </div>
        <RoleSwitcher />
      </div>

      <div className="space-y-3 px-2">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1">Configuración</h3>
        
        {[
          { icon: 'fa-shield-halved', label: 'Privacidad y Seguridad', color: 'text-teal-500' },
          { icon: 'fa-credit-card', label: 'Suscripción KANINA Pro', color: 'text-orange-500' },
          { icon: 'fa-bell', label: 'Notificaciones', color: 'text-blue-500' },
          { icon: 'fa-circle-question', label: 'Ayuda y Soporte', color: 'text-gray-400' },
        ].map((item, idx) => (
          <button 
            key={idx}
            className="w-full flex items-center justify-between p-5 bg-white rounded-3xl border-2 border-transparent hover:border-orange-100 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 bg-gray-50 rounded-2xl flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <span className="font-bold text-gray-700">{item.label}</span>
            </div>
            <i className="fa-solid fa-chevron-right text-gray-200"></i>
          </button>
        ))}

        <button 
          onClick={logout}
          className="w-full mt-8 flex items-center justify-center gap-3 p-5 bg-red-50 text-red-500 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-red-100 transition-colors"
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          Cerrar Sesión Segura
        </button>
      </div>

      <div className="mt-12 text-center pb-20">
        <p className="text-[10px] text-gray-300 font-black uppercase tracking-[0.3em]">Hecho con ♥ por Kanina Team</p>
        <p className="text-[8px] text-gray-200 font-bold uppercase tracking-widest mt-1">v1.0.0-phase1-stable</p>
      </div>
    </div>
  );
};
