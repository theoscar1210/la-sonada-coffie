/**
 * Listado de artículos del blog (desde Sanity)
 * URL: /blog
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artículos sobre café de especialidad, orígenes, técnicas de preparación y cultura cafetera.',
};

// En producción, estos datos vendrían de Sanity CMS
const mockPosts = [
  {
    slug: 'guia-fermentacion-anaerobica',
    title: 'Guía completa de fermentación anaeróbica en café',
    excerpt: 'La fermentación anaeróbica ha revolucionado el mundo del café de especialidad. Descubre qué es, cómo se realiza y por qué produce sabores tan extraordinarios.',
    coverImage: '/images/blog/anaerobico.jpg',
    author: 'Equipo La Soñada',
    publishedAt: '2024-01-20',
    category: 'Proceso',
  },
  {
    slug: 'huila-colombia-cafe-origen',
    title: 'Huila: la región cafetera más premiada de Colombia',
    excerpt: 'El departamento del Huila ha conquistado premios mundiales de café. Sus condiciones únicas de altitud, clima y suelo crean cafés extraordinarios.',
    coverImage: '/images/blog/huila.jpg',
    author: 'Laura M.',
    publishedAt: '2024-01-08',
    category: 'Origen',
  },
  {
    slug: 'brew-guide-chemex',
    title: 'Cómo preparar el café perfecto en Chemex',
    excerpt: 'El Chemex produce uno de los cafés más limpios y claros que existen. Con esta guía paso a paso conseguirás resultados de barista en casa.',
    coverImage: '/images/blog/chemex.jpg',
    author: 'Carlos R.',
    publishedAt: '2023-12-15',
    category: 'Preparación',
  },
  {
    slug: 'honey-process-explicado',
    title: 'Honey Process: el dulzor natural del café',
    excerpt: 'El proceso honey conserva parte del mucílago durante el secado, creando un perfil de sabor dulce y cremoso. Entendemos qué ocurre en cada variante.',
    coverImage: '/images/blog/honey.jpg',
    author: 'Equipo La Soñada',
    publishedAt: '2023-12-01',
    category: 'Proceso',
  },
];

export default function BlogPage() {
  const [featured, ...rest] = mockPosts;

  return (
    <div className="min-h-screen bg-coffee-50 pt-20">
      {/* Header */}
      <div className="bg-charcoal-950 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-sans uppercase tracking-widest text-coffee-500 mb-2">
            Cultura cafetera
          </p>
          <h1 className="font-serif text-5xl font-bold text-cream-100">Blog</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Featured post */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="group block mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center card overflow-hidden card-hover">
              <div className="relative aspect-[4/3] bg-coffee-100">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <span className="inline-block text-xs font-sans uppercase tracking-wider text-coffee-500 mb-3 border border-coffee-200 rounded-full px-3 py-1">
                  {featured.category}
                </span>
                <h2 className="font-serif text-3xl font-bold text-charcoal-900 mb-4 group-hover:text-coffee-700 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-coffee-600 leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-3 text-sm text-coffee-500">
                  <span>{featured.author}</span>
                  <span>·</span>
                  <span>
                    {new Date(featured.publishedAt).toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Grid de posts */}
        <div className="grid md:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group card card-hover block">
              <div className="relative aspect-[16/10] bg-coffee-100 overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="text-xs text-coffee-500 uppercase tracking-wider font-sans">
                  {post.category}
                </span>
                <h3 className="font-serif text-lg font-semibold text-charcoal-900 mt-2 mb-3 group-hover:text-coffee-700 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-coffee-600 line-clamp-3">{post.excerpt}</p>
                <div className="mt-4 pt-4 border-t border-coffee-100 flex justify-between items-center text-xs text-coffee-400">
                  <span>{post.author}</span>
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('es-CO', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
