# 🤖 Ayumi - IA Especialista em Contratos da Auto Escola Onishi

## 📋 Visão Geral

A **Ayumi** é uma inteligência artificial especializada em contratos da Auto Escola Onishi, desenvolvida para responder dúvidas sobre cláusulas contratuais, direitos, obrigações e todos os aspectos legais dos serviços oferecidos.

## ✨ Funcionalidades Principais

### 🎯 Especialidades
- **Contratos e Cláusulas**: Análise detalhada de cláusulas contratuais
- **Direitos e Obrigações**: Esclarecimento sobre responsabilidades das partes
- **Legislação Aplicável**: Base legal dos contratos
- **Cancelamento e Rescisão**: Processos de encerramento contratual
- **Valores e Taxas**: Informações sobre custos e condições de pagamento
- **Políticas de Faltas**: Regras sobre ausências e penalidades
- **Sistema de Agendamento**: Como funcionam os cronogramas
- **Documentação**: Requisitos e documentos necessários
- **Garantias**: Proteções contratuais e reclamações

### 🚀 Recursos da Interface
- **Chat Inteligente**: Interface conversacional natural
- **Filtros por Categoria**: Organização temática das informações
- **Perguntas Rápidas**: Acesso rápido às dúvidas mais comuns
- **Sistema de Fontes**: Citação das bases legais e contratuais
- **Indicador de Confiança**: Nível de precisão das respostas
- **Exportação de Conversas**: Salvamento das interações
- **Histórico de Mensagens**: Acompanhamento das consultas

## 🏗️ Arquitetura Técnica

### 📁 Estrutura de Arquivos
```
├── components/
│   └── AyumiContratosInterface.tsx    # Interface principal
├── hooks/
│   └── useAyumiContratos.ts           # Hook personalizado
├── lib/
│   └── contratosDatabase.ts           # Base de conhecimento
├── config/
│   └── ayumiContratos.ts              # Configurações
└── app/
    └── contratos/
        └── page.tsx                    # Página da aplicação
```

### 🔧 Tecnologias Utilizadas
- **Next.js 14**: Framework React com App Router
- **TypeScript**: Tipagem estática para maior confiabilidade
- **Tailwind CSS**: Framework CSS utilitário
- **Lucide React**: Ícones modernos e consistentes
- **React Hooks**: Gerenciamento de estado e efeitos

## 🎨 Interface do Usuário

### 🎨 Design System
- **Tema**: Profissional e confiável
- **Cores**: Paleta azul/índigo para transmitir confiança
- **Tipografia**: Hierarquia clara e legível
- **Responsividade**: Adaptação para todos os dispositivos

### 📱 Componentes Principais
1. **Header**: Apresentação da IA e suas especialidades
2. **Filtros de Categoria**: Navegação temática
3. **Perguntas Rápidas**: Acesso direto às dúvidas comuns
4. **Chat Interface**: Conversação natural com a IA
5. **Painel de Estatísticas**: Visão geral da base de conhecimento

## 🗄️ Base de Conhecimento

### 📊 Estrutura dos Dados
```typescript
interface ContractQA {
  keywords: string[];           // Palavras-chave para busca
  question: string;             // Pergunta específica
  answer: string;               // Resposta detalhada
  category: string;             // Categoria temática
  contractSection: string;      // Seção do contrato
  legalBasis?: string;          // Base legal (opcional)
}
```

### 🏷️ Categorias Disponíveis
- **Obrigações e Direitos** (Verde)
- **Cancelamento e Rescisão** (Vermelho)
- **Valores e Taxas** (Âmbar)
- **Faltas e Penalidades** (Laranja)
- **Agendamento** (Azul)
- **Documentação** (Roxo)
- **Garantias** (Verde)
- **Legislação** (Azul Escuro)

## 🚀 Como Usar

### 1. **Acesso à Interface**
- Navegue para `/contratos` na aplicação
- A interface carrega automaticamente com a saudação da Ayumi

### 2. **Fazendo Perguntas**
- **Perguntas Rápidas**: Clique em uma das opções pré-definidas
- **Pergunta Personalizada**: Digite sua dúvida no campo de texto
- **Filtros**: Use as categorias para focar em temas específicos

