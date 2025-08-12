import { useState, useEffect } from 'react';

interface GoogleCalendarEvent {
  id?: string;
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attendees?: Array<{
    email: string;
    displayName?: string;
  }>;
  reminders?: {
    useDefault: boolean;
    overrides?: Array<{
      method: 'email' | 'popup';
      minutes: number;
    }>;
  };
}

interface GoogleTokens {
  accessToken: string;
  refreshToken?: string;
  expiryDate?: number;
}

interface GoogleUserInfo {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export function useGoogleCalendar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<GoogleUserInfo | null>(null);
  const [tokens, setTokens] = useState<GoogleTokens | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Verificar se já existe autenticação salva
  useEffect(() => {
    const savedTokens = localStorage.getItem('googleCalendarTokens');
    const savedUserInfo = localStorage.getItem('googleCalendarUserInfo');
    
    if (savedTokens && savedUserInfo) {
      try {
        const parsedTokens = JSON.parse(savedTokens);
        const parsedUserInfo = JSON.parse(savedUserInfo);
        
        setTokens(parsedTokens);
        setUserInfo(parsedUserInfo);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Erro ao carregar dados salvos:', error);
        localStorage.removeItem('googleCalendarTokens');
        localStorage.removeItem('googleCalendarUserInfo');
      }
    }
  }, []);

  // Iniciar processo de autenticação
  const authenticate = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/auth/google');
      const data = await response.json();

      if (response.ok) {
        // Redirecionar para página de autorização do Google
        window.location.href = data.authUrl;
      } else {
        throw new Error(data.message || 'Erro ao iniciar autenticação');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  // Processar callback de autenticação
  const handleAuthCallback = async (code: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (response.ok) {
        const { userInfo: newUserInfo, tokens: newTokens } = data;
        
        setUserInfo(newUserInfo);
        setTokens(newTokens);
        setIsAuthenticated(true);

        // Salvar no localStorage
        localStorage.setItem('googleCalendarTokens', JSON.stringify(newTokens));
        localStorage.setItem('googleCalendarUserInfo', JSON.stringify(newUserInfo));
      } else {
        throw new Error(data.message || 'Erro na autenticação');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  // Desconectar
  const disconnect = () => {
    setUserInfo(null);
    setTokens(null);
    setIsAuthenticated(false);
    setError(null);
    
    localStorage.removeItem('googleCalendarTokens');
    localStorage.removeItem('googleCalendarUserInfo');
  };

  // Criar evento
  const createEvent = async (event: Omit<GoogleCalendarEvent, 'id'>) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/calendar/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      const data = await response.json();

      if (response.ok) {
        return data.event;
      } else {
        throw new Error(data.message || 'Erro ao criar evento');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Listar eventos
  const listEvents = async (timeMin?: string, timeMax?: string, maxResults: number = 100) => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (timeMin) params.append('timeMin', timeMin);
      if (timeMax) params.append('timeMax', timeMax);
      params.append('maxResults', maxResults.toString());

      const response = await fetch(`/api/calendar/events?${params}`);
      const data = await response.json();

      if (response.ok) {
        return data.events;
      } else {
        throw new Error(data.message || 'Erro ao listar eventos');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sincronizar agendamentos de contato
  const syncContactAppointments = async (contactId: string, contactEmail: string, appointments: any[]) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/calendar/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactId,
          contactEmail,
          appointments,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message || 'Erro ao sincronizar agendamentos');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    userInfo,
    tokens,
    error,
    authenticate,
    handleAuthCallback,
    disconnect,
    createEvent,
    listEvents,
    syncContactAppointments,
  };
}

