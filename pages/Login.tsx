
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await login(email);
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Background with multiple animal images */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200" 
          className="w-full h-full object-cover opacity-50 grayscale"
          alt="Pets Background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6 animate-in fade-in zoom-in duration-700">
        <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-tr from-orange-500 to-orange-400 rounded-3xl flex items-center justify-center text-white text-4xl font-black mb-4 shadow-xl shadow-orange-100 rotate-6">K</div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Bienvenido</h1>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1 text-center">Tu comunidad animal inteligente</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
              <input 
                type="email" 
                placeholder="nombre@ejemplo.com"
                className="w-full bg-gray-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-2xl px-5 py-4 transition-all outline-none font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Contraseña</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-gray-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-2xl px-5 py-4 transition-all outline-none font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <Button className="w-full py-5 rounded-2xl text-lg mt-2" isLoading={loading}>
              Iniciar Sesión
            </Button>
          </form>

          <div className="relative my-10 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <span className="relative bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">O continúa con</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => login('google@user.com')}
              className="flex items-center justify-center gap-3 py-4 bg-white border-2 border-gray-100 rounded-2xl hover:border-orange-200 transition-all active:scale-95 group"
            >
              <i className="fa-brands fa-google text-xl text-gray-400 group-hover:text-red-500 transition-colors"></i>
              <span className="font-bold text-gray-700">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-4 bg-black rounded-2xl hover:bg-gray-800 transition-all active:scale-95">
              <i className="fa-brands fa-apple text-xl text-white"></i>
              <span className="font-bold text-white">Apple</span>
            </button>
          </div>

          <p className="mt-8 text-center text-[10px] text-gray-400 font-medium px-4">
            Al registrarte aceptas los <a href="#" className="underline text-gray-600">Términos de Servicio</a> y la <a href="#" className="underline text-gray-600">Política de Privacidad</a> de KANINA.
          </p>
        </div>
      </div>
    </div>
  );
};
