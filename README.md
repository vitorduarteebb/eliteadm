# Portal Auto - Gestão Inteligente com IA

Uma aplicação web progressiva (PWA) para gestão segura e controle de acesso à IA Bradial.

## 🚀 Características

- **PWA Completa**: Instalável no Android e iOS
- **Autenticação Segura**: Sistema de login e senha com JWT
- **Gestão de Usuários**: Cadastro, edição e controle de permissões
- **IA Bradial**: Integração com API para chat inteligente
- **Sistema de Alertas**: Monitoramento de uso excessivo da IA
- **Controle de Acesso**: Filtros e regras personalizáveis
- **Interface Moderna**: Design responsivo com Tailwind CSS
- **Segurança**: Autenticação, autorização e proteção de rotas
- **Google Calendar**: Sincronização automática de agendamentos

## 🛠️ Tecnologias

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Autenticação**: JWT, bcryptjs
- **PWA**: Service Worker, Manifest
- **UI Components**: Lucide React Icons
- **Forms**: React Hook Form
- **API**: Next.js API Routes

## 📦 Instalação

1. **Clone o repositório**:
```bash
git clone <repo-url>
cd PortalAuto
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Configure as variáveis de ambiente**:
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_BRADIAL_API_KEY=sua_chave_bradial
NEXT_PUBLIC_BRADIAL_API_URL=https://api.bradial.com/v1
JWT_SECRET=seu_jwt_secret_muito_seguro
```

4. **Execute em desenvolvimento**:
```bash
npm run dev
```

5. **Acesse a aplicação**:
- Abra http://localhost:3000

## 👥 Usuários de Teste

### Administrador
- **E-mail**: admin@portalauto.com
- **Senha**: password
- **Permissões**: Acesso completo ao sistema

### Usuário Regular
- **E-mail**: user@portalauto.com
- **Senha**: password
- **Permissões**: Uso da IA e visualização básica

## 🔧 Configuração PWA

### Instalação Mobile

1. **Android**:
   - Abra no Chrome
   - Toque em "Adicionar à tela inicial"
   - Confirme a instalação

2. **iOS**:
   - Abra no Safari
   - Toque no botão de compartilhar
   - Selecione "Adicionar à Tela Inicial"

### Recursos PWA

- ✅ Funciona offline (cache básico)
- ✅ Instalável como app nativo
- ✅ Ícones otimizados para todas as resoluções
- ✅ Splash screen personalizada
- ✅ Tema da status bar
- ✅ Service Worker para cache

## 🔐 Sistema de Segurança

### Autenticação
- Login com e-mail e senha
- Tokens JWT com expiração
- Validação de sessão automática
- Logout seguro

### Autorização
- Sistema de roles (admin, moderator, user)
- Permissões granulares
- Controle de acesso baseado em regras
- Middleware de proteção de rotas

### Monitoramento
- Rastreamento de uso da IA
- Alertas de limite
- Logs de acesso
- Estatísticas de uso

## 🤖 Integração IA Bradial

### Configuração
1. Obtenha sua chave API da Bradial
2. Configure a URL base da API
3. Defina limites de uso por usuário
4. Configure alertas de uso excessivo

### Funcionalidades
- Chat em tempo real
- Histórico de conversas
- Controle de uso
- Limites configuráveis
- Alertas automáticos

## 📅 Integração Google Calendar

### Configuração
1. Crie um projeto no Google Cloud Console
2. Habilite a API do Google Calendar
3. Configure credenciais OAuth 2.0
4. Configure as variáveis de ambiente

### Funcionalidades
- Sincronização automática de agendamentos
- Criação de eventos no Google Calendar
- Lembretes automáticos (popup e email)
- Participantes adicionados automaticamente
- Sincronização manual e automática

**Para configuração detalhada, consulte o arquivo `GOOGLE_CALENDAR_SETUP.md`**

## 📊 Gerenciamento

### Usuários
- Cadastro e edição
- Ativação/desativação
- Controle de permissões
- Histórico de acesso

### Monitoramento
- Estatísticas de uso
- Alertas de limite
- Relatórios de atividade
- Métricas de performance

### Controle de Acesso
- Regras personalizáveis
- Permissões granulares
- Grupos de usuários
- Políticas de segurança

## 🚀 Deploy

### Produção

1. **Build da aplicação**:
```bash
npm run build
```

2. **Inicie o servidor**:
```bash
npm start
```

### Variáveis de Ambiente

```bash
# Essenciais para produção
NEXT_PUBLIC_API_URL=https://seudominio.com/api
NEXT_PUBLIC_BRADIAL_API_KEY=chave_producao_bradial
NEXT_PUBLIC_BRADIAL_API_URL=https://api.bradial.com/v1
JWT_SECRET=jwt_secret_muito_seguro_e_aleatorio
NODE_ENV=production
```

## 📱 Recursos Mobile

- Interface totalmente responsiva
- Touch-friendly
- Gestos nativos
- Otimizado para pequenas telas
- PWA instalável
- Funciona offline

## 🔄 Atualizações

O sistema suporta atualizações automáticas via Service Worker:

1. Nova versão detectada automaticamente
2. Cache atualizado em background
3. Usuário notificado para refresh
4. Atualização sem perda de dados

## 🐛 Solução de Problemas

### PWA não instala
- Verifique se o HTTPS está ativo
- Confirme se o manifest.json está acessível
- Teste em diferentes navegadores

### Erro de autenticação
- Verifique o JWT_SECRET
- Confirme a validade do token
- Teste com usuários de exemplo

### IA não responde
- Verifique a chave da API Bradial
- Teste a conectividade
- Confirme os limites de uso

## 📞 Suporte

Para suporte técnico ou dúvidas:
- Abra uma issue no repositório
- Consulte a documentação da API Bradial
- Verifique os logs do console

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

---

Desenvolvido com ❤️ para gestão inteligente e segura de IA.
