# Configuração da Integração com Google Calendar

Este documento explica como configurar a integração do PortalAuto com o Google Calendar para sincronizar automaticamente os agendamentos de contatos.

## Pré-requisitos

- Conta Google com acesso ao Google Calendar
- Projeto no Google Cloud Console
- API do Google Calendar habilitada

## Passo a Passo

### 1. Criar Projeto no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Clique em "Selecionar projeto" e depois "Novo projeto"
3. Digite um nome para o projeto (ex: "PortalAuto Calendar")
4. Clique em "Criar"

### 2. Habilitar APIs

1. No menu lateral, vá em "APIs e serviços" > "Biblioteca"
2. Procure e habilite as seguintes APIs:
   - Google Calendar API
   - Google+ API (para informações do usuário)

### 3. Configurar OAuth 2.0

1. No menu lateral, vá em "APIs e serviços" > "Credenciais"
2. Clique em "Criar credenciais" > "ID do cliente OAuth 2.0"
3. Configure a tela de consentimento OAuth:
   - Nome do app: "PortalAuto"
   - Email de suporte: seu email
   - Domínios autorizados: localhost (para desenvolvimento)
4. Configure as credenciais OAuth:
   - Tipo de aplicativo: "Aplicativo da Web"
   - Nome: "PortalAuto Web Client"
   - URIs de redirecionamento autorizados:
     - `http://localhost:3000/api/auth/google/callback` (desenvolvimento)
     - `https://seudominio.com/api/auth/google/callback` (produção)

### 4. Obter Credenciais

Após criar as credenciais, você receberá:
- ID do cliente
- Segredo do cliente

### 5. Configurar Variáveis de Ambiente

1. Copie o arquivo `env.example` para `.env.local`
2. Preencha as seguintes variáveis:

```env
# Google Calendar Integration
GOOGLE_CLIENT_ID=seu_client_id_aqui
GOOGLE_CLIENT_SECRET=seu_client_secret_aqui
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
GOOGLE_CALENDAR_ID=primary
```

**Nota:** Para produção, altere a URI de redirecionamento para seu domínio.

### 6. Testar a Integração

1. Inicie o servidor de desenvolvimento: `npm run dev`
2. Acesse a página de contatos
3. Clique em "Conectar com Google"
4. Autorize o acesso na tela do Google
5. Verifique se a conexão foi estabelecida

## Funcionalidades

### Sincronização Automática

- **Novos Agendamentos**: Quando você criar um agendamento para um contato, ele será automaticamente adicionado ao Google Calendar
- **Atualizações**: Alterações em agendamentos existentes são sincronizadas
- **Exclusões**: Agendamentos removidos são excluídos do Google Calendar

### Sincronização Manual

- **Botão "Sincronizar com Google"**: Sincroniza todos os agendamentos pendentes
- **Indicador Visual**: Mostra quais agendamentos já foram sincronizados

### Gestão de Eventos

- **Criação**: Eventos são criados com título, descrição, data/hora e participantes
- **Lembretes**: Configurados automaticamente (15 min antes por popup, 1 hora antes por email)
- **Participantes**: Contatos são adicionados automaticamente como participantes

## Estrutura dos Eventos

Cada evento no Google Calendar inclui:

```json
{
  "summary": "[ID_CONTATO] Título do Agendamento",
  "description": "Descrição detalhada",
  "start": {
    "dateTime": "2025-08-13T10:00:00",
    "timeZone": "America/Sao_Paulo"
  },
  "end": {
    "dateTime": "2025-08-13T11:00:00",
    "timeZone": "America/Sao_Paulo"
  },
  "attendees": [
    {
      "email": "contato@email.com",
      "displayName": "Nome do Contato"
    }
  ],
  "reminders": {
    "useDefault": false,
    "overrides": [
      { "method": "popup", "minutes": 15 },
      { "method": "email", "minutes": 60 }
    ]
  }
}
```

## Solução de Problemas

### Erro de Autenticação

- Verifique se as credenciais OAuth estão corretas
- Confirme se as URIs de redirecionamento estão configuradas
- Verifique se as APIs estão habilitadas

### Eventos Não Sincronizados

- Verifique se a conta Google está conectada
- Confirme se o contato tem email válido
- Verifique os logs do console para erros

### Problemas de Permissão

- Verifique se o usuário autorizou o acesso ao calendário
- Confirme se o calendário não está restrito
- Verifique as configurações de compartilhamento do calendário

## Segurança

- **Tokens**: São armazenados localmente no navegador
- **Permissões**: Apenas leitura/escrita no calendário especificado
- **Escopo**: Limitado ao calendário do usuário autenticado

## Limitações

- **Rate Limiting**: Google Calendar tem limites de requisições por minuto
- **Sincronização**: Pode haver atraso de alguns segundos
- **Calendários Compartilhados**: Apenas calendários próprios são suportados

## Suporte

Para problemas técnicos ou dúvidas sobre a integração:

1. Verifique os logs do console do navegador
2. Consulte a [documentação da API do Google Calendar](https://developers.google.com/calendar)
3. Abra uma issue no repositório do projeto

## Atualizações

Esta integração é mantida e atualizada regularmente. Para obter as últimas funcionalidades:

1. Atualize o código do projeto
2. Verifique se há mudanças nas variáveis de ambiente
3. Teste a funcionalidade após atualizações








