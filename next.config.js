/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração simplificada para evitar conflitos
  experimental: {
    // Desabilitar recursos experimentais que podem causar problemas
    optimizePackageImports: [], // Deve ser um array vazio, não false
  },
  // Configuração de webpack para resolver problemas de chunks
  webpack: (config, { isServer }) => {
    // Configurações específicas para resolver problemas de chunks
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Otimizações para evitar problemas de carregamento
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Agrupar chunks do Next.js
          next: {
            name: 'next',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]next[\\/]/,
            priority: 20,
          },
          // Agrupar chunks do React
          react: {
            name: 'react',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]react[\\/]/,
            priority: 10,
          },
        },
      },
    };
    
    return config;
  },
};

module.exports = nextConfig;
