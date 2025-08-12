interface BradialMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface BradialResponse {
  content: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface BradialRequest {
  message: string;
  conversation_id?: string;
  temperature?: number;
  max_tokens?: number;
}

class BradialService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_BRADIAL_API_KEY || '';
    this.apiUrl = process.env.NEXT_PUBLIC_BRADIAL_API_URL || 'https://api.bradial.com/v1';
  }

  async sendMessage(request: BradialRequest): Promise<BradialResponse> {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${this.apiUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-User-Token': token || '',
        },
        body: JSON.stringify({
          model: 'bradial-gpt-4',
          messages: [
            {
              role: 'user',
              content: request.message,
            },
          ],
          temperature: request.temperature || 0.7,
          max_tokens: request.max_tokens || 1000,
          conversation_id: request.conversation_id,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao comunicar com a IA Bradial');
      }

      const data = await response.json();
      
      return {
        content: data.choices[0].message.content,
        usage: data.usage,
      };
    } catch (error) {
      console.error('Erro na API Bradial:', error);
      throw error;
    }
  }

  async validateApiKey(): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Erro ao validar chave da API Bradial:', error);
      return false;
    }
  }

  async getAvailableModels(): Promise<string[]> {
    try {
      const response = await fetch(`${this.apiUrl}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar modelos disponíveis');
      }

      const data = await response.json();
      return data.data.map((model: any) => model.id);
    } catch (error) {
      console.error('Erro ao buscar modelos:', error);
      return ['bradial-gpt-4'];
    }
  }

  generateConversationId(): string {
    return 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}

export const bradialService = new BradialService();
export type { BradialMessage, BradialResponse, BradialRequest };