### 3. **Navegando pelas Respostas**
- **Categorias**: Identificadas por cores e badges
- **Fontes**: Sempre citadas para referência
- **Confiança**: Indicador visual da precisão da resposta
- **Histórico**: Acompanhe toda a conversa

### 4. **Funcionalidades Avançadas**
- **Exportar Conversa**: Salve a interação em arquivo de texto
- **Limpar Histórico**: Reinicie a conversa
- **Filtros Dinâmicos**: Explore por categorias específicas

## ⚙️ Configuração

### 🔧 Arquivo de Configuração
```typescript
// config/ayumiContratos.ts
export const ayumiContratosConfig = {
  ai: {
    name: 'Ayumi',
    role: 'Especialista em Contratos da Auto Escola Onishi',
    personality: 'Profissional, precisa e amigável'
  },
  interface: {
    theme: 'professional',
    primaryColor: '#2563eb',
    responseDelay: 1500
  }
  // ... outras configurações
};
```

### 🎨 Personalização de Cores
```typescript
categories: {
  colors: {
    'Obrigações e Direitos': '#059669',
    'Cancelamento e Rescisão': '#dc2626',
    'Valores e Taxas': '#d97706'
    // ... outras categorias
  }
}
```

## 📈 Métricas e Performance

### 📊 Indicadores de Qualidade
- **Taxa de Acerto**: Baseada na base de conhecimento
- **Tempo de Resposta**: Otimizado para experiência do usuário
- **Cobertura Temática**: Abrangência das categorias
- **Satisfação do Usuário**: Feedback sobre as respostas

### 🚀 Otimizações
- **Cache Inteligente**: Respostas em memória
- **Busca Semântica**: Palavras-chave e relevância
- **Lazy Loading**: Carregamento sob demanda
- **Responsividade**: Performance em todos os dispositivos

## 🔒 Segurança e Privacidade

### 🛡️ Medidas de Proteção
- **Dados Locais**: Nenhuma informação é enviada para servidores externos
- **Validação de Entrada**: Sanitização de perguntas do usuário
- **Base de Conhecimento Controlada**: Respostas pré-aprovadas
- **Auditoria**: Histórico completo das interações

### 📋 Conformidade Legal
- **LGPD**: Conformidade com a Lei Geral de Proteção de Dados
- **Código de Defesa do Consumidor**: Respeito aos direitos do usuário
- **Transparência**: Fontes sempre citadas e verificáveis

## 🚀 Roadmap e Melhorias

### 🔮 Próximas Funcionalidades
- **Integração com IA Externa**: OpenAI, Claude ou similar
- **Análise de Documentos**: Upload e análise de contratos
- **Chat em Tempo Real**: WebSocket para múltiplos usuários
- **Relatórios Avançados**: Analytics e insights
- **API REST**: Endpoints para integração externa

### 🎯 Melhorias Planejadas
- **Machine Learning**: Aprendizado com interações
- **Multilíngue**: Suporte a outros idiomas
- **Voz**: Interface por comando de voz
- **Mobile App**: Aplicativo nativo para dispositivos móveis

## 🤝 Contribuição

### 📝 Como Contribuir
1. **Fork** do repositório
2. **Branch** para nova funcionalidade
3. **Commit** das mudanças
4. **Push** para o branch
5. **Pull Request** para revisão

### 🐛 Reportando Bugs
- Use o sistema de issues do GitHub
- Inclua passos para reproduzir
- Adicione screenshots quando relevante
- Especifique o ambiente (browser, OS, etc.)

## 📞 Suporte

### 🆘 Canais de Ajuda
- **Documentação**: Este README e arquivos de código
- **Issues**: GitHub Issues para bugs e sugestões
- **Email**: Suporte técnico da equipe de desenvolvimento

### 📚 Recursos Adicionais
- **Base de Conhecimento**: Documentação completa dos contratos
- **Tutoriais**: Guias passo a passo
- **FAQ**: Perguntas frequentes e respostas
- **Vídeos**: Demonstrações em vídeo

## 📄 Licença

Este projeto é desenvolvido para uso interno da Auto Escola Onishi. Todos os direitos reservados.

---

**Desenvolvido com ❤️ pela equipe de desenvolvimento da Auto Escola Onishi**

*Última atualização: Dezembro 2024*
