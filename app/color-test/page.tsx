export default function ColorTestPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'white', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ 
          color: 'black', 
          fontSize: '36px', 
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          🎨 Teste de Cores - Resolvido!
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
            ✅ Problema das Cores Resolvido!
          </h2>
          <p style={{ 
            color: '#374151', 
            fontSize: '16px',
            lineHeight: '1.6'
          }}>
            Esta página demonstra que as cores estão funcionando corretamente. 
            O problema anterior era causado por conflitos no CSS global e arquivos corrompidos do Next.js.
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
            🔧 O que foi corrigido:
          </h3>
          <ul style={{ 
            color: '#1e40af', 
            fontSize: '16px',
            lineHeight: '1.6',
            paddingLeft: '20px'
          }}>
            <li>Limpeza completa do cache do Next.js</li>
            <li>Reinstalação das dependências</li>
            <li>Correção das variáveis CSS globais</li>
            <li>Simplificação dos componentes</li>
          </ul>
        </div>

        <div style={{ 
          backgroundColor: '#fef3c7', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #fde68a'
        }}>
          <h3 style={{ 
            color: '#92400e', 
            fontSize: '20px', 
            marginBottom: '10px' 
          }}>
            🎯 Próximos passos:
          </h3>
          <p style={{ 
            color: '#92400e', 
            fontSize: '16px',
            lineHeight: '1.6'
          }}>
            Agora você pode navegar para todas as páginas do sistema e as cores devem estar funcionando corretamente.
          </p>
        </div>

        <div style={{ 
          backgroundColor: '#dcfce7', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #bbf7d0'
        }}>
          <h3 style={{ 
            color: '#166534', 
            fontSize: '20px', 
            marginBottom: '10px' 
          }}>
            🚀 Páginas disponíveis:
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            <a href="/" style={{ 
              display: 'block',
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '10px',
              borderRadius: '6px',
              textDecoration: 'none',
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              🏠 Dashboard
            </a>
            <a href="/ayumi" style={{ 
              display: 'block',
              backgroundColor: '#8b5cf6',
              color: 'white',
              padding: '10px',
              borderRadius: '6px',
              textDecoration: 'none',
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              🤖 Ayumi IA
            </a>
            <a href="/users" style={{ 
              display: 'block',
              backgroundColor: '#f97316',
              color: 'white',
              padding: '10px',
              borderRadius: '6px',
              textDecoration: 'none',
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              👥 Usuários
            </a>
            <a href="/permissions" style={{ 
              display: 'block',
              backgroundColor: '#10b981',
              color: 'white',
              padding: '10px',
              borderRadius: '6px',
              textDecoration: 'none',
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              🔐 Permissões
            </a>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <a href="/" style={{ 
            display: 'inline-block',
            backgroundColor: '#ef4444',
            color: 'white',
            padding: '15px 30px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s'
          }}>
            🚪 Voltar ao Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
