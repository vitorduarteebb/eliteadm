export default function TestColorsPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-black">Teste de Cores - Texto Preto</h1>
        
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cores de Texto Testadas:</h2>
          <ul className="space-y-2 text-gray-800">
            <li className="text-black">• Texto preto (text-black)</li>
            <li className="text-gray-900">• Texto cinza escuro (text-gray-900)</li>
            <li className="text-gray-800">• Texto cinza médio (text-gray-800)</li>
            <li className="text-gray-700">• Texto cinza (text-gray-700)</li>
            <li className="text-gray-600">• Texto cinza claro (text-gray-600)</li>
            <li className="text-blue-600">• Texto azul (text-blue-600)</li>
            <li className="text-green-600">• Texto verde (text-green-600)</li>
            <li className="text-red-600">• Texto vermelho (text-red-600)</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-xl font-medium text-blue-900 mb-3">Fundo Azul Claro:</h3>
          <p className="text-blue-800">Este texto deve ser visível em fundo azul claro.</p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-xl font-medium text-green-900 mb-3">Fundo Verde Claro:</h3>
          <p className="text-green-800">Este texto deve ser visível em fundo verde claro.</p>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <h3 className="text-xl font-medium text-purple-900 mb-3">Fundo Roxo Claro:</h3>
          <p className="text-purple-800">Este texto deve ser visível em fundo roxo claro.</p>
        </div>

        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
          <h3 className="text-xl font-medium text-orange-900 mb-3">Fundo Laranja Claro:</h3>
          <p className="text-orange-800">Este texto deve ser visível em fundo laranja claro.</p>
        </div>

        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <h3 className="text-xl font-medium text-red-900 mb-3">Fundo Vermelho Claro:</h3>
          <p className="text-red-800">Este texto deve ser visível em fundo vermelho claro.</p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h3 className="text-xl font-medium text-yellow-900 mb-3">Fundo Amarelo Claro:</h3>
          <p className="text-yellow-800">Este texto deve ser visível em fundo amarelo claro.</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-medium text-gray-900 mb-3">Fundo Cinza Claro:</h3>
          <p className="text-gray-800">Este texto deve ser visível em fundo cinza claro.</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-300">
          <h3 className="text-xl font-medium text-gray-900 mb-3">Fundo Branco:</h3>
          <p className="text-gray-800">Este texto deve ser visível em fundo branco.</p>
        </div>

        <div className="text-center mt-8">
          <a 
            href="/" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Voltar ao Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
