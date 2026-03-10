
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { UserRole } from '../types';
import { Button } from '../components/Button';

export const Onboarding: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>(user?.roles || [UserRole.OWNER]);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const toggleRole = (role: UserRole) => {
    if (selectedRoles.includes(role)) {
      if (selectedRoles.length > 1) setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleFinish = () => {
    updateProfile({ 
      roles: selectedRoles, 
      activeRole: selectedRoles[0],
      marketingOptIn: true 
    });
    navigate('/app');
  };

  const rolesOptions = [
    { id: UserRole.OWNER, label: 'Dueño de mascota', desc: 'Busco cuidados, amigos y servicios', icon: 'fa-paw' },
    { id: UserRole.SITTER, label: 'Cuidador', desc: 'Ofrezco mi tiempo voluntariamente', icon: 'fa-shield-dog' },
    { id: UserRole.BUSINESS, label: 'Negocio', desc: 'Servicios, productos y promos', icon: 'fa-shop' },
  ];

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto p-8 flex flex-col shadow-xl">
      <div className="flex justify-between items-center mb-10">
        <div className="flex gap-1">
          {[1, 2].map(i => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${step >= i ? 'w-8 bg-orange-500' : 'w-4 bg-gray-100'}`}></div>
          ))}
        </div>
        <button onClick={() => navigate('/app')} className="text-gray-400 font-bold text-sm">Omitir</button>
      </div>

      {step === 1 ? (
        <div className="flex-1">
          <h2 className="text-3xl font-black mb-2 leading-tight">¿Cuál es tu papel en KANINA?</h2>
          <p className="text-gray-500 mb-8 font-medium">Puedes elegir varios roles. Los cambiaremos más tarde.</p>
          
          <div className="space-y-4">
            {rolesOptions.map(role => {
              const isActive = selectedRoles.includes(role.id);
              return (
                <button
                  key={role.id}
                  onClick={() => toggleRole(role.id)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${
                    isActive ? 'border-orange-500 bg-orange-50 shadow-md scale-[1.02]' : 'border-gray-100'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${isActive ? 'bg-orange-500 text-white' : 'bg-gray-50 text-gray-400'}`}>
                    <i className={`fa-solid ${role.icon}`}></i>
                  </div>
                  <div className="text-left">
                    <h3 className={`font-bold ${isActive ? 'text-orange-900' : 'text-gray-700'}`}>{role.label}</h3>
                    <p className="text-xs text-gray-500 font-medium">{role.desc}</p>
                  </div>
                  {isActive && <i className="fa-solid fa-circle-check text-orange-500 ml-auto"></i>}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex-1">
          <h2 className="text-3xl font-black mb-2 leading-tight">Configura tu perfil</h2>
          <p className="text-gray-500 mb-8 font-medium">Queremos conocerte a ti y a tus futuros amigos.</p>
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-full border-4 border-orange-50 relative group cursor-pointer overflow-hidden">
              <img src={user?.photoURL || 'https://picsum.photos/200'} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <i className="fa-solid fa-camera text-2xl"></i>
              </div>
            </div>
            <p className="text-xs text-orange-500 font-bold mt-2 uppercase tracking-widest">Cambiar foto</p>
          </div>

          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Nombre completo" 
              className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-orange-500 focus:outline-none" 
              defaultValue={user?.displayName}
            />
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <input type="checkbox" className="w-5 h-5 accent-orange-500 rounded" defaultChecked />
              <span className="text-xs text-gray-600 font-medium">Acepto recibir novedades y promociones personalizadas para mis mascotas.</span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-auto">
        {step === 1 ? (
          <Button className="w-full py-4 text-lg" onClick={() => setStep(2)}>Siguiente</Button>
        ) : (
          <Button className="w-full py-4 text-lg" onClick={handleFinish}>¡Empezar ahora!</Button>
        )}
      </div>
    </div>
  );
};
