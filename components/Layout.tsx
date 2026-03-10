
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout: React.FC = () => {
  const navItems = [
    { to: '/app', icon: 'fa-house', label: 'Inicio' },
    { to: '/app/pets', icon: 'fa-paw', label: 'Animales' },
    { to: '/app/plans', icon: 'fa-calendar-day', label: 'Planes' },
    { to: '/app/messages', icon: 'fa-comment-dots', label: 'Chats' },
    { to: '/app/profile', icon: 'fa-circle-user', label: 'Perfil' },
  ];

  return (
    <div className="min-h-screen flex flex-col max-w-[480px] mx-auto bg-white shadow-2xl relative overflow-hidden font-sans">
      <Header />

      <main className="flex-1 overflow-y-auto pb-32">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white/90 backdrop-blur-xl border-t px-6 pt-4 pb-8 flex justify-between items-center z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/app'}
            className={({ isActive }) => 
              `flex flex-col items-center justify-center gap-1.5 transition-all w-14 ${
                isActive ? 'text-orange-500' : 'text-gray-300'
              }`
            }
          >
            <i className={`fa-solid ${item.icon} text-xl transition-transform ${item.to === '/app/pets' ? 'hover:scale-125' : ''}`}></i>
            <span className="text-[9px] font-black uppercase tracking-wider">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
