import { useState, useCallback, useMemo } from 'react';
import { findContractAnswer, contratosDatabase, getContractCategories } from '@/lib/contratosDatabase';
import { ayumiContratosConfig } from '@/config/ayumiContratos';

export interface ContractMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sources?: string[];
  category?: string;
  confidence?: number;
}

export interface ContractCategory {
  name: string;
  count: number;
  color: string;
}

export interface ContractSearchResult {
  question: string;
  answer: string;
  category: string;
  relevance: number;
  sources: string[];
}

export function useAyumiContratos() {
  const [messages, setMessages] = useState<ContractMessage[]>([
    {
      id: '1',
      text: ayumiContratosConfig.responses.defaultGreeting,
      isUser: false,
      timestamp: new Date(),
      sources: [ayumiContratosConfig.sources.primary],
      category: 'Saudação'
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);

  // Obter categorias disponíveis
  const categories = useMemo(() => {
    const allCategories = getContractCategories();
    return allCategories.map(category => ({
      name: category,
      count: contratosDatabase.filter(qa => qa.category === category).length,
      color: ayumiContratosConfig.categories.colors[category as keyof typeof ayumiContratosConfig.categories.colors] || '#6b7280'
    }));
  }, []);

  // Filtrar mensagens por categoria
  const filteredMessages = useMemo(() => {
    if (!selectedCategory) return messages;
    return messages.filter(message => message.category === selectedCategory);
  }, [messages, selectedCategory]);

  // Buscar respostas no banco de dados
  const searchContractDatabase = useCallback((query: string): ContractSearchResult[] => {
    if (!query.trim()) return [];
    
    const cleanQuery = query.toLowerCase();
    const results: ContractSearchResult[] = [];
    
    contratosDatabase.forEach(qa => {
      let relevance = 0;
      
      // Verificar palavras-chave na pergunta
      if (qa.keywords.some(keyword => cleanQuery.includes(keyword.toLowerCase()))) {
        relevance += 3;
      }
      
      // Verificar palavras na pergunta
      if (qa.question.toLowerCase().includes(cleanQuery)) {
        relevance += 2;
      }
      
      // Verificar palavras na resposta
      if (qa.answer.toLowerCase().includes(cleanQuery)) {
        relevance += 1;
      }
      
      // Verificar categoria
      if (qa.category.toLowerCase().includes(cleanQuery)) {
        relevance += 1;
      }
      
      if (relevance > 0) {
        results.push({
          question: qa.question,
          answer: qa.answer,
          category: qa.category,
          relevance,
          sources: [ayumiContratosConfig.sources.primary, qa.contractSection]
        });
      }
    });
    
    // Ordenar por relevância
    return results.sort((a, b) => b.relevance - a.relevance);
  }, []);

  // Processar pergunta do usuário
  const processQuestion = useCallback(async (question: string): Promise<void> => {
    if (!question.trim() || isLoading) return;

    const userMessage: ContractMessage = {
      id: Date.now().toString(),
      text: question,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setShowQuickQuestions(false);

    try {
      // Simular processamento da IA
      await new Promise(resolve => setTimeout(resolve, ayumiContratosConfig.interface.responseDelay));
      
      // Buscar resposta no banco de dados
      const contractAnswer = findContractAnswer(question);
      
      if (contractAnswer) {
        const qa = contratosDatabase.find(qa => qa.answer === contractAnswer);
        const category = qa?.category || 'Contratos';
        
        const ayumiResponse: ContractMessage = {
          id: (Date.now() + 1).toString(),
          text: contractAnswer,
          isUser: false,
          timestamp: new Date(),
          sources: [ayumiContratosConfig.sources.primary, qa?.contractSection || 'Cláusulas Contratuais'],
          category: category,
          confidence: 0.95
        };
        
        setMessages(prev => [...prev, ayumiResponse]);
      } else {
        // Gerar resposta genérica
        const response = generateGenericResponse(question);
        const ayumiResponse: ContractMessage = {
          id: (Date.now() + 1).toString(),
          text: response.answer,
          isUser: false,
          timestamp: new Date(),
          sources: response.sources,
          category: 'Geral',
          confidence: 0.7
        };
        
        setMessages(prev => [...prev, ayumiResponse]);
      }
    } catch (error) {
      console.error('Erro ao processar pergunta:', error);
      const errorResponse: ContractMessage = {
        id: (Date.now() + 1).toString(),
        text: ayumiContratosConfig.responses.fallbackResponse,
        isUser: false,
        timestamp: new Date(),
        category: 'Erro',
        confidence: 0
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  // Gerar resposta genérica
  const generateGenericResponse = useCallback((question: string): { answer: string; sources: string[] } => {
    const cleanQuestion = question.toLowerCase();
    
    if (cleanQuestion.includes('contrato') || cleanQuestion.includes('cláusula')) {
      return {
        answer: `O contrato da Auto Escola Onishi é um documento legal que estabelece os direitos e obrigações de ambas as partes. Ele contém cláusulas específicas sobre:\n\n• Serviços prestados\n• Valores e formas de pagamento\n• Prazos e cronogramas\n• Políticas de faltas e penalidades\n• Processos de cancelamento\n• Garantias e responsabilidades\n\nPara dúvidas específicas sobre cláusulas, por favor, seja mais específico na sua pergunta.`,
        sources: [ayumiContratosConfig.sources.primary, 'Cláusulas Contratuais']
      };
    }

    if (cleanQuestion.includes('direito') || cleanQuestion.includes('proteção')) {
      return {
        answer: `Como consumidor, você tem direitos garantidos por lei:\n\n• Direito à informação clara e adequada\n• Direito à qualidade do serviço\n• Direito à proteção contra práticas abusivas\n• Direito ao cumprimento do contrato\n• Direito à reclamação e resolução de problemas\n\nA Auto Escola Onishi se compromete a respeitar todos os seus direitos e oferecer um serviço de qualidade.`,
        sources: ['Código de Defesa do Consumidor', ayumiContratosConfig.sources.primary]
      };
    }

    if (cleanQuestion.includes('lei') || cleanQuestion.includes('legal')) {
      return {
        answer: `Os contratos da Auto Escola Onishi seguem as seguintes bases legais:\n\n• Código de Defesa do Consumidor (Lei 8.078/90)\n• Código Civil (Lei 10.406/2002)\n• Resolução CONTRAN nº 789/2020\n• Lei Geral de Proteção de Dados (LGPD)\n• Normas específicas do Detran-SP\n\nTodas as cláusulas são elaboradas em conformidade com a legislação vigente.`,
        sources: ['Legislação Brasileira', ayumiContratosConfig.sources.primary]
      };
    }

    // Resposta padrão
    return {
      answer: `Obrigado pela sua pergunta sobre contratos da Auto Escola Onishi! 🤝\n\nPara responder com precisão, preciso entender melhor o que você gostaria de saber. Posso te ajudar com:\n\n• Cláusulas contratuais específicas\n• Obrigações e direitos das partes\n• Processos de cancelamento e rescisão\n• Valores, taxas e condições de pagamento\n• Políticas de faltas e penalidades\n• Sistema de agendamento e cronogramas\n• Requisitos de documentação\n• Garantias e reclamações\n\nPor favor, seja mais específico na sua pergunta para que eu possa te dar a resposta mais precisa possível!`,
      sources: [ayumiContratosConfig.sources.primary]
    };
  }, []);

  // Limpar histórico de mensagens
  const clearMessages = useCallback(() => {
    setMessages([{
      id: '1',
      text: ayumiContratosConfig.responses.defaultGreeting,
      isUser: false,
      timestamp: new Date(),
      sources: [ayumiContratosConfig.sources.primary],
      category: 'Saudação'
    }]);
    setShowQuickQuestions(true);
  }, []);

  // Exportar conversa
  const exportConversation = useCallback(() => {
    const conversation = messages.map(msg => 
      `${msg.isUser ? 'Usuário' : 'Ayumi'} (${msg.timestamp.toLocaleString('pt-BR')}):\n${msg.text}\n`
    ).join('\n');
    
    const blob = new Blob([conversation], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversa-ayumi-contratos-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [messages]);

  return {
    // Estado
    messages,
    filteredMessages,
    isLoading,
    selectedCategory,
    searchQuery,
    showQuickQuestions,
    categories,
    
    // Ações
    processQuestion,
    setSelectedCategory,
    setSearchQuery,
    setShowQuickQuestions,
    clearMessages,
    exportConversation,
    searchContractDatabase,
    
    // Configurações
    config: ayumiContratosConfig
  };
}
