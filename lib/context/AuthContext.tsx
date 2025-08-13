'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getUserPermissions, hasPermission } from '@/lib/permissions';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  status: 'active' | 'inactive';
  isActive: boolean;
  permissions: string[];
  createdAt: Date;
  lastLogin?: Date | null;
  aiUsageLimit?: number;
  aiUsageCount?: number;
  aiUsageResetDate?: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  userPermissions: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  userPermissions: string[];
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  checkAIUsageLimit: () => boolean;
  incrementAIUsage: () => void;
  hasPermission: (permissionName: string) => boolean;
  hasRole: (roleId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'SET_PERMISSIONS'; payload: string[] }
  | { type: 'INCREMENT_AI_USAGE' }
  | { type: 'LOGOUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case 'SET_PERMISSIONS':
      return {
        ...state,
        userPermissions: action.payload,
      };
    case 'INCREMENT_AI_USAGE':
      return {
        ...state,
        user: state.user
          ? { ...state.user, aiUsageCount: (state.user.aiUsageCount || 0) + 1 }
          : null,
      };
    case 'LOGOUT':
      return {
        user: null,
        isLoading: false,
        isAuthenticated: false,
        userPermissions: [],
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  userPermissions: [],
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Verificar se há um usuário salvo no localStorage
    const initAuth = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          if (userData && userData.status === 'active') {
            dispatch({ type: 'SET_USER', payload: userData });
            
            // Carregar permissões do usuário
            const permissions = getUserPermissions([userData.role]);
            dispatch({ type: 'SET_PERMISSIONS', payload: permissions });
          } else {
            localStorage.removeItem('user');
            dispatch({ type: 'SET_LOADING', payload: false });
          }
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Erro ao inicializar autenticação:', error);
        localStorage.removeItem('user');
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Carregar usuários do localStorage
      const usersData = localStorage.getItem('users');
      if (!usersData) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return false;
      }

      const users: User[] = JSON.parse(usersData);
      const foundUser = users.find(u => 
        u.email === credentials.email && 
        u.password === credentials.password && 
        u.status === 'active'
      );

      if (foundUser) {
        // Atualizar último login
        const updatedUser = { ...foundUser, lastLogin: new Date() };
        
        // Salvar no localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Atualizar usuário na lista
        const updatedUsers = users.map(u => u.id === foundUser.id ? updatedUser : u);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        
        // Carregar permissões do usuário
        const permissions = getUserPermissions([updatedUser.role]);
        
        dispatch({ type: 'SET_USER', payload: updatedUser });
        dispatch({ type: 'SET_PERMISSIONS', payload: permissions });
        
        return true;
      }
      
      dispatch({ type: 'SET_LOADING', payload: false });
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Verificar se as senhas coincidem
      if (data.password !== data.confirmPassword) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return false;
      }

      // Carregar usuários existentes
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Verificar se o email já existe
      if (existingUsers.find((u: User) => u.email === data.email)) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return false;
      }

      // Criar novo usuário
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: data.name,
        email: data.email,
        password: data.password,
        role: 'user',
        status: 'active',
        isActive: true,
        permissions: ['dashboard:read', 'ayumi:use'],
        createdAt: new Date(),
        aiUsageLimit: 100,
        aiUsageCount: 0,
        aiUsageResetDate: new Date(),
      };

      // Adicionar à lista de usuários
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // Fazer login automaticamente
      const success = await login({ email: data.email, password: data.password });
      
      if (success) {
        return true;
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
        return false;
      }
    } catch (error) {
      console.error('Erro no registro:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData: Partial<User>) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch({ type: 'UPDATE_USER', payload: userData });
    }
  };

  const checkAIUsageLimit = (): boolean => {
    if (!state.user) return false;
    return (state.user.aiUsageCount || 0) < (state.user.aiUsageLimit || 100);
  };

  const incrementAIUsage = () => {
    if (state.user && checkAIUsageLimit()) {
      const newCount = (state.user.aiUsageCount || 0) + 1;
      updateUser({ aiUsageCount: newCount });
      dispatch({ type: 'INCREMENT_AI_USAGE' });
    }
  };

  const hasPermission = (permissionName: string): boolean => {
    return hasPermission(permissionName, state.userPermissions);
  };

  const hasRole = (roleId: string): boolean => {
    return state.user?.role === roleId;
  };

  const value: AuthContextType = {
    user: state.user,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    userPermissions: state.userPermissions,
    login,
    register,
    logout,
    updateUser,
    checkAIUsageLimit,
    incrementAIUsage,
    hasPermission,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
