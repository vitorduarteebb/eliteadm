# 🚀 Guia de Instalação - Portal Auto

## Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Chave API da Bradial (opcional para desenvolvimento)

## Instalação Rápida

### 1. Clonar e Instalar

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd PortalAuto

# Execute a instalação completa
npm run setup
```

### 2. Configurar Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo
cp env.example .env.local

# Edite as configurações
# Mínimo necessário para desenvolvimento:
NEXT_PUBLIC_API_URL=http://localhost:3000/api
JWT_SECRET=seu_jwt_secret_super_seguro_aqui
```

### 3. Executar a Aplicação

```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## 📱 Instalação PWA

### Android (Chrome)
1. Abra https://localhost:3000 no Chrome
2. Toque no menu (⋮) 
3. Selecione "Adicionar à tela inicial"
4. Confirme "Instalar"

### iOS (Safari)
1. Abra https://localhost:3000 no Safari
2. Toque no botão de compartilhar (□↗)
3. Selecione "Adicionar à Tela Inicial"
4. Toque "Adicionar"

## 🔑 Usuários de Teste

### Administrador
- **Email**: admin@portalauto.com  
- **Senha**: password
- **Acesso**: Completo (usuários, IA, monitoramento, controle de acesso)

### Usuário Regular  
- **Email**: user@portalauto.com
- **Senha**: password  
- **Acesso**: IA limitada (100 consultas/mês)

## 🔧 Configuração da IA Bradial

Para usar a IA Bradial em produção:

1. Obtenha sua chave API em https://bradial.com
2. Configure no `.env.local`:

```bash
NEXT_PUBLIC_BRADIAL_API_KEY=sua_chave_aqui
NEXT_PUBLIC_BRADIAL_API_URL=https://api.bradial.com/v1
```

## 🛠️ Desenvolvimento

### Estrutura do Projeto

```
PortalAuto/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes React
│   ├── auth/             # Autenticação
│   ├── ui/               # Componentes de UI
│   ├── Dashboard.tsx     # Dashboard principal
│   └── ...
├── lib/                  # Utilitários e serviços
│   ├── context/         # Context API
│   ├── services/        # Serviços de API
│   ├── types/           # TypeScript types
│   └── utils.ts         # Utilitários
├── public/              # Arquivos estáticos
│   ├── manifest.json    # PWA Manifest
│   ├── sw.js           # Service Worker
│   └── icons/          # Ícones PWA
└── scripts/            # Scripts de build
```

### Scripts Disponíveis

```bash
npm run dev        # Desenvolvimento
npm run build      # Build de produção  
npm run start      # Executar produção
npm run lint       # Linter
npm run icons      # Gerar ícones PWA
npm run setup      # Instalação completa
```

## 🔒 Segurança

### Produção
- Use HTTPS obrigatoriamente
- Configure JWT_SECRET forte e único
- Implemente rate limiting
- Configure CORS adequadamente
- Use banco de dados real (não mock)

### Desenvolvimento
- Nunca commite .env.local
- Use senhas seguras mesmo em desenvolvimento
- Teste sempre em HTTPS para PWA

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel --prod
```

### Docker
```bash
# Build da imagem
docker build -t portal-auto .

# Executar container
docker run -p 3000:3000 portal-auto
```

### Manual
```bash
npm run build
npm start
```

## 🐛 Solução de Problemas

### PWA não instala
- ✅ Verifique HTTPS
- ✅ Confirme manifest.json acessível
- ✅ Teste service worker funcionando

### Erro de autenticação
- ✅ Verifique JWT_SECRET configurado
- ✅ Teste com usuários padrão
- ✅ Confirme cookies/localStorage

### IA não responde
- ✅ Verifique chave API Bradial
- ✅ Teste conectividade
- ✅ Confirme limites de uso

### Build falha
- ✅ Node.js versão 18+
- ✅ Dependências instaladas
- ✅ TypeScript sem erros

## 📞 Suporte

- 📧 Email: suporte@portalauto.com
- 🐛 Issues: GitHub Issues
- 📚 Docs: README.md
- 🔗 API Bradial: https://docs.bradial.com

## ✅ Checklist Pós-Instalação

- [ ] Aplicação carrega em http://localhost:3000
- [ ] Login funciona com usuários de teste
- [ ] PWA pode ser instalada
- [ ] Dashboard exibe corretamente
- [ ] IA responde (se configurada)
- [ ] Usuários podem ser gerenciados
- [ ] Monitoramento funciona
- [ ] App funciona offline básico

---

🎉 **Parabéns!** Seu Portal Auto está pronto para uso!

Para dúvidas específicas, consulte a documentação completa no README.md
