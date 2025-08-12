import { NextRequest, NextResponse } from 'next/server';
import { googleCalendarService } from '@/lib/services/googleCalendarService';

export async function POST(request: NextRequest) {
  try {
    const { contactId, contactEmail, appointments } = await request.json();

    if (!contactId || !contactEmail || !appointments) {
      return NextResponse.json(
        { message: 'Dados obrigatórios: contactId, contactEmail, appointments' },
        { status: 400 }
      );
    }

    // Verificar se o usuário está autenticado com Google
    if (!googleCalendarService.isAuthenticated()) {
      return NextResponse.json(
        { message: 'Usuário não autenticado com Google Calendar' },
        { status: 401 }
      );
    }

    const createdEvents = await googleCalendarService.syncContactAppointments(
      contactId,
      contactEmail,
      appointments
    );

    return NextResponse.json({
      message: 'Agendamentos sincronizados com sucesso',
      events: createdEvents,
      syncedCount: createdEvents.length
    });

  } catch (error) {
    console.error('Erro ao sincronizar agendamentos:', error);
    return NextResponse.json(
      { message: 'Erro ao sincronizar agendamentos' },
      { status: 500 }
    );
  }
}

