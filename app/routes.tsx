
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Login } from '../pages/Login';
import { Onboarding } from '../pages/Onboarding';
import { Dashboard } from '../pages/Dashboard';
import { Pets } from '../pages/Pets';
import { Plans } from '../pages/Plans';
import { Match } from '../pages/Match';
import { Profile } from '../pages/Profile';
import { Layout } from '../components/Layout';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="p-10 flex flex-col items-center justify-center h-full text-center opacity-30 mt-20">
    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
      <i className="fa-solid fa-rocket text-4xl"></i>
    </div>
    <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter">{title}</h2>
    <p className="font-bold text-gray-500 uppercase tracking-widest text-xs">Próxima Fase</p>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
      
      <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="pets" element={<Pets />} />
        <Route path="plans" element={<Plans />} />
        <Route path="match" element={<Match />} />
        <Route path="messages" element={<PlaceholderPage title="Mensajes" />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="/" element={<Navigate to="/app" />} />
    </Routes>
  );
};
