
import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">¡Hola, {user?.displayName.split(' ')[0]}! 🐾</h1>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">Bienvenido a la manada</p>
      </div>

      {/* Hero AI Promo */}
      <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-orange-500 to-coral-500 p-8 text-white mb-8 shadow-2xl shadow-orange-200 group">
        <div className="absolute -right-10 -bottom-10 opacity-20 transform -rotate-12 transition-transform group-hover:rotate-0 duration-700">
          <i className="fa-solid fa-user-doctor text-[180px]"></i>
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Asistente IA Online
          </div>
          <h3 className="text-3xl font-black mb-2 tracking-tight">Experto KANINA</h3>
          <p className="text-sm text-white/90 font-medium max-w-[80%] leading-relaxed mb-6">¿Tu perro estornuda mucho? ¿Tu gato no quiere comer? Nuestra IA veterinaria te orienta al instante.</p>
          <button className="bg-white text-orange-600 px-6 py-3 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all">
            Consultar ahora
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-white p-6 rounded-[32px] border-2 border-gray-50 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-teal-50 text-teal-500 rounded-2xl flex items-center justify-center mb-4">
            <i className="fa-solid fa-heart-pulse text-xl"></i>
          </div>
          <h4 className="font-black text-gray-900 text-lg leading-tight mb-1">Salud</h4>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Próximas Vacunas</p>
          <p className="mt-4 text-xs font-bold text-teal-600 bg-teal-50 py-2 px-3 rounded-xl inline-block">Al día ✓</p>
        </div>
        <div className="bg-white p-6 rounded-[32px] border-2 border-gray-50 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4">
            <i className="fa-solid fa-calendar-check text-xl"></i>
          </div>
          <h4 className="font-black text-gray-900 text-lg leading-tight mb-1">Planes</h4>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Hoy en tu zona</p>
          <p className="mt-4 text-xs font-bold text-blue-600 bg-blue-50 py-2 px-3 rounded-xl inline-block">2 Cerca</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-black text-gray-900 tracking-tighter">Comunidad</h2>
          <button className="text-[10px] font-black text-orange-500 uppercase tracking-widest bg-orange-50 px-4 py-2 rounded-full">Ver muro</button>
        </div>
        
        <div className="bg-white border-2 border-gray-50 rounded-[40px] overflow-hidden shadow-sm">
          <div className="relative h-56">
            <img src="https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?auto=format&fit=crop&w=600" className="w-full h-full object-cover" alt="Community"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100" />
              </div>
              <div className="text-white">
                <p className="text-xs font-black uppercase tracking-widest">Elena & Rayo</p>
                <p className="text-[10px] text-white/80">A 500m • Hace 10 min</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm font-bold text-gray-600 leading-relaxed italic">"Buscamos amigos para correr en el parque del Canal hoy a las 18:00. ¡Rayo es súper sociable! 🐶✨"</p>
          </div>
        </div>
      </div>
    </div>
  );
};
