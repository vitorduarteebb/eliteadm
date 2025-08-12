// Script para gerar ícones PWA
// Execute com: node scripts/generate-icons.js

const fs = require('fs');
const path = require('path');

// SVG base para o ícone do Portal Auto
const iconSVG = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="512" height="512" rx="64" fill="url(#grad1)"/>
  
  <!-- Main Icon - Car/Auto Symbol -->
  <g transform="translate(128, 160)">
    <!-- Car Body -->
    <rect x="0" y="80" width="256" height="80" rx="40" fill="white" opacity="0.9"/>
    <rect x="32" y="40" width="192" height="80" rx="20" fill="white"/>
    
    <!-- Windows -->
    <rect x="48" y="56" width="64" height="32" rx="8" fill="#3b82f6"/>
    <rect x="144" y="56" width="64" height="32" rx="8" fill="#3b82f6"/>
    
    <!-- Wheels -->
    <circle cx="64" cy="160" r="24" fill="white"/>
    <circle cx="64" cy="160" r="16" fill="#1e40af"/>
    <circle cx="192" cy="160" r="24" fill="white"/>
    <circle cx="192" cy="160" r="16" fill="#1e40af"/>
    
    <!-- Headlights -->
    <circle cx="8" cy="100" r="8" fill="#fbbf24"/>
    <circle cx="248" cy="100" r="8" fill="#fbbf24"/>
  </g>
  
  <!-- AI Symbol -->
  <g transform="translate(320, 320)">
    <circle cx="48" cy="48" r="32" fill="white" opacity="0.9"/>
    <circle cx="48" cy="48" r="24" fill="#10b981"/>
    <!-- Brain/AI Pattern -->
    <path d="M32 48 Q48 32 64 48 Q48 64 32 48" fill="white" opacity="0.8"/>
    <circle cx="48" cy="48" r="4" fill="white"/>
  </g>
</svg>
`;

// Tamanhos necessários para PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Criar diretório public se não existir
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

console.log('Gerando ícones PWA...');

// Para este exemplo, vamos criar arquivos SVG simples
// Em produção, você usaria uma biblioteca como sharp ou canvas para gerar PNGs reais
sizes.forEach(size => {
  const scaledSVG = iconSVG.replace('width="512" height="512"', `width="${size}" height="${size}"`);
  
  // Para demonstração, criamos SVGs. Em produção, converta para PNG
  const filename = `icon-${size}x${size}.svg`;
  const filepath = path.join(publicDir, filename);
  
  fs.writeFileSync(filepath, scaledSVG);
  console.log(`✓ Criado: ${filename}`);
});

// Criar um arquivo PNG simples usando dados base64 (ícone básico)
const simplePNG = Buffer.from(
  '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',
  'base64'
);

// Criar alguns ícones PNG para os tamanhos mais importantes
[192, 512].forEach(size => {
  const filename = `icon-${size}x${size}.png`;
  const filepath = path.join(publicDir, filename);
  fs.writeFileSync(filepath, simplePNG);
  console.log(`✓ Criado: ${filename} (PNG básico)`);
});

console.log('\nÍcones PWA gerados com sucesso!');
console.log('Nota: Para produção, use uma ferramenta adequada para gerar PNGs de alta qualidade.');
