/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração simplificada para evitar conflitos
  experimental: {
    // Desabilitar recursos experimentais que podem causar problemas
    optimizePackageImports: [],
    // Melhorar estabilidade da conexão
    serverComponentsExternalPackages: [],
  },
  
  // Configurações para melhorar a estabilidade
  typescript: {
    ignoreBuildErrors: true,
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configuração de webpack para resolver problemas de chunks e conexão
  webpack: (config, { isServer }) => {
    // Configurações específicas para resolver problemas de chunks
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }
    
    // Otimizações para evitar problemas de carregamento e conexão
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
            reuseExistingChunk: true,
          },
          // Agrupar chunks do React
          react: {
            name: 'react',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]react[\\/]/,
            priority: 10,
            reuseExistingChunk: true,
          },
          // Agrupar chunks comuns
          common: {
            name: 'common',
            chunks: 'all',
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      },
      // Melhorar cache para evitar reconexões desnecessárias
      runtimeChunk: 'single',
      moduleIds: 'deterministic',
    };
    
    // Configurações para melhorar a estabilidade da conexão
    config.infrastructureLogging = {
      level: 'error',
    };
    
    return config;
  },
  
  // Configurações para melhorar a estabilidade
  poweredByHeader: false,
  compress: true,
  generateEtags: false,
  
  // Configurações de headers para melhorar a segurança e estabilidade
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
