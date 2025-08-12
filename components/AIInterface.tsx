'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { bradialService, BradialMessage } from '@/lib/services/bradialService';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Send, Bot, User, AlertTriangle, Loader2 } from 'lucide-react';

export function AIInterface() {
  const { user, checkAIUsageLimit, incrementAIUsage } = useAuth();
  const [messages, setMessages] = useState<BradialMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId] = useState(() => bradialService.generateConversationId());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const canUseAI = checkAIUsageLimit();
  const usagePercentage = user ? (user.aiUsageCount / user.aiUsageLimit) * 100 : 0;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || !canUseAI || isLoading) return;

    const userMessage: BradialMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await bradialService.sendMessage({
        message: userMessage.content,
        conversation_id: conversationId,
        temperature: 0.7,
        max_tokens: 1000,
      });

      const assistantMessage: BradialMessage = {
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      incrementAIUsage();
      
    } catch (error) {
      const errorMessage: BradialMessage = {
        role: 'assistant',
        content: `Desculpe, ocorreu um erro ao processar sua solicitação: ${
          error instanceof Error ? error.message : 'Erro desconhecido'
        }`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages([]);
  };

  return (
    <div className="space-y-6">
      {/* Usage Warning */}
      {usagePercentage > 80 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-700">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Aviso de Uso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-600">
              Você usou {user?.aiUsageCount} de {user?.aiUsageLimit} consultas mensais 
              ({usagePercentage.toFixed(1)}%). Use com moderação.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Usage Limit Exceeded */}
      {!canUseAI && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center text-red-700">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Limite Excedido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">
              Você atingiu o limite mensal de {user?.aiUsageLimit} consultas. 
              Aguarde a renovação ou entre em contato com o administrador.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Bot className="h-5 w-5 mr-2 text-primary-600" />
            IA Bradial
          </CardTitle>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {user?.aiUsageCount}/{user?.aiUsageLimit} consultas
            </span>
            {messages.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearConversation}
              >
                Limpar
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Bot className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p>Olá! Sou a IA Bradial. Como posso ajudá-lo hoje?</p>
                <p className="text-sm mt-2">
                  Digite sua pergunta ou solicitação abaixo para começar.
                </p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-3xl px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.role === 'assistant' && (
                        <Bot className="h-4 w-4 mt-1 flex-shrink-0" />
                      )}
                      {message.role === 'user' && (
                        <User className="h-4 w-4 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-3xl px-4 py-2 rounded-lg bg-gray-100">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-gray-600">IA está pensando...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                canUseAI 
                  ? "Digite sua pergunta para a IA Bradial..." 
                  : "Limite de uso atingido"
              }
              disabled={!canUseAI || isLoading}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={!input.trim() || !canUseAI || isLoading}
              className="px-3"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>

          {canUseAI && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              Pressione Enter para enviar. Seja específico para obter melhores respostas.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
