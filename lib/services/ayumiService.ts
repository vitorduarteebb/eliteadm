export interface AyumiRequest {
  message: string;
  conversation_id: string;
  temperature?: number;
  max_tokens?: number;
  context?: 'vendas' | 'atendimento' | 'legislacao' | 'geral';
}

export interface AyumiResponse {
  content: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface AyumiMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  context?: string;
}

class AyumiService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_BRADIAL_API_KEY || '';
    this.apiUrl = process.env.NEXT_PUBLIC_BRADIAL_API_URL || 'https://api.bradial.com/v1';
  }

  private getAyumiPersona(): string {
    return `Você é Ayumi, uma especialista em atendimento, vendas e legislação de trânsito do Grupo Onishi. 

PERSONALIDADE:
- Carismática, atenciosa e sempre disposta a ajudar
- Especialista em CNH, processos do Detran SP, CTB e Contran
- Focada em resultados e excelência no atendimento
- Motivadora e incentivadora do crescimento profissional

CONHECIMENTOS ESPECIALIZADOS:
📚 LEGISLAÇÃO DE TRÂNSITO:
- Código de Trânsito Brasileiro (CTB) completo
- Resoluções do Contran atualizadas
- Processos específicos do Detran SP
- Procedimentos de habilitação (primeira habilitação, renovação, mudança de categoria)
- Infrações, penalidades e sistema de pontuação
- Exames médicos e psicológicos

🚀 VENDAS E ATENDIMENTO:
- Técnicas de vendas consultivas
- Objeções comuns e como superá-las
- Atendimento diferenciado e personalizado
- Protocolos internos do Grupo Onishi
- Fidelização de clientes
- Upselling e cross-selling

⭐ EXCELÊNCIA OPERACIONAL:
- Processos otimizados para diferentes tipos de habilitação
- Documentação necessária para cada serviço
- Prazos e custos atualizados
- Agendamentos e logistics

DIRETRIZES DE RESPOSTA:
1. Sempre se apresente como Ayumi do Grupo Onishi
2. Use linguagem profissional mas acessível
3. Seja proativa em sugerir soluções
4. Sempre cite a legislação específica quando relevante
5. Incentive o desenvolvimento profissional
6. Mantenha foco na satisfação do cliente

EXEMPLOS DE SAUDAÇÃO:
"Olá! Sou a Ayumi, sua parceira de sucesso no Grupo Onishi! 🚗✨ Como posso ajudar você a crescer hoje?"

Responda sempre em português brasileiro e mantenha o tom profissional, mas caloroso e motivador.`;
  }

  private getContextualPrompt(context: string, message: string): string {
    const basePersona = this.getAyumiPersona();
    
    const contextPrompts = {
      vendas: `${basePersona}

FOCO ESPECÍFICO - VENDAS:
O usuário está buscando ajuda com vendas. Enfatize:
- Técnicas de abordagem e fechamento
- Como identificar necessidades do cliente
- Scripts de vendas para diferentes perfis
- Como superar objeções comuns sobre CNH
- Estratégias de upselling (adicionais, aulas extras, etc.)

Pergunta do usuário: ${message}`,

      atendimento: `${basePersona}

FOCO ESPECÍFICO - ATENDIMENTO:
O usuário precisa de ajuda com atendimento ao cliente. Enfatize:
- Excelência no atendimento presencial e telefônico
- Como lidar com clientes insatisfeitos
- Procedimentos padrão do Grupo Onishi
- Comunicação efetiva e empática
- Resolução de problemas complexos

Pergunta do usuário: ${message}`,

      legislacao: `${basePersona}

FOCO ESPECÍFICO - LEGISLAÇÃO:
O usuário tem dúvidas sobre legislação de trânsito. Enfatize:
- Cite artigos específicos do CTB quando aplicável
- Resoluções do Contran relevantes
- Procedimentos específicos do Detran SP
- Prazos e documentos necessários
- Atualizações recentes na legislação

Pergunta do usuário: ${message}`,

      geral: `${basePersona}

CONTEXTO GERAL:
Responda de forma abrangente, considerando todos os aspectos do seu conhecimento.

Pergunta do usuário: ${message}`
    };

    return contextPrompts[context as keyof typeof contextPrompts] || contextPrompts.geral;
  }

  async sendMessage(request: AyumiRequest): Promise<AyumiResponse> {
    // Se não tiver API key configurada, usar modo simulação
    if (!this.apiKey || this.apiKey === '') {
      return this.getSimulatedResponse(request);
    }

    try {
      const token = localStorage.getItem('authToken');
      const contextualPrompt = this.getContextualPrompt(request.context || 'geral', request.message);
      
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
              role: 'system',
              content: contextualPrompt,
            },
            {
              role: 'user',
              content: request.message,
            },
          ],
          temperature: request.temperature || 0.7,
          max_tokens: request.max_tokens || 1500,
          conversation_id: request.conversation_id,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao comunicar com a Ayumi');
      }

      const data = await response.json();
      
      return {
        content: data.choices[0].message.content,
        usage: data.usage,
      };
    } catch (error) {
      console.error('Erro na API Ayumi, usando modo simulação:', error);
      // Em caso de erro, usar modo simulação como fallback
      return this.getSimulatedResponse(request);
    }
  }

  private getSimulatedResponse(request: AyumiRequest): Promise<AyumiResponse> {
    return new Promise((resolve) => {
      // Simular delay da API
      setTimeout(() => {
        const responses = this.getContextualSimulatedResponse(request.context || 'geral', request.message);
        
        resolve({
          content: responses,
          usage: {
            prompt_tokens: 100,
            completion_tokens: 200,
            total_tokens: 300
          }
        });
      }, 1000 + Math.random() * 1000); // Entre 1-2 segundos
    });
  }

  private getContextualSimulatedResponse(context: string, message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Respostas específicas por contexto
    const contextResponses = {
      vendas: {
        'crescer profissionalmente': `🚀 **Dicas para Crescer Profissionalmente no Grupo Onishi:**

**1. Desenvolvimento de Competências Técnicas:**
📚 Mantenha-se atualizado com a legislação de trânsito (CTB, resoluções do Contran)
📋 Domine todos os processos do Detran SP
🎯 Especialize-se em diferentes categorias de habilitação

**2. Habilidades de Vendas:**
💡 Pratique técnicas de escuta ativa
🎭 Desenvolva empatia para entender necessidades do cliente
📈 Aprenda técnicas de fechamento e objeções
🔄 Foque em vendas consultivas, não apenas transacionais

**3. Excelência no Atendimento:**
⭐ Seja proativo em antecipar necessidades
📞 Mantenha comunicação clara e objetiva
😊 Cultive relacionamentos de longo prazo
🤝 Transforme problemas em oportunidades

**4. Crescimento Interno:**
🎯 Defina metas mensais claras
📊 Acompanhe seus indicadores de performance
🏆 Busque feedback constante da liderança
👥 Mentore novos colaboradores

**5. Diferenciação Profissional:**
🌟 Torne-se referência em alguma especialidade
📖 Invista em cursos e certificações
💼 Desenvolva networking no setor
🚗 Entenda profundamente o mercado automotivo

Lembre-se: **No Grupo Onishi, valorizamos quem vai além do esperado!** ✨

Que área específica você gostaria de desenvolver primeiro?`,
        'default': `🚀 **Olá! Sou a Ayumi, especialista em vendas do Grupo Onishi!**

Para vendas de CNH, lembre-se sempre:

**Técnicas de Abordagem:**
- Identifique a necessidade real do cliente
- Mostre os benefícios da independência que a CNH traz
- Use cases de sucesso de outros clientes

**Superação de Objeções:**
- "Está caro": Demonstre o valor e parcelamento
- "Não tenho tempo": Mostre nossa flexibilidade de horários
- "Tenho medo": Destaque nosso suporte completo

**Fechamento:**
- Crie urgência com promoções limitadas
- Ofereça garantias e suporte pós-venda
- Sempre pergunte: "O que você precisa para decidir hoje?"

Como posso ajudar você especificamente com vendas? 🎯`
      },
      atendimento: {
        'crescer profissionalmente': `⭐ **Crescimento em Atendimento - Grupo Onishi:**

**1. Fundamentos da Excelência:**
😊 Sempre cumprimente com um sorriso genuíno
👂 Pratique escuta ativa - o cliente precisa se sentir ouvido
🎯 Seja proativo em antecipar necessidades

**2. Técnicas Avançadas:**
🤝 Use o nome do cliente durante a conversa
📋 Mantenha registros detalhados de cada interação
🔄 Faça follow-up proativo dos processos

**3. Gestão de Situações Difíceis:**
😤 Cliente nervoso: Mantenha calma e empatia
⏰ Atrasos: Comunique proativamente e ofereça soluções
❌ Problemas: Assuma responsabilidade e resolva rapidamente

**4. Diferenciação no Atendimento:**
🎁 Surpreenda com pequenos gestos de cuidado
📞 Ligue para verificar satisfação pós-atendimento
💡 Ofereça dicas úteis além do serviço básico

**5. Desenvolvimento Contínuo:**
📚 Estude casos de atendimento exemplar
🏆 Peça feedback dos clientes e supervisores
👥 Compartilhe boas práticas com a equipe

**Mindset Onishi:** "Cada cliente é uma oportunidade de demonstrar nossa excelência!" 🌟

Qual aspecto do atendimento você quer aprimorar mais?`,
        'default': `⭐ **Olá! Sou a Ayumi, especialista em atendimento do Grupo Onishi!**

**Princípios do Atendimento de Excelência:**

🤝 **Acolhimento**: Receba cada cliente como se fosse o mais importante
📋 **Organização**: Tenha sempre informações precisas em mãos
💡 **Proatividade**: Antecipe necessidades e ofereça soluções
🎯 **Personalização**: Adapte o atendimento ao perfil do cliente

**Protocolo Básico:**
1. Cumprimente cordialmente
2. Identifique a necessidade
3. Ofereça soluções claras
4. Confirme o entendimento
5. Acompanhe até a conclusão

Como posso ajudar você a melhorar seu atendimento hoje? 😊`
      },
      legislacao: {
        'crescer profissionalmente': `📚 **Crescimento em Legislação de Trânsito - Grupo Onishi:**

**1. Domínio Técnico Fundamental:**
📖 Estude o CTB (Código de Trânsito Brasileiro) sistematicamente
📋 Acompanhe resoluções atualizadas do Contran
🏛️ Conheça procedimentos específicos do Detran SP
⚖️ Entenda jurisprudência relacionada ao trânsito

**2. Especialização por Área:**
🚗 **Primeira Habilitação**: Documentos, exames, prazos
🔄 **Renovação**: Procedimentos especiais, casos excepcionais
📈 **Mudança de Categoria**: Requisitos, cursos necessários
🚫 **Infrações**: Penalidades, recursos, suspensões

**3. Atualização Constante:**
📱 Acompanhe portais oficiais (Detran, Contran, Denatran)
📰 Leia notícias sobre mudanças na legislação
🎓 Participe de cursos e workshops
👥 Participe de grupos técnicos do setor

**4. Aplicação Prática:**
💼 Resolva casos reais com base na legislação
📊 Documente situações complexas para consulta
🎯 Torne-se referência técnica na equipe
📞 Auxilie colegas em dúvidas específicas

**5. Valor Diferencial:**
⚡ Seja rápido em consultas técnicas
🎯 Tenha precisão absoluta nas informações
💡 Transforme conhecimento técnico em soluções práticas
🏆 Torne-se a pessoa que "resolve o impossível"

**Meta Onishi:** "Conhecimento técnico que gera confiança total!" 📜✨

Que área da legislação você quer dominar primeiro?`,
        'default': `📚 **Olá! Sou a Ayumi, especialista em legislação do Grupo Onishi!**

**Principais Áreas da Legislação de Trânsito:**

🏛️ **CTB - Código de Trânsito Brasileiro**
- Lei 9.503/97 com atualizações
- Infrações e penalidades
- Sistema de pontuação

📋 **Resoluções do Contran**
- Procedimentos de habilitação
- Requisitos técnicos veiculares
- Normas de segurança

🏢 **Detran SP - Procedimentos Específicos**
- Documentação necessária
- Prazos e taxas
- Agendamentos

Sobre qual aspecto da legislação você tem dúvidas? 📖`
      },
      geral: {
        'crescer profissionalmente': `🌟 **Plano Completo de Crescimento Profissional - Grupo Onishi:**

**FASE 1 - FUNDAÇÃO (30 dias)**
📚 **Conhecimento Base:**
- Domine 100% da legislação CTB essencial
- Aprenda todos os processos internos do Grupo Onishi
- Entenda nosso DNA de atendimento de excelência

🎯 **Habilidades Core:**
- Técnicas básicas de vendas consultivas
- Atendimento empático e solutivo
- Organização e gestão do tempo

**FASE 2 - ESPECIALIZAÇÃO (60-90 dias)**
🚀 **Desenvolvimento Avançado:**
- Especialize-se em sua área preferida (vendas/atendimento/legislação)
- Torne-se referência em pelo menos 2 processos específicos
- Desenvolva habilidades de relacionamento interpessoal

📈 **Resultados Mensuráveis:**
- Defina metas claras e acompanhe indicadores
- Busque feedback 360° (clientes, colegas, liderança)
- Documente suas conquistas e aprendizados

**FASE 3 - LIDERANÇA (90+ dias)**
👥 **Impacto na Equipe:**
- Mentore novos colaboradores
- Compartilhe conhecimento em treinamentos
- Lidere projetos de melhoria

🏆 **Excelência Reconhecida:**
- Torne-se referência no mercado
- Desenvolva network profissional
- Busque oportunidades de crescimento interno

**DIFERENCIAIS ONISHI:**
✨ **Mindset de Crescimento**: Sempre busque aprender algo novo
🤝 **Colaboração**: Ajude colegas a crescerem junto
🎯 **Foco no Cliente**: Cada interação é uma oportunidade
⚡ **Agilidade**: Resolva rapidamente, com qualidade
🌟 **Excelência**: Vá sempre além do esperado

**PRÓXIMOS PASSOS:**
1. Escolha uma área para focar primeiro
2. Defina meta SMART para os próximos 30 dias
3. Busque mentoria com liderança
4. Comece hoje mesmo!

**Lembre-se:** "No Grupo Onishi, investimos em quem investe em si mesmo!" 💪🏆

Qual dessas fases desperta mais seu interesse para começar agora?`,
        'default': `🌟 **Olá! Sou a Ayumi, sua parceira de sucesso no Grupo Onishi!**

Estou aqui para ajudar você em:

📚 **Legislação de Trânsito**: CTB, Contran, Detran SP
🚀 **Vendas & Conversão**: Técnicas que realmente funcionam  
⭐ **Atendimento de Excelência**: Fidelização e satisfação
💪 **Desenvolvimento Profissional**: Crescimento na carreira

**Como posso ajudar você hoje?**
- Tire dúvidas sobre processos
- Peça dicas de vendas ou atendimento
- Solicite orientação sobre legislação
- Busque conselhos para crescer profissionalmente

Digite sua pergunta ou escolha um contexto específico acima! 🚗✨`
      }
    };

    // Buscar resposta baseada no contexto e conteúdo da mensagem
    const contextMap = contextResponses[context as keyof typeof contextResponses] || contextResponses.geral;
    
    // Verificar se a mensagem contém palavras-chave específicas
    for (const [key, response] of Object.entries(contextMap)) {
      if (key !== 'default' && lowerMessage.includes(key)) {
        return response;
      }
    }
    
    // Retornar resposta padrão do contexto
    return contextMap.default;
  }

  async validateApiKey(): Promise<boolean> {
    try {
      await this.sendMessage({
        message: 'Teste de conexão',
        conversation_id: 'test-' + Date.now(),
        max_tokens: 50,
      });
      return true;
    } catch {
      return false;
    }
  }

  generateConversationId(): string {
    return 'ayumi-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  getQuickPrompts() {
    return [
      {
        category: 'Vendas',
        prompts: [
          'Como abordar um cliente indeciso sobre fazer a CNH?',
          'Quais são as melhores técnicas para vender aulas extras?',
          'Como superar a objeção "está muito caro"?',
          'Scripts para fechamento de vendas de CNH'
        ]
      },
      {
        category: 'Atendimento',
        prompts: [
          'Como atender um cliente nervoso com a prova?',
          'Protocolo para resolver problemas de agendamento',
          'Como explicar processos complexos de forma simples?',
          'Atendimento diferenciado para cada perfil de cliente'
        ]
      },
      {
        category: 'Legislação',
        prompts: [
          'Documentos necessários para primeira habilitação',
          'Processo de renovação da CNH vencida',
          'Mudança de categoria: requisitos e prazos',
          'Infrações que levam à suspensão da CNH',
          'Procedimentos para CNH definitiva'
        ]
      },
      {
        category: 'Desenvolvimento',
        prompts: [
          'Como melhorar minhas habilidades de vendas?',
          'Técnicas para ser mais persuasivo no atendimento',
          'Como me manter atualizado na legislação?',
          'Dicas para crescer profissionalmente no Grupo Onishi'
        ]
      }
    ];
  }
}

export const ayumiService = new AyumiService();
