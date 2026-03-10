
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, UserRole, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  switchRole: (role: UserRole) => void;
}

// Fix: Export AuthContext so it can be imported by hooks/useAuth.ts
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Mock initial session check
  useEffect(() => {
    const savedUser = localStorage.getItem('kanina_user');
    if (savedUser) {
      setState({ user: JSON.parse(savedUser), loading: false, error: null });
    } else {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email: string) => {
    setState(prev => ({ ...prev, loading: true }));
    // Simulate Firebase login
    setTimeout(() => {
      const mockUser: UserProfile = {
        uid: 'user123',
        email,
        displayName: email.split('@')[0],
        photoURL: 'https://picsum.photos/200',
        roles: [UserRole.OWNER],
        activeRole: UserRole.OWNER,
        marketingOptIn: false,
        subscriptionActive: false,
        createdAt: Date.now(),
      };
      localStorage.setItem('kanina_user', JSON.stringify(mockUser));
      setState({ user: mockUser, loading: false, error: null });
    }, 800);
  };

  const logout = () => {
    localStorage.removeItem('kanina_user');
    setState({ user: null, loading: false, error: null });
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!state.user) return;
    const updatedUser = { ...state.user, ...updates };
    localStorage.setItem('kanina_user', JSON.stringify(updatedUser));
    setState(prev => ({ ...prev, user: updatedUser }));
  };

  const switchRole = (role: UserRole) => {
    if (state.user?.roles.includes(role)) {
      updateProfile({ activeRole: role });
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateProfile, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
