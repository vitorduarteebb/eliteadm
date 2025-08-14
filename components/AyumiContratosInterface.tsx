'use client';
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, Loader2, FileText, Search, BookOpen, MessageCircle, Zap, Scale, Shield, Download, Trash2 } from 'lucide-react';
import { useAyumiContratos } from '@/hooks/useAyumiContratos';

export function AyumiContratosInterface() {
  const {
    messages,
    isLoading,
    selectedCategory,
    showQuickQuestions,
    categories,
    processQuestion,
    setSelectedCategory,
    setShowQuickQuestions,
    clearMessages,
    exportConversation,
    config
  } = useAyumiContratos();

  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
    handleSubmit(new Event('submit') as any, question);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const handleSubmit = async (e: React.FormEvent, quickQuestion?: string) => {
    e.preventDefault();
    const questionText = quickQuestion || inputText;
    if (!questionText.trim() || isLoading) return;

    setInputText('');
    await processQuestion(questionText);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full mr-4">
            <Bot className="h-12 w-12 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{config.ai.name}</h1>
            <p className="text-xl text-gray-600">{config.ai.role}</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-center mb-3">
            <FileText className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-blue-800">Assistente de Contratos</h2>
          </div>
          <p className="text-gray-700 max-w-3xl">
            <Sparkles className="inline h-4 w-4 mr-2 text-blue-500" />
            {config.ai.expertise.join(', ')}
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Scale className="h-5 w-5 text-green-500 mr-2" />
          Filtrar por Categoria
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryFilter(category.name)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Quick Questions */}
      {showQuickQuestions && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Zap className="h-5 w-5 text-yellow-500 mr-2" />
            Perguntas Rápidas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {config.quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="p-3 text-sm bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-left"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Interface */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bot className="h-6 w-6 text-white mr-3" />
              <h2 className="text-xl font-semibold text-white">Chat com a {config.ai.name}</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-blue-200" />
                <span className="text-blue-200 text-sm">Contratos</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={exportConversation}
                  className="p-2 text-blue-200 hover:text-white transition-colors"
                  title="Exportar conversa"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  onClick={clearMessages}
                  className="p-2 text-blue-200 hover:text-white transition-colors"
                  title="Limpar conversa"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
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
                className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
                  message.isUser
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                
                {message.category && (
                  <div className="mt-2">
                    <span 
                      className="inline-block px-2 py-1 text-xs rounded-full"
                      style={{
                        backgroundColor: config.categories.colors[message.category as keyof typeof config.categories.colors] + '20',
                        color: config.categories.colors[message.category as keyof typeof config.categories.colors]
                      }}
                    >
                      {message.category}
                    </span>
                  </div>
                )}
                
                {message.confidence !== undefined && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${message.confidence * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {Math.round(message.confidence * 100)}% confiança
                      </span>
                    </div>
                  </div>
                )}
                
                {message.sources && message.sources.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-gray-300">
                    <p className="text-xs text-gray-500 mb-1">Fontes:</p>
                    <div className="flex flex-wrap gap-1">
                      {message.sources.map((source, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
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
                  <span>{config.ai.name} está analisando o contrato...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-6 border-t border-gray-200">
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Digite sua dúvida sobre contratos..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>
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
            <MessageCircle className="h-5 w-5 text-blue-500 mr-2" />
            Como Usar
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Use as perguntas rápidas para dúvidas comuns</li>
            <li>• Filtre por categoria para encontrar informações específicas</li>
            <li>• Digite sua pergunta específica sobre contratos</li>
            <li>• A {config.ai.name} analisa o contrato e responde com precisão</li>
            <li>• Todas as respostas são baseadas na documentação oficial</li>
            <li>• As fontes são sempre citadas para sua referência</li>
            <li>• Exporte ou limpe a conversa conforme necessário</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="h-5 w-5 text-green-500 mr-2" />
            Especialidades da {config.ai.name}
          </h3>
          <ul className="space-y-2 text-gray-600">
            {config.ai.expertise.map((expertise, index) => (
              <li key={index}>• {expertise}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Shield className="h-5 w-5 text-purple-500 mr-2" />
          Estatísticas da Base de Conhecimento
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category.name} className="text-center p-4 bg-gray-50 rounded-lg">
              <div 
                className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: category.color }}
              >
                {category.count}
              </div>
              <h4 className="font-medium text-gray-900">{category.name}</h4>
              <p className="text-sm text-gray-600">{category.count} respostas</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
