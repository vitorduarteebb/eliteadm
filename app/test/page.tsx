export default function TestPage() {
  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          ✅ Página de Teste Funcionando!
        </h1>
        <p className="text-lg text-blue-800">
          Se você está vendo esta página, o Next.js está funcionando corretamente.
        </p>
        <a 
          href="/" 
          className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Voltar ao Início
        </a>
      </div>
    </div>
  );
}
