'use client';

import { useState, useEffect } from 'react';
import { 
  Clock, 
  Users, 
  Shield, 
  Settings, 
  BarChart3, 
  Save, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  Smartphone,
  MessageSquare,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AyumiRules, defaultAyumiRules } from '@/lib/ayumiRules';

export function AyumiRulesManagement() {
  const [rules, setRules] = useState<AyumiRules>(defaultAyumiRules);
  const [isEditing, setIsEditing] = useState(false);
  const [savedRules, setSavedRules] = useState<AyumiRules>(defaultAyumiRules);
  const [showSuccess, setShowSuccess] = useState(false);

  // Carregar regras do localStorage
  useEffect(() => {
    const savedRules = localStorage.getItem('ayumi_rules');
    if (savedRules) {
      try {
        const parsedRules = JSON.parse(savedRules);
        setRules(parsedRules);
        setSavedRules(parsedRules);
      } catch (error) {
        console.error('Erro ao carregar regras:', error);
      }
    }
  }, []);

  // Salvar regras no localStorage
  const saveRules = () => {
    localStorage.setItem('ayumi_rules', JSON.stringify(rules));
    setSavedRules(rules);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Resetar para padrão
  const resetToDefault = () => {
    setRules(defaultAyumiRules);
    setIsEditing(true);
  };

  // Verificar se há mudanças
  const hasChanges = JSON.stringify(rules) !== JSON.stringify(savedRules);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Controle da Ayumi</h2>
          <p className="text-gray-600">Gerencie as regras e limites da IA Ayumi</p>
        </div>
        <div className="flex space-x-3">
          {isEditing && (
            <>
              <Button
                onClick={() => setRules(savedRules)}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                Cancelar
              </Button>
              <Button
                onClick={saveRules}
                disabled={!hasChanges}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4" />
                Salvar
              </Button>
            </>
          )}
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2"
            >
              <Settings className="h-4 w-4" />
              Editar Regras
            </Button>
          )}
        </div>
      </div>

      {/* Mensagem de Sucesso */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="text-green-800">Regras salvas com sucesso!</span>
        </div>
      )}

      {/* Seções das Regras */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Horários de Funcionamento */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold">⏰ Horários de Funcionamento</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="workingHoursEnabled"
                checked={rules.workingHours.enabled}
                onChange={(e) => setRules(prev => ({
                  ...prev,
                  workingHours: { ...prev.workingHours, enabled: e.target.checked }
                }))}
                disabled={!isEditing}
                className="rounded"
              />
              <label htmlFor="workingHoursEnabled" className="text-sm font-medium">
                Ativar controle de horário
              </label>
            </div>

            {rules.workingHours.enabled && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Horário de Início
                    </label>
                    <input
                      type="time"
                      value={rules.workingHours.startTime}
                      onChange={(e) => setRules(prev => ({
                        ...prev,
                        workingHours: { ...prev.workingHours, startTime: e.target.value }
                      }))}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Horário de Fim
                    </label>
                    <input
                      type="time"
                      value={rules.workingHours.endTime}
                      onChange={(e) => setRules(prev => ({
                        ...prev,
                        workingHours: { ...prev.workingHours, endTime: e.target.value }
                      }))}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="allowWeekends"
                    checked={rules.workingHours.allowWeekends}
                    onChange={(e) => setRules(prev => ({
                      ...prev,
                      workingHours: { ...prev.workingHours, allowWeekends: e.target.checked }
                    }))}
                    disabled={!isEditing}
                    className="rounded"
                  />
                  <label htmlFor="allowWeekends" className="text-sm font-medium">
                    Permitir fins de semana
                  </label>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Limites de Uso */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold">📊 Limites de Uso</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Máximo de respostas por usuário/dia
              </label>
              <input
                type="number"
                value={rules.usageLimits.maxResponsesPerUser}
                onChange={(e) => setRules(prev => ({
                  ...prev,
                  usageLimits: { ...prev.usageLimits, maxResponsesPerUser: parseInt(e.target.value) }
                }))}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                min="1"
                max="1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Máximo de dispositivos por usuário
              </label>
              <input
                type="number"
                value={rules.usageLimits.maxDevicesPerUser}
                onChange={(e) => setRules(prev => ({
                  ...prev,
                  usageLimits: { ...prev.usageLimits, maxDevicesPerUser: parseInt(e.target.value) }
                }))}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                min="1"
                max="10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Máximo de usuários simultâneos
              </label>
              <input
                type="number"
                value={rules.usageLimits.maxConcurrentUsers}
                onChange={(e) => setRules(prev => ({
                  ...prev,
                  usageLimits: { ...prev.usageLimits, maxConcurrentUsers: parseInt(e.target.value) }
                }))}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                min="1"
                max="1000"
              />
            </div>
          </div>
        </div>

        {/* Controle de Acesso */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="h-5 w-5 text-red-600" />
            <h3 className="text-lg font-semibold">🔒 Controle de Acesso</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="maintenanceMode"
                checked={rules.accessControl.maintenanceMode}
                onChange={(e) => setRules(prev => ({
                  ...prev,
                  accessControl: { ...prev.accessControl, maintenanceMode: e.target.checked }
                }))}
                disabled={!isEditing}
                className="rounded"
              />
              <label htmlFor="maintenanceMode" className="text-sm font-medium">
                Modo manutenção
              </label>
            </div>

            {rules.accessControl.maintenanceMode && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem de manutenção
                </label>
                <textarea
                  value={rules.accessControl.maintenanceMessage}
                  onChange={(e) => setRules(prev => ({
                    ...prev,
                    accessControl: { ...prev.accessControl, maintenanceMessage: e.target.value }
                  }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder="Digite a mensagem que será exibida durante a manutenção..."
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usuários bloqueados (IDs separados por vírgula)
              </label>
              <input
                type="text"
                value={rules.accessControl.blockedUsers.join(', ')}
                onChange={(e) => setRules(prev => ({
                  ...prev,
                  accessControl: { 
                    ...prev.accessControl, 
                    blockedUsers: e.target.value.split(',').map(id => id.trim()).filter(id => id)
                  }
                }))}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="1, 2, 3"
              />
            </div>
          </div>
        </div>

        {/* Configurações da IA */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold">🤖 Configurações da IA</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Máximo de tokens por resposta
              </label>
              <input
                type="number"
                value={rules.aiSettings.maxTokensPerResponse}
                onChange={(e) => setRules(prev => ({
                  ...prev,
                  aiSettings: { ...prev.aiSettings, maxTokensPerResponse: parseInt(e.target.value) }
                }))}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                min="100"
                max="2000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Temperatura (0.0 - 1.0)
              </label>
              <input
                type="number"
                value={rules.aiSettings.temperature}
                onChange={(e) => setRules(prev => ({
                  ...prev,
                  aiSettings: { ...prev.aiSettings, temperature: parseFloat(e.target.value) }
                }))}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                min="0"
                max="1"
                step="0.1"
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="fallbackEnabled"
                checked={rules.aiSettings.fallbackEnabled}
                onChange={(e) => setRules(prev => ({
                  ...prev,
                  aiSettings: { ...prev.aiSettings, fallbackEnabled: e.target.checked }
                }))}
                disabled={!isEditing}
                className="rounded"
              />
              <label htmlFor="fallbackEnabled" className="text-sm font-medium">
                Ativar respostas de fallback
              </label>
            </div>
          </div>
        </div>

        {/* Monitoramento */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="h-5 w-5 text-orange-600" />
            <h3 className="text-lg font-semibold">📈 Monitoramento</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="trackUsage"
                checked={rules.monitoring.trackUsage}
                onChange={(e) => setRules(prev => ({
                  ...prev,
                  monitoring: { ...prev.monitoring, trackUsage: e.target.checked }
                }))}
                disabled={!isEditing}
                className="rounded"
              />
              <label htmlFor="trackUsage" className="text-sm font-medium">
                Rastrear uso dos usuários
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="logAllRequests"
                checked={rules.monitoring.logAllRequests}
                onChange={(e) => setRules(prev => ({
                  ...prev,
                  monitoring: { ...prev.monitoring, logAllRequests: e.target.checked }
                }))}
                disabled={!isEditing}
                className="rounded"
              />
              <label htmlFor="logAllRequests" className="text-sm font-medium">
                Registrar todas as requisições
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="alertOnLimit"
                checked={rules.monitoring.alertOnLimit}
                onChange={(e) => setRules(prev => ({
                  ...prev,
                  monitoring: { ...prev.monitoring, alertOnLimit: e.target.checked }
                }))}
                disabled={!isEditing}
                className="rounded"
              />
              <label htmlFor="alertOnLimit" className="text-sm font-medium">
                Alertar quando atingir limites
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <Button
          onClick={resetToDefault}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <RefreshCw className="h-4 w-4" />
          Restaurar Padrões
        </Button>

        <div className="text-sm text-gray-600">
          {hasChanges && isEditing && (
            <span className="flex items-center space-x-2 text-orange-600">
              <AlertTriangle className="h-4 w-4" />
              <span>Há mudanças não salvas</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
