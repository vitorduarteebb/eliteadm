export default function SimpleTestPage() {
  return (
    <div style={{ padding: '20px', backgroundColor: 'white' }}>
      <h1 style={{ color: 'black', fontSize: '32px', fontWeight: 'bold' }}>
        Teste Simples - Estilos Inline
      </h1>
      
      <p style={{ color: 'red', fontSize: '18px' }}>
        Este texto deve ser vermelho usando estilos inline.
      </p>
      
      <p style={{ color: 'blue', fontSize: '18px' }}>
        Este texto deve ser azul usando estilos inline.
      </p>
      
      <p style={{ color: 'green', fontSize: '18px' }}>
        Este texto deve ser verde usando estilos inline.
      </p>
      
      <div style={{ backgroundColor: 'lightgray', padding: '20px', margin: '20px 0' }}>
        <h2 style={{ color: 'darkblue', fontSize: '24px' }}>
          Fundo Cinza Claro
        </h2>
        <p style={{ color: 'darkgreen' }}>
          Este texto deve ser visível em fundo cinza claro.
        </p>
      </div>
      
      <a href="/" style={{ 
        display: 'inline-block', 
        backgroundColor: 'blue', 
        color: 'white', 
        padding: '10px 20px', 
        textDecoration: 'none',
        borderRadius: '5px'
      }}>
        Voltar ao Dashboard
      </a>
    </div>
  );
}
