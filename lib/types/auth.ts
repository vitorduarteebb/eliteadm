export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
  permissions: Permission[];
  aiUsageLimit: number;
  aiUsageCount: number;
  aiUsageResetDate: Date;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'dashboard' | 'users' | 'kambam' | 'contacts' | 'ai' | 'reports';
  granted: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  checkAIUsageLimit: () => boolean;
  incrementAIUsage: () => void;
  hasPermission: (permissionName: string) => boolean;
}

// Novos tipos para o sistema Kambam e Contatos
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'lead' | 'prospect' | 'client' | 'inactive';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  tags: string[];
  notes: string;
  lastContact?: Date;
  nextFollowUp?: Date;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  // Campos para integração com Google Calendar
  googleCalendarEventId?: string;
  googleCalendarLink?: string;
  isSyncedWithGoogle?: boolean;
  lastGoogleSync?: Date;
}

export interface KambamCard {
  id: string;
  title: string;
  description: string;
  status: 'to_do' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  daysInStatus: number;
  tags: string[];
  attachments: string[];
}

export interface KambamColumn {
  id: string;
  title: string;
  status: string;
  cards: KambamCard[];
  order: number;
}

export interface KambamBoard {
  id: string;
  name: string;
  description: string;
  columns: KambamColumn[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: string;
  contactId: string;
  title: string;
  description: string;
  date: Date;
  duration: number; // em minutos
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  type: 'call' | 'meeting' | 'demo' | 'follow_up';
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  // Campos para integração com Google Calendar
  googleCalendarEventId?: string;
  googleCalendarLink?: string;
  isSyncedWithGoogle?: boolean;
  lastGoogleSync?: Date;
}
