'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUserPermissions, hasPermission } from '@/lib/permissions';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string; // ID do papel
  status: 'active' | 'inactive';
  lastLogin?: Date | null;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  userPermissions: string[];
  hasPermission: (permission: string) => boolean;
  hasRole: (roleId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userPermissions, setUserPermissions] = useState<string[]>([]);

  useEffect(() => {
    // Carregar usuário do localStorage ao inicializar
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        
        // Carregar permissões do usuário
        const permissions = getUserPermissions([userData.role]);
        setUserPermissions(permissions);
      } catch (error) {
        console.error('Erro ao carregar usuário do localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Carregar usuários do localStorage
      const usersData = localStorage.getItem('users');
      if (!usersData) {
        return false;
      }

      const users: User[] = JSON.parse(usersData);
      const foundUser = users.find(u => u.email === email && u.password === password && u.status === 'active');

      if (foundUser) {
        // Atualizar último login
        const updatedUser = { ...foundUser, lastLogin: new Date() };
        setUser(updatedUser);
        
        // Salvar no localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Atualizar usuário na lista
        const updatedUsers = users.map(u => u.id === foundUser.id ? updatedUser : u);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        
        // Carregar permissões do usuário
        const permissions = getUserPermissions([updatedUser.role]);
        setUserPermissions(permissions);
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setUserPermissions([]);
    localStorage.removeItem('user');
  };

  const hasPermission = (permission: string): boolean => {
    return userPermissions.includes(permission);
  };

  const hasRole = (roleId: string): boolean => {
    return user?.role === roleId;
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    userPermissions,
    hasPermission,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
