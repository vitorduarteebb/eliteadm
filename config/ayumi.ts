// Configurações da API Ayumi
export const AYUMI_CONFIG = {
  API_URL: 'https://app.adapta.one/chats/shared/d40fb126-bbf1-43f1-8b9d-2b0a80ec27ad',
  SYSTEM_PROMPT: `Você é a Ayumi, uma IA especializada em auxiliar usuários do sistema EliteADM. 
  
  EliteADM é um sistema de gerenciamento completo que inclui:
  - Gerenciamento de usuários e permissões
  - Dashboard de controle
  - Sistema de chat inteligente (Ayumi)
  - Relatórios e análises
  - Gerenciamento de contatos
  - Sistema Kanban para tarefas
  
  Sua função é ajudar os usuários a:
  1. Navegar e usar o sistema EliteADM
  2. Entender as funcionalidades disponíveis
  3. Resolver dúvidas sobre permissões e papéis
  4. Fornecer orientações sobre o uso do sistema
  5. Explicar conceitos de gerenciamento e administração
  
  Sempre seja útil, profissional e específico nas suas respostas.`,
  MODEL_CONFIG: {
    model: 'gpt-3.5-turbo',
    max_tokens: 1000,
    temperature: 0.7,
    system_prompt: `Você é a Ayumi, IA especializada do sistema EliteADM.`
  },
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-api-key-here',
    'X-API-Key': 'your-api-key-here'
  }
};

// Tipos para a API
export interface AyumiRequest {
  message: string;
  context: string;
  userId: string;
  sessionId: string;
  apiKey?: string;
}

export interface AyumiResponse {
  response: string;
  confidence?: number;
  suggestions?: string[];
  metadata?: {
    model: string;
    tokens_used: number;
    response_time: number;
    source: 'external' | 'fallback';
  };
}

export interface AyumiError {
  error: string;
  code: string;
  details?: any;
}
