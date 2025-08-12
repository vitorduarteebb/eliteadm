export interface AyumiRules {
  // Horários de funcionamento
  workingHours: {
    enabled: boolean;
    startTime: string; // HH:MM
    endTime: string; // HH:MM
    timezone: string;
    allowWeekends: boolean;
    allowHolidays: boolean;
  };
  
  // Limites de uso
  usageLimits: {
    maxResponsesPerDay: number;
    maxResponsesPerHour: number;
    maxResponsesPerUser: number;
    maxConcurrentUsers: number;
    maxDevicesPerUser: number;
  };
  
  // Controle de acesso
  accessControl: {
    requireAuthentication: boolean;
    allowedRoles: string[];
    blockedUsers: string[];
    maintenanceMode: boolean;
    maintenanceMessage: string;
  };
  
  // Monitoramento
  monitoring: {
    trackUsage: boolean;
    logAllRequests: boolean;
    alertOnLimit: boolean;
    dailyReports: boolean;
  };
  
  // Configurações da IA
  aiSettings: {
    maxTokensPerResponse: number;
    temperature: number;
    responseTimeout: number;
    fallbackEnabled: boolean;
    customPrompts: string[];
  };
}

export const defaultAyumiRules: AyumiRules = {
  workingHours: {
    enabled: true,
    startTime: "08:00",
    endTime: "18:00",
    timezone: "America/Sao_Paulo",
    allowWeekends: false,
    allowHolidays: false
  },
  
  usageLimits: {
    maxResponsesPerDay: 1000,
    maxResponsesPerHour: 100,
    maxResponsesPerUser: 50,
    maxConcurrentUsers: 100,
    maxDevicesPerUser: 3
  },
  
  accessControl: {
    requireAuthentication: true,
    allowedRoles: ['admin', 'manager', 'user', 'viewer'],
    blockedUsers: [],
    maintenanceMode: false,
    maintenanceMessage: "A Ayumi está em manutenção. Tente novamente em alguns minutos."
  },
  
  monitoring: {
    trackUsage: true,
    logAllRequests: true,
    alertOnLimit: true,
    dailyReports: true
  },
  
  aiSettings: {
    maxTokensPerResponse: 500,
    temperature: 0.7,
    responseTimeout: 30000,
    fallbackEnabled: true,
    customPrompts: []
  }
};

// Funções utilitárias para verificar regras
export class AyumiRulesChecker {
  private rules: AyumiRules;
  
  constructor(rules: AyumiRules) {
    this.rules = rules;
  }
  
  // Verificar se está dentro do horário de funcionamento
  isWithinWorkingHours(): boolean {
    if (!this.rules.workingHours.enabled) return true;
    
    const now = new Date();
    const currentTime = now.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: this.rules.workingHours.timezone 
    });
    
    const start = this.rules.workingHours.startTime;
    const end = this.rules.workingHours.endTime;
    
    // Verificar se é fim de semana
    if (!this.rules.workingHours.allowWeekends && (now.getDay() === 0 || now.getDay() === 6)) {
      return false;
    }
    
    return currentTime >= start && currentTime <= end;
  }
  
  // Verificar limite de respostas por usuário
  canUserRequest(userId: string, userUsage: number): boolean {
    return userUsage < this.rules.usageLimits.maxResponsesPerUser;
  }
  
  // Verificar limite de dispositivos
  canUserLoginFromDevice(userId: string, currentDevices: number): boolean {
    return currentDevices < this.rules.usageLimits.maxDevicesPerUser;
  }
  
  // Verificar se usuário está bloqueado
  isUserBlocked(userId: string): boolean {
    return this.rules.accessControl.blockedUsers.includes(userId);
  }
  
  // Verificar se está em modo manutenção
  isMaintenanceMode(): boolean {
    return this.rules.accessControl.maintenanceMode;
  }
  
  // Obter mensagem de erro baseada na regra violada
  getErrorMessage(userId: string, userUsage: number, currentDevices: number): string {
    if (this.isMaintenanceMode()) {
      return this.rules.accessControl.maintenanceMessage;
    }
    
    if (!this.isWithinWorkingHours()) {
      return `A Ayumi está disponível apenas das ${this.rules.workingHours.startTime} às ${this.rules.workingHours.endTime}.`;
    }
    
    if (this.isUserBlocked(userId)) {
      return "Seu acesso à Ayumi foi bloqueado. Entre em contato com o administrador.";
    }
    
    if (!this.canUserRequest(userId, userUsage)) {
      return `Você atingiu o limite de ${this.rules.usageLimits.maxResponsesPerUser} respostas por dia. Tente novamente amanhã.`;
    }
    
    if (!this.canUserLoginFromDevice(userId, currentDevices)) {
      return `Você já está logado em ${currentDevices} dispositivos. Deslogue de um dispositivo para continuar.`;
    }
    
    return "Acesso negado por regras do sistema.";
  }
}
