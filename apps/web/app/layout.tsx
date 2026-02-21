import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/ui/CartDrawer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'LA SOÑADA COFFIE — Café de Especialidad Premium',
    template: '%s | LA SOÑADA COFFIE',
  },
  description:
    'Café de especialidad seleccionado con amor. Granos de origen único, tostión artesanal y entregas directas a tu puerta.',
  keywords: ['café de especialidad', 'café premium', 'café de origen', 'tostado artesanal'],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'LA SOÑADA COFFIE',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
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
