'use client';
import { useState, useRef } from 'react';
import { Send, Bot, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function AyumiInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou a Ayumi, sua parceira de sucesso no Grupo Onishi! 🤝\n\nEstou aqui para ajudá-lo a dominar o universo da habilitação, legislação de trânsito, técnicas de vendas e atendimento ao cliente.\n\nComo posso impulsionar seu desenvolvimento hoje?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Chamar a API interna da Ayumi
      const response = await fetch('/api/ayumi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.text
        })
      });

      if (response.ok) {
        const data = await response.json();
        const ayumiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, ayumiResponse]);
      } else {
        throw new Error('Erro na API');
      }
    } catch (error) {
      console.error('Erro ao processar pergunta:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Desculpe, ocorreu um erro ao processar sua pergunta. Tente novamente em alguns instantes.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Bot className="h-12 w-12 text-blue-600 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ayumi</h1>
            <p className="text-lg text-gray-600">Sua Parceira de Sucesso no Grupo Onishi</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
          <p className="text-gray-700">
            <Sparkles className="inline h-4 w-4 mr-2 text-blue-500" />
            Especialista em legislação de trânsito, processos do Detran SP, CTB, Contran, 
            protocolos internos, técnicas de vendas e atendimento ao cliente.
          </p>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <div className="flex items-center">
            <Bot className="h-6 w-6 text-white mr-3" />
            <h2 className="text-xl font-semibold text-white">Chat com a Ayumi</h2>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  message.isUser
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                <div className={`text-xs mt-2 ${
                  message.isUser ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg rounded-bl-none">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                  <span>Ayumi está processando sua pergunta...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-6 border-t border-gray-200">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite sua pergunta para a Ayumi..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              <Send className="h-4 w-4 mr-2" />
              Enviar
            </button>
          </div>
        </form>
      </div>

      {/* Informações Adicionais */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
            Como Usar
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Digite sua pergunta no chat acima</li>
            <li>• Clique em "Enviar" para receber a resposta</li>
            <li>• A Ayumi processa sua pergunta internamente</li>
            <li>• Todas as respostas são baseadas na documentação oficial</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Bot className="h-5 w-5 text-green-500 mr-2" />
            Especialidades da Ayumi
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Processos de habilitação e CNH</li>
            <li>• Legislação de trânsito (CTB, CONTRAN)</li>
            <li>• Protocolos internos do Grupo Onishi</li>
            <li>• Técnicas de vendas e atendimento</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
