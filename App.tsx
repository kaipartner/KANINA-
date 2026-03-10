
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './lib/auth';
import { AppRoutes } from './app/routes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
