'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState, AuthContextType, LoginCredentials, RegisterData } from '@/lib/types/auth';
import { authService } from '@/lib/services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
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
    case 'INCREMENT_AI_USAGE':
      return {
        ...state,
        user: state.user
          ? { ...state.user, aiUsageCount: state.user.aiUsageCount + 1 }
          : null,
      };
    case 'LOGOUT':
      return {
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Verificar se há um token salvo e validar
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const user = await authService.validateToken(token);
          if (user) {
            dispatch({ type: 'SET_USER', payload: user });
          } else {
            localStorage.removeItem('authToken');
            dispatch({ type: 'SET_LOADING', payload: false });
          }
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Erro ao inicializar autenticação:', error);
        localStorage.removeItem('authToken');
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const { user, token } = await authService.login(credentials);
      localStorage.setItem('authToken', token);
      dispatch({ type: 'SET_USER', payload: user });
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const { user, token } = await authService.register(data);
      localStorage.setItem('authToken', token);
      dispatch({ type: 'SET_USER', payload: user });
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  const checkAIUsageLimit = (): boolean => {
    if (!state.user) return false;
    
    // Verificar se é necessário resetar o contador
    const now = new Date();
    const resetDate = new Date(state.user.aiUsageResetDate);
    
    if (now >= resetDate) {
      // Reset do contador mensal
      const nextResetDate = new Date(now);
      nextResetDate.setMonth(nextResetDate.getMonth() + 1);
      nextResetDate.setDate(1);
      nextResetDate.setHours(0, 0, 0, 0);
      
      updateUser({
        aiUsageCount: 0,
        aiUsageResetDate: nextResetDate,
      });
      
      return true;
    }
    
    return state.user.aiUsageCount < state.user.aiUsageLimit;
  };

  const incrementAIUsage = () => {
    if (state.user) {
      dispatch({ type: 'INCREMENT_AI_USAGE' });
      // Salvar no backend
      authService.updateAIUsage(state.user.id, state.user.aiUsageCount + 1);
    }
  };

  const hasPermission = (permissionName: string): boolean => {
    if (!state.user || !state.user.permissions) return false;
    
    // Admin tem todas as permissões
    if (state.user.role === 'admin') return true;
    
    // Verificar permissão específica
    const permission = state.user.permissions.find(p => p.name === permissionName);
    return permission ? permission.granted : false;
  };

  const value: AuthContextType = {
    user: state.user,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    checkAIUsageLimit,
    incrementAIUsage,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
