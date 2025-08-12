export default function TestSimplePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'white', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ 
          color: 'black', 
          fontSize: '32px', 
          fontWeight: 'bold',
          marginBottom: '20px'
        }}>
          🧪 Teste Simples - Funcionando!
        </h1>
        
        <div style={{ 
          backgroundColor: '#f3f4f6', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h2 style={{ 
            color: '#1f2937', 
            fontSize: '24px', 
            marginBottom: '15px' 
          }}>
            ✅ Servidor Funcionando!
          </h2>
          <p style={{ 
            color: '#374151', 
            fontSize: '16px',
            lineHeight: '1.6'
          }}>
            Esta página está sendo servida corretamente pelo Next.js.
            Se você consegue ver este texto, o problema foi resolvido!
          </p>
        </div>

        <div style={{ 
          backgroundColor: '#dbeafe', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #bfdbfe'
        }}>
          <h3 style={{ 
            color: '#1e40af', 
            fontSize: '20px', 
            marginBottom: '10px' 
          }}>
            🔧 Problemas Resolvidos:
          </h3>
          <ul style={{ 
            color: '#1e40af', 
            fontSize: '16px',
            lineHeight: '1.6',
            paddingLeft: '20px',
            textAlign: 'left'
          }}>
            <li>Conflitos de versão do PostCSS</li>
            <li>Cache corrompido do Next.js</li>
            <li>Arquivos estáticos não encontrados</li>
            <li>Problemas de compilação</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <a href="/" style={{ 
            display: 'inline-block',
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '15px 30px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: 'bold',
            marginRight: '15px'
          }}>
            🏠 Dashboard
          </a>
          <a href="/color-test" style={{ 
            display: 'inline-block',
            backgroundColor: '#8b5cf6',
            color: 'white',
            padding: '15px 30px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            🎨 Teste Cores
          </a>
        </div>
      </div>
    </div>
  );
}
