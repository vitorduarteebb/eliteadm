export const PRODUCTION_CONFIG = {
  // Configurações da aplicação
  APP_NAME: 'EliteADM',
  APP_URL: 'https://eliteadm.com',
  APP_VERSION: '1.0.0',
  
  // Configurações de segurança
  SESSION_SECRET: process.env.NEXTAUTH_SECRET || 'eliteadm-production-secret-key',
  COOKIE_SECURE: true,
  COOKIE_HTTPONLY: true,
  
  // Configurações da API
  API_BASE_URL: 'https://eliteadm.com/api',
  
  // Configurações da Ayumi
  AYUMI: {
    API_URL: 'https://app.adapta.one/chats/shared/d40fb126-bbf1-43f1-8b9d-2b0a80ec27ad',
    API_KEY: process.env.AYUMI_API_KEY || 'default-key',
    MAX_REQUESTS_PER_MINUTE: 60,
    TIMEOUT: 30000
  },
  
  // Configurações de cache
  CACHE: {
    TTL: 3600, // 1 hora
    MAX_SIZE: 1000
  },
  
  // Configurações de logs
  LOGGING: {
    LEVEL: 'info',
    ENABLE_FILE_LOGS: true,
    LOG_DIR: '/var/log/eliteadm'
  },
  
  // Configurações de monitoramento
  MONITORING: {
    ENABLE_HEALTH_CHECKS: true,
    HEALTH_CHECK_INTERVAL: 300000, // 5 minutos
    ENABLE_METRICS: true
  }
};
