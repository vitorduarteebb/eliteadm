'use client';

import { useState } from 'react';
import { useGoogleCalendar } from '@/lib/hooks/useGoogleCalendar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  Calendar, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  ExternalLink,
  User,
  Mail,
  Clock
} from 'lucide-react';

export function GoogleCalendarIntegration() {
  const {
    isAuthenticated,
    isLoading,
    userInfo,
    error,
    authenticate,
    disconnect,
    listEvents,
    syncContactAppointments
  } = useGoogleCalendar();

  const [events, setEvents] = useState<any[]>([]);
  const [showEvents, setShowEvents] = useState(false);

  const handleAuthenticate = async () => {
    await authenticate();
  };

  const handleDisconnect = () => {
    disconnect();
    setEvents([]);
    setShowEvents(false);
  };

  const handleListEvents = async () => {
    try {
      const eventsList = await listEvents();
      setEvents(eventsList);
      setShowEvents(true);
    } catch (error) {
      console.error('Erro ao listar eventos:', error);
    }
  };

  const handleSyncContact = async (contactId: string, contactEmail: string, appointments: any[]) => {
    try {
      const result = await syncContactAppointments(contactId, contactEmail, appointments);
      console.log('Agendamentos sincronizados:', result);
      // Aqui você pode adicionar uma notificação de sucesso
    } catch (error) {
      console.error('Erro ao sincronizar:', error);
      // Aqui você pode adicionar uma notificação de erro
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <RefreshCw className="h-6 w-6 animate-spin text-blue-500" />
            <span className="ml-2 text-gray-600">Carregando...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Integração com Google Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          </div>
        )}

        {!isAuthenticated ? (
          <div className="text-center space-y-4">
            <div className="text-gray-600">
              <p>Conecte sua conta do Google para sincronizar</p>
              <p className="text-sm">agendamentos automaticamente com o Google Calendar</p>
            </div>
            <Button onClick={handleAuthenticate} className="flex items-center mx-auto">
              <Calendar className="h-4 w-4 mr-2" />
              Conectar com Google
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Informações do usuário */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {userInfo?.picture ? (
                    <img 
                      src={userInfo.picture} 
                      alt={userInfo.name}
                      className="h-10 w-10 rounded-full mr-3"
                    />
                  ) : (
                    <User className="h-10 w-10 text-blue-500 mr-3" />
                  )}
                  <div>
                    <p className="font-medium text-blue-900">{userInfo?.name}</p>
                    <p className="text-sm text-blue-700 flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      {userInfo?.email}
                    </p>
                  </div>
                </div>
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            </div>

            {/* Ações */}
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={handleListEvents}
                variant="outline"
                className="flex items-center"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Listar Eventos
              </Button>
              
              <Button 
                onClick={handleDisconnect}
                variant="outline"
                className="flex items-center text-red-600 hover:text-red-700"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Desconectar
              </Button>
            </div>

            {/* Lista de eventos */}
            {showEvents && events.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Eventos Recentes</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {events.map((event) => (
                    <div 
                      key={event.id} 
                      className="bg-gray-50 border border-gray-200 rounded-md p-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{event.summary}</p>
                          {event.description && (
                            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                          )}
                          <div className="flex items-center text-xs text-gray-500 mt-2">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(event.start.dateTime).toLocaleString('pt-BR')}
                          </div>
                        </div>
                        {event.htmlLink && (
                          <a
                            href={event.htmlLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showEvents && events.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p>Nenhum evento encontrado</p>
              </div>
            )}

            {/* Informações sobre sincronização */}
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <h4 className="font-medium text-green-900 mb-2">Sincronização Automática</h4>
              <p className="text-sm text-green-700">
                Quando você criar ou atualizar agendamentos para contatos, 
                eles serão automaticamente sincronizados com o Google Calendar.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

