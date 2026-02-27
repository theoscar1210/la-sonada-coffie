/**
 * Landing page — LA SOÑADA COFFIE
 * Hero + Historia de marca + Productos destacados + Proceso
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Leaf, Award } from 'lucide-react';
import { api } from '@/lib/api/client';
import { ProductCard } from '@/components/ui/ProductCard';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import type { Product } from '@/types';

export const metadata: Metadata = {
  title: 'LA SOÑADA COFFIE — Café de Especialidad del Líbano, Tolima',
  description:
    'Descubre los cafés de especialidad del Líbano, Tolima. Natural Anaeróbico, Honey Process, Washed y Blends artesanales. Tostión en pequeños lotes, entrega directa a tu puerta.',
  keywords: [
    'café especialidad Líbano Tolima',
    'café colombiano premium',
    'café natural anaeróbico',
    'honey process Colombia',
    'café de origen',
    'La Soñada Coffie',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'LA SOÑADA COFFIE — Café de Especialidad del Líbano, Tolima',
    description: 'Cafés de especialidad del Líbano, Tolima. Tostión artesanal, origen trazable, entrega directa.',
    url: '/',
    images: [{
      url: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/c_fill,w_1200,h_630/v1772031891/SaveClip.App_554401032_17947154325044463_9108692877301623870_n_fmee9x.jpg',
      width: 1200,
      height: 630,
      alt: 'LA SOÑADA COFFIE — Café de especialidad del Líbano, Tolima',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LA SOÑADA COFFIE — Café de Especialidad',
    description: 'Cafés del Líbano, Tolima. Tostión artesanal y origen trazable.',
    images: ['https://res.cloudinary.com/dsbzuhyfu/image/upload/c_fill,w_1200,h_630/v1772031891/SaveClip.App_554401032_17947154325044463_9108692877301623870_n_fmee9x.jpg'],
  },
};

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const res = await api.get<{ products: Product[]; pagination: unknown }>(
      '/products?featured=true&limit=4',
      { next: { revalidate: 3600 } },
    );
    return res.data?.products ?? [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  const stats = [
    { value: '1', label: 'Origen: Líbano, Tolima' },
    { value: '100%', label: 'Café colombiano' },
    { value: '3+', label: 'Procesos artesanales' },
    { value: '24h', label: 'Post-tostión a tu puerta' },
  ];

  const values = [
    {
      icon: Leaf,
      title: 'Sostenibilidad',
      desc: 'Trabajamos directo con fincas que practican agricultura regenerativa',
    },
    {
      icon: Star,
      title: 'Calidad Premium',
      desc: 'Solo trabajamos con cafés que superan 85 puntos en la escala Q-Grader',
    },
    {
      icon: Award,
      title: 'Trazabilidad',
      desc: 'Cada bolsa incluye información completa del lote, finca y productor',
    },
  ];

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Stats */}
      <section className="bg-coffee-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-4xl font-bold text-coffee-300">{stat.value}</p>
                <p className="text-sm text-coffee-500 mt-1 font-sans">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-24 bg-coffee-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-sans uppercase tracking-widest text-coffee-500 mb-3">
              Selección del tostador
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal-900">
              Cafés destacados
            </h2>
            <p className="mt-4 text-coffee-600 max-w-lg mx-auto leading-relaxed">
              Nuestra selección más apreciada por quienes buscan una experiencia de café memorable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/productos" className="btn-primary inline-flex items-center gap-2">
              Ver catálogo completo
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Valores / Por qué elegirnos */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-sans uppercase tracking-widest text-coffee-500 mb-3">
              Nuestra filosofía
            </p>
            <h2 className="font-serif text-4xl font-bold text-charcoal-900">
              Café con consciencia
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="text-center p-8 rounded-2xl border border-coffee-100 hover:border-coffee-300 transition-colors"
              >
                <div className="w-14 h-14 bg-coffee-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Icon className="text-coffee-600" size={28} />
                </div>
                <h3 className="font-serif text-xl font-semibold text-charcoal-900 mb-3">{title}</h3>
                <p className="text-coffee-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso preview */}
      <ProcessSection />

      {/* CTA Newsletter */}
      <section className="py-24 bg-coffee-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031841/SaveClip.App_630569795_17978709332969366_32657942601693164_n_lzes4x.jpg"
            alt=""
            fill
            className="object-cover"
            aria-hidden
          />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl font-bold text-cream-100 mb-4">
            Recibe lo mejor del café
          </h2>
          <p className="text-coffee-400 mb-8 leading-relaxed">
            Suscríbete y recibe 10% de descuento en tu primera compra, más acceso prioritario a
            nuestros lotes de temporada.
          </p>
          <form className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-5 py-3 rounded-full bg-coffee-800 text-cream-100 placeholder:text-coffee-500 border border-coffee-700 focus:outline-none focus:border-coffee-400"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Suscribirme
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
