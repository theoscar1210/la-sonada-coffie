import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/ui/CartDrawer';
import './globals.css';

const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://lasonada.co';

const OG_IMAGE =
  'https://res.cloudinary.com/dsbzuhyfu/image/upload/c_fill,w_1200,h_630/v1772031891/SaveClip.App_554401032_17947154325044463_9108692877301623870_n_fmee9x.jpg';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'LA SOÑADA COFFIE — Café de Especialidad del Líbano, Tolima',
    template: '%s | LA SOÑADA COFFIE',
  },
  description:
    'Café de especialidad del Líbano, Tolima. Granos de origen único, tostión artesanal y entregas directas a tu puerta. Descubre el café colombiano que sueñas.',
  keywords: [
    'café de especialidad Colombia',
    'café Líbano Tolima',
    'café premium colombiano',
    'café de origen único',
    'tostión artesanal',
    'La Soñada Coffie',
    'café fermentación anaeróbica',
    'comprar café especial Colombia',
  ],
  authors: [{ name: 'LA SOÑADA COFFIE', url: SITE_URL }],
  creator: 'LA SOÑADA COFFIE',
  publisher: 'LA SOÑADA COFFIE',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'LA SOÑADA COFFIE',
    url: SITE_URL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'LA SOÑADA COFFIE — Café de especialidad del Líbano, Tolima' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@lasonadacoffie',
    images: [OG_IMAGE],
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LA SOÑADA COFFIE',
  url: SITE_URL,
  logo: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031839/SaveClip.App_623951363_18011151110666596_752443976468967087_n_jikvhr.jpg',
  description: 'Café de especialidad del Líbano, Tolima, Colombia. Tostión artesanal y origen trazable.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Líbano',
    addressRegion: 'Tolima',
    addressCountry: 'CO',
  },
  contactPoint: { '@type': 'ContactPoint', email: 'hola@lasonada.co', contactType: 'customer service' },
  sameAs: ['https://www.instagram.com/lasonadacoffie', 'https://www.facebook.com/lasonadacoffie'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        <CartDrawer />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#3d1f11',
              color: '#fdf5e4',
              borderRadius: '12px',
              fontFamily: 'Inter, sans-serif',
            },
          }}
        />
      </body>
    </html>
  );
}
