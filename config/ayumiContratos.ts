export const ayumiContratosConfig = {
  // Configurações da IA
  ai: {
    name: 'Ayumi',
    role: 'Especialista em Contratos da Auto Escola Onishi',
    personality: 'Profissional, precisa e amigável',
    expertise: [
      'Contratos e cláusulas contratuais',
      'Direitos e obrigações das partes',
      'Legislação aplicável',
      'Processos de cancelamento e rescisão',
      'Valores, taxas e condições de pagamento',
      'Políticas de faltas e penalidades',
      'Sistema de agendamento',
      'Requisitos de documentação',
      'Garantias e reclamações'
    ]
  },

  // Configurações da interface
  interface: {
    theme: 'professional',
    primaryColor: '#2563eb', // blue-600
    secondaryColor: '#7c3aed', // purple-600
    accentColor: '#059669', // green-600
    maxMessageLength: 1000,
    typingSpeed: 50, // ms por caractere
    responseDelay: 1500 // ms
  },

  // Configurações de resposta
  responses: {
    defaultGreeting: 'Olá! Sou a Ayumi, sua especialista em contratos da Auto Escola Onishi! 📋',
    fallbackResponse: 'Desculpe, não consegui encontrar uma resposta específica para sua pergunta. Pode reformular ou usar uma das perguntas rápidas disponíveis?',
    maxResponseLength: 800,
    includeSources: true,
    includeCategories: true
  },

  // Configurações de categorias
  categories: {
    primary: [
      'Obrigações e Direitos',
      'Cancelamento e Rescisão',
      'Valores e Taxas',
      'Faltas e Penalidades',
      'Agendamento',
      'Documentação',
      'Garantias',
      'Legislação'
    ],
    colors: {
      'Obrigações e Direitos': '#059669', // green-600
      'Cancelamento e Rescisão': '#dc2626', // red-600
      'Valores e Taxas': '#d97706', // amber-600
      'Faltas e Penalidades': '#7c2d12', // orange-800
      'Agendamento': '#2563eb', // blue-600
      'Documentação': '#7c3aed', // purple-600
      'Garantias': '#059669', // green-600
      'Legislação': '#1e40af' // blue-800
    }
  },

  // Configurações de perguntas rápidas
  quickQuestions: [
    'Quais são as obrigações do aluno?',
    'Como funciona o cancelamento?',
    'Quais são os valores das taxas?',
    'O que acontece em caso de falta?',
    'Como funciona o agendamento?',
    'Quais documentos são necessários?',
    'Qual é o prazo para conclusão?',
    'Como fazer reclamações?',
    'Quais são os direitos do consumidor?',
    'Como funciona a garantia?'
  ],

  // Configurações de fontes
  sources: {
    primary: 'Contrato Auto Escola Onishi',
    legal: [
      'Código de Defesa do Consumidor (Lei 8.078/90)',
      'Código Civil (Lei 10.406/2002)',
      'Resolução CONTRAN nº 789/2020',
      'Lei Geral de Proteção de Dados (LGPD)',
      'Normas específicas do Detran-SP'
    ],
    internal: [
      'Cláusulas Contratuais',
      'Tabela de Preços',
      'Política de Faltas',
      'Sistema de Agendamento',
      'Requisitos de Documentação'
    ]
  },

  // Configurações de performance
  performance: {
    maxDatabaseSize: 1000,
    searchTimeout: 5000, // ms
    cacheEnabled: true,
    cacheExpiry: 3600000 // 1 hora em ms
  },

  // Configurações de acessibilidade
  accessibility: {
    screenReaderSupport: true,
    keyboardNavigation: true,
    highContrastMode: false,
    fontSizeAdjustment: true
  }
};
