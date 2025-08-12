import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export interface GoogleCalendarEvent {
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

export interface GoogleCalendarConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  calendarId: string;
}

class GoogleCalendarService {
  private oauth2Client: OAuth2Client;
  private calendar: any;
  private config: GoogleCalendarConfig;

  constructor() {
    this.config = {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      redirectUri: process.env.GOOGLE_REDIRECT_URI || '',
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary'
    };

    this.oauth2Client = new google.auth.OAuth2(
      this.config.clientId,
      this.config.clientSecret,
      this.config.redirectUri
    );

    this.calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
  }

  // Gerar URL de autorização
  generateAuthUrl(): string {
    const scopes = [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events'
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
  }

  // Trocar código de autorização por tokens
  async getTokensFromCode(code: string) {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      this.oauth2Client.setCredentials(tokens);
      return tokens;
    } catch (error) {
      console.error('Erro ao obter tokens:', error);
      throw new Error('Falha na autenticação com Google');
    }
  }

  // Definir tokens (para usuários já autenticados)
  setTokens(accessToken: string, refreshToken?: string) {
    this.oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken
    });
  }

  // Criar evento no Google Calendar
  async createEvent(event: GoogleCalendarEvent) {
    try {
      const response = await this.calendar.events.insert({
        calendarId: this.config.calendarId,
        resource: event,
        sendUpdates: 'all'
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      throw new Error('Falha ao criar evento no Google Calendar');
    }
  }

  // Atualizar evento existente
  async updateEvent(eventId: string, event: Partial<GoogleCalendarEvent>) {
    try {
      const response = await this.calendar.events.update({
        calendarId: this.config.calendarId,
        eventId: eventId,
        resource: event,
        sendUpdates: 'all'
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
      throw new Error('Falha ao atualizar evento no Google Calendar');
    }
  }

  // Excluir evento
  async deleteEvent(eventId: string) {
    try {
      await this.calendar.events.delete({
        calendarId: this.config.calendarId,
        eventId: eventId,
        sendUpdates: 'all'
      });

      return true;
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
      throw new Error('Falha ao excluir evento do Google Calendar');
    }
  }

  // Buscar eventos
  async listEvents(timeMin?: string, timeMax?: string, maxResults: number = 100) {
    try {
      const response = await this.calendar.events.list({
        calendarId: this.config.calendarId,
        timeMin: timeMin || new Date().toISOString(),
        timeMax: timeMax,
        maxResults,
        singleEvents: true,
        orderBy: 'startTime'
      });

      return response.data.items || [];
    } catch (error) {
      console.error('Erro ao listar eventos:', error);
      throw new Error('Falha ao listar eventos do Google Calendar');
    }
  }

  // Buscar evento específico
  async getEvent(eventId: string) {
    try {
      const response = await this.calendar.events.get({
        calendarId: this.config.calendarId,
        eventId: eventId
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar evento:', error);
      throw new Error('Falha ao buscar evento do Google Calendar');
    }
  }

  // Sincronizar agendamentos com contatos
  async syncContactAppointments(contactId: string, contactEmail: string, appointments: any[]) {
    try {
      const events = appointments.map(appointment => ({
        summary: `[${contactId}] ${appointment.title}`,
        description: appointment.description || '',
        start: {
          dateTime: appointment.date.toISOString(),
          timeZone: 'America/Sao_Paulo'
        },
        end: {
          dateTime: new Date(appointment.date.getTime() + appointment.duration * 60000).toISOString(),
          timeZone: 'America/Sao_Paulo'
        },
        attendees: [
          {
            email: contactEmail,
            displayName: appointment.contactName
          }
        ],
        reminders: {
          useDefault: false,
          overrides: [
            {
              method: 'popup' as const,
              minutes: 15
            },
            {
              method: 'email' as const,
              minutes: 60
            }
          ]
        }
      }));

      const createdEvents = [];
      for (const event of events) {
        const createdEvent = await this.createEvent(event);
        createdEvents.push(createdEvent);
      }

      return createdEvents;
    } catch (error) {
      console.error('Erro ao sincronizar agendamentos:', error);
      throw new Error('Falha ao sincronizar com Google Calendar');
    }
  }

  // Verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    const credentials = this.oauth2Client.credentials;
    return !!(credentials && credentials.access_token);
  }

  // Obter informações do usuário autenticado
  async getUserInfo() {
    try {
      const oauth2 = google.oauth2({ version: 'v2', auth: this.oauth2Client });
      const response = await oauth2.userinfo.get();
      return response.data;
    } catch (error) {
      console.error('Erro ao obter informações do usuário:', error);
      throw new Error('Falha ao obter informações do usuário');
    }
  }
}

export const googleCalendarService = new GoogleCalendarService();

