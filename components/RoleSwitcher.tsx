
import React from 'react';
import { useAuth } from '../lib/auth';
import { UserRole } from '../types';

export const RoleSwitcher: React.FC = () => {
  const { user, switchRole } = useAuth();

  if (!user) return null;

  const roleConfig = {
    [UserRole.OWNER]: { icon: 'fa-paw', label: 'Dueño', color: 'bg-orange-500' },
    [UserRole.SITTER]: { icon: 'fa-shield-dog', label: 'Cuidador', color: 'bg-teal-500' },
    [UserRole.BUSINESS]: { icon: 'fa-shop', label: 'Negocio', color: 'bg-blue-500' },
    [UserRole.ADMIN]: { icon: 'fa-user-gear', label: 'Admin', color: 'bg-gray-800' },
  };

  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {user.roles.map((role) => {
        const isActive = user.activeRole === role;
        const config = roleConfig[role];
        return (
          <button
            key={role}
            onClick={() => switchRole(role)}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
              isActive 
                ? 'border-orange-500 bg-orange-50 text-orange-700' 
                : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
            }`}
          >
            <i className={`fa-solid ${config.icon} text-2xl`}></i>
            <span className="text-sm font-bold uppercase tracking-wide">{config.label}</span>
            {isActive && <div className="w-2 h-2 rounded-full bg-orange-500 mt-1"></div>}
          </button>
        );
      })}
    </div>
  );
};
