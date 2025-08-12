import { NextRequest, NextResponse } from 'next/server';
import { googleCalendarService } from '@/lib/services/googleCalendarService';

export async function GET(request: NextRequest) {
  try {
    const authUrl = googleCalendarService.generateAuthUrl();
    return NextResponse.json({ authUrl });
  } catch (error) {
    console.error('Erro ao gerar URL de autenticação:', error);
    return NextResponse.json(
      { message: 'Erro ao gerar URL de autenticação' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { message: 'Código de autorização é obrigatório' },
        { status: 400 }
      );
    }

    const tokens = await googleCalendarService.getTokensFromCode(code);
    const userInfo = await googleCalendarService.getUserInfo();

    return NextResponse.json({
      message: 'Autenticação com Google realizada com sucesso',
      userInfo,
      tokens: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiryDate: tokens.expiry_date
      }
    });

  } catch (error) {
    console.error('Erro na autenticação com Google:', error);
    return NextResponse.json(
      { message: 'Erro na autenticação com Google' },
      { status: 500 }
    );
  }
}

