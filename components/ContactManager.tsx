'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { Contact, Appointment } from '@/lib/types/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Calendar, 
  Phone, 
  Mail, 
  Building,
  Tag,
  Clock,
  AlertTriangle,
  UserCheck,
  UserX,
  Star,
  Filter,
  MoreVertical,
  Eye,
  MessageSquare
} from 'lucide-react';

export function ContactManager() {
  const { user: currentUser } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [showCreateContact, setShowCreateContact] = useState(false);
  const [showCreateAppointment, setShowCreateAppointment] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newContactData, setNewContactData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'lead' as const,
    priority: 'medium' as const,
    tags: '',
    notes: '',
    assignedTo: ''
  });

  // Dados de exemplo para demonstração
  useEffect(() => {
    const sampleContacts: Contact[] = [
      {
        id: '1',
        name: 'João Silva',
        email: 'joao@empresa.com',
        phone: '(11) 99999-9999',
        company: 'Tech Solutions Ltda',
        status: 'lead',
        priority: 'high',
        tags: ['tech', 'startup', 'interessado'],
        notes: 'Cliente interessado em solução de IA para automação',
        lastContact: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        nextFollowUp: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        assignedTo: 'Maria Santos',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      },
      {
        id: '2',
        name: 'Ana Oliveira',
        email: 'ana@consultoria.com',
        phone: '(21) 88888-8888',
        company: 'Consultoria ABC',
        status: 'prospect',
        priority: 'medium',
        tags: ['consultoria', 'médio-porte'],
        notes: 'Precisa de demonstração da plataforma',
        lastContact: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        nextFollowUp: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        assignedTo: 'Pedro Costa',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      },
      {
        id: '3',
        name: 'Carlos Mendes',
        email: 'carlos@corporacao.com',
        phone: '(31) 77777-7777',
        company: 'Corporação XYZ',
        status: 'client',
        priority: 'low',
        tags: ['corporativo', 'cliente-ativo'],
        notes: 'Cliente ativo, contrato renovado',
        lastContact: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        nextFollowUp: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        assignedTo: 'João Silva',
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      }
    ];

    const sampleAppointments: Appointment[] = [
      {
        id: '1',
        contactId: '1',
        title: 'Demonstração da Plataforma',
        description: 'Apresentar funcionalidades da IA Bradial',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        duration: 60,
        status: 'scheduled',
        type: 'demo',
        notes: 'Cliente interessado em automação',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        contactId: '2',
        title: 'Reunião de Follow-up',
        description: 'Discutir próximos passos',
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        duration: 30,
        status: 'scheduled',
        type: 'meeting',
        notes: 'Verificar interesse na proposta',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    setContacts(sampleContacts);
    setFilteredContacts(sampleContacts);
    setAppointments(sampleAppointments);
  }, []);

  useEffect(() => {
    let filtered = contacts;

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtro por status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(contact => contact.status === selectedStatus);
    }

    // Filtro por prioridade
    if (selectedPriority !== 'all') {
      filtered = filtered.filter(contact => contact.priority === selectedPriority);
    }

    setFilteredContacts(filtered);
  }, [contacts, searchTerm, selectedStatus, selectedPriority]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'lead': return 'bg-blue-100 text-blue-800';
      case 'prospect': return 'bg-yellow-100 text-yellow-800';
      case 'client': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return '🔴';
      case 'high': return '🟠';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const getDaysSinceLastContact = (lastContact: Date) => {
    const days = Math.floor((Date.now() - lastContact.getTime()) / (1000 * 60 * 60 * 24));
    if (days >= 7) return { days, color: 'text-red-600 font-semibold' };
    if (days >= 5) return { days, color: 'text-orange-600 font-semibold' };
    if (days >= 3) return { days, color: 'text-yellow-600 font-semibold' };
    return { days, color: 'text-gray-600' };
  };

  const hasUpcomingAppointment = (contactId: string) => {
    return appointments.some(apt => 
      apt.contactId === contactId && 
      apt.status === 'scheduled' && 
      apt.date > new Date()
    );
  };

  const getNextAppointment = (contactId: string) => {
    return appointments
      .filter(apt => apt.contactId === contactId && apt.status === 'scheduled' && apt.date > new Date())
      .sort((a, b) => a.date.getTime() - b.date.getTime())[0];
  };

  const handleCreateContact = () => {
    if (!newContactData.name || !newContactData.email) return;

    const newContact: Contact = {
      id: Date.now().toString(),
      name: newContactData.name,
      email: newContactData.email,
      phone: newContactData.phone,
      company: newContactData.company || undefined,
      status: newContactData.status,
      priority: newContactData.priority,
      tags: newContactData.tags ? newContactData.tags.split(',').map(t => t.trim()) : [],
      notes: newContactData.notes,
      assignedTo: newContactData.assignedTo || undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setContacts([...contacts, newContact]);
    
    // Reset form
    setNewContactData({
      name: '',
      email: '',
      phone: '',
      company: '',
      status: 'lead',
      priority: 'medium',
      tags: '',
      notes: '',
      assignedTo: ''
    });
    setShowCreateContact(false);
  };

  const handleDeleteContact = (contactId: string) => {
    if (!confirm('Tem certeza que deseja excluir este contato?')) return;
    setContacts(contacts.filter(c => c.id !== contactId));
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'lead': return 'Lead';
      case 'prospect': return 'Prospecto';
      case 'client': return 'Cliente';
      case 'inactive': return 'Inativo';
      default: return status;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'Urgente';
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return priority;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center">
                <Users className="h-6 w-6 mr-2" />
                Gerenciamento de Contatos
              </CardTitle>
              <p className="text-gray-600">Gerencie seus leads, prospectos e clientes</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={() => setShowCreateContact(true)}
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Contato
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowCreateAppointment(true)}
                className="flex items-center"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Novo Agendamento
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar contatos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Todos os Status</option>
                <option value="lead">Lead</option>
                <option value="prospect">Prospecto</option>
                <option value="client">Cliente</option>
                <option value="inactive">Inativo</option>
              </select>
              
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Todas as Prioridades</option>
                <option value="urgent">Urgente</option>
                <option value="high">Alta</option>
                <option value="medium">Média</option>
                <option value="low">Baixa</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold">{contacts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 font-bold">
                  {contacts.filter(c => c.status === 'lead').length}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Leads</p>
                <p className="text-lg font-bold text-blue-600">
                  {contacts.filter(c => c.status === 'lead').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-yellow-600 font-bold">
                  {contacts.filter(c => c.status === 'prospect').length}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Prospectos</p>
                <p className="text-lg font-bold text-yellow-600">
                  {contacts.filter(c => c.status === 'prospect').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 font-bold">
                  {contacts.filter(c => c.status === 'client').length}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Clientes</p>
                <p className="text-lg font-bold text-green-600">
                  {contacts.filter(c => c.status === 'client').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Sem Contato</p>
                <p className="text-lg font-bold text-red-600">
                  {contacts.filter(c => {
                    if (!c.lastContact) return true;
                    const days = Math.floor((Date.now() - c.lastContact.getTime()) / (1000 * 60 * 60 * 24));
                    return days >= 7;
                  }).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Contatos */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Contato</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Prioridade</th>
                  <th className="text-left py-3 px-4">Último Contato</th>
                  <th className="text-left py-3 px-4">Próximo Follow-up</th>
                  <th className="text-left py-3 px-4">Agendamentos</th>
                  <th className="text-left py-3 px-4">Responsável</th>
                  <th className="text-right py-3 px-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => {
                  const daysSinceLastContact = contact.lastContact ? getDaysSinceLastContact(contact.lastContact) : null;
                  const hasAppointment = hasUpcomingAppointment(contact.id);
                  const nextAppointment = getNextAppointment(contact.id);

                  return (
                    <tr key={contact.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-primary-600 font-bold text-sm">
                              {contact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{contact.name}</p>
                            <p className="text-sm text-gray-500">{contact.email}</p>
                            {contact.company && (
                              <p className="text-xs text-gray-400 flex items-center">
                                <Building className="h-3 w-3 mr-1" />
                                {contact.company}
                              </p>
                            )}
                            {contact.phone && (
                              <p className="text-xs text-gray-400 flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                {contact.phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contact.status)}`}>
                          {getStatusLabel(contact.status)}
                        </span>
                      </td>
                      
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(contact.priority)}`}>
                          {getPriorityIcon(contact.priority)} {getPriorityLabel(contact.priority)}
                        </span>
                      </td>
                      
                      <td className="py-3 px-4">
                        {contact.lastContact ? (
                          <div className="text-sm">
                            <p>{contact.lastContact.toLocaleDateString('pt-BR')}</p>
                            {daysSinceLastContact && (
                              <p className={`text-xs ${daysSinceLastContact.color}`}>
                                {daysSinceLastContact.days} dias atrás
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">Nunca</span>
                        )}
                      </td>
                      
                      <td className="py-3 px-4">
                        {contact.nextFollowUp ? (
                          <div className="text-sm">
                            <p>{contact.nextFollowUp.toLocaleDateString('pt-BR')}</p>
                            <p className="text-xs text-gray-500">
                              {Math.ceil((contact.nextFollowUp.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} dias
                            </p>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">Não agendado</span>
                        )}
                      </td>
                      
                      <td className="py-3 px-4">
                        {hasAppointment ? (
                          <div className="flex items-center text-green-600">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span className="text-sm font-medium">
                              {nextAppointment?.date.toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">Sem agendamento</span>
                        )}
                      </td>
                      
                      <td className="py-3 px-4">
                        {contact.assignedTo ? (
                          <span className="text-sm font-medium text-gray-700">
                            {contact.assignedTo}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">Não atribuído</span>
                        )}
                      </td>
                      
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setSelectedContact(contact)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              setSelectedContact(contact);
                              setShowCreateAppointment(true);
                            }}
                          >
                            <Calendar className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setSelectedContact(contact)}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setSelectedContact(contact)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteContact(contact.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredContacts.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">
                  {searchTerm || selectedStatus !== 'all' || selectedPriority !== 'all' 
                    ? 'Nenhum contato encontrado com os filtros aplicados' 
                    : 'Nenhum contato cadastrado'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal para criar contato */}
      {showCreateContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Novo Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome *
                  </label>
                  <Input
                    value={newContactData.name}
                    onChange={(e) => setNewContactData({ ...newContactData, name: e.target.value })}
                    placeholder="Nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail *
                  </label>
                  <Input
                    type="email"
                    value={newContactData.email}
                    onChange={(e) => setNewContactData({ ...newContactData, email: e.target.value })}
                    placeholder="email@exemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <Input
                    value={newContactData.phone}
                    onChange={(e) => setNewContactData({ ...newContactData, phone: e.target.value })}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Empresa
                  </label>
                  <Input
                    value={newContactData.company}
                    onChange={(e) => setNewContactData({ ...newContactData, company: e.target.value })}
                    placeholder="Nome da empresa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={newContactData.status}
                    onChange={(e) => setNewContactData({ ...newContactData, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="lead">Lead</option>
                    <option value="prospect">Prospecto</option>
                    <option value="client">Cliente</option>
                    <option value="inactive">Inativo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prioridade
                  </label>
                  <select
                    value={newContactData.priority}
                    onChange={(e) => setNewContactData({ ...newContactData, priority: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (separadas por vírgula)
                </label>
                <Input
                  value={newContactData.tags}
                  onChange={(e) => setNewContactData({ ...newContactData, tags: e.target.value })}
                  placeholder="tech, startup, interessado"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observações
                </label>
                <textarea
                  value={newContactData.notes}
                  onChange={(e) => setNewContactData({ ...newContactData, notes: e.target.value })}
                  placeholder="Observações sobre o contato"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Responsável
                </label>
                <Input
                  value={newContactData.assignedTo}
                  onChange={(e) => setNewContactData({ ...newContactData, assignedTo: e.target.value })}
                  placeholder="Nome do responsável"
                />
              </div>

              <div className="flex space-x-2 pt-4">
                <Button onClick={handleCreateContact} className="flex-1">
                  Criar Contato
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateContact(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
