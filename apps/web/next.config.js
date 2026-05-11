/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Next.js requiere unsafe-inline para scripts internos (hydration)
      // Para eliminar unsafe-inline se necesita nonces — mejora futura
      "script-src 'self' 'unsafe-inline' https://js.stripe.com",
      // Stripe Elements y 3D Secure se cargan en iframes de Stripe
      "frame-src https://js.stripe.com https://hooks.stripe.com",
      // Imágenes propias + Cloudinary + data URIs (placeholders)
      "img-src 'self' data: blob: https://res.cloudinary.com https://cdn.sanity.io",
      // Llamadas al API propio + Stripe API
      `connect-src 'self' ${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'} https://api.stripe.com`,
      // Tailwind usa estilos inline; Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      // Sin iframes de terceros salvo Stripe
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
  {
    key: 'Strict-Transport-Security',
    // Solo en prod — en dev rompería localhost con HTTP
    value: isProd ? 'max-age=63072000; includeSubDomains; preload' : '',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(self)',
  },
].filter((h) => h.value !== ''); // eliminar HSTS vacío en dev

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
