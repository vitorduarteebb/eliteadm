import { NextRequest, NextResponse } from 'next/server';
import { googleCalendarService } from '@/lib/services/googleCalendarService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeMin = searchParams.get('timeMin');
    const timeMax = searchParams.get('timeMax');
    const maxResults = parseInt(searchParams.get('maxResults') || '100');

    const events = await googleCalendarService.listEvents(timeMin || undefined, timeMax || undefined, maxResults);
    
    return NextResponse.json({ events });
  } catch (error) {
    console.error('Erro ao listar eventos:', error);
    return NextResponse.json(
      { message: 'Erro ao listar eventos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json();
    
    // Validar dados obrigatórios
    if (!eventData.summary || !eventData.start || !eventData.end) {
      return NextResponse.json(
        { message: 'Dados obrigatórios: summary, start, end' },
        { status: 400 }
      );
    }

    const event = await googleCalendarService.createEvent(eventData);
    
    return NextResponse.json({ 
      message: 'Evento criado com sucesso',
      event 
    }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    return NextResponse.json(
      { message: 'Erro ao criar evento' },
      { status: 500 }
    );
  }
}

