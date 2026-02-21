/**
 * Artículo individual del blog (contenido de Sanity)
 * URL: /blog/[slug]
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: { slug: string };
}

// En producción se consultaría Sanity con el SDK
const mockPosts: Record<string, {
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  category: string;
  body: string[];
}> = {
  'guia-fermentacion-anaerobica': {
    title: 'Guía completa de fermentación anaeróbica en café',
    excerpt: 'La fermentación anaeróbica ha revolucionado el mundo del café de especialidad.',
    coverImage: '/images/blog/anaerobico.jpg',
    author: 'Equipo La Soñada',
    publishedAt: '2024-01-20',
    category: 'Proceso',
    body: [
      'La fermentación anaeróbica es uno de los procesos más emocionantes que ha llegado al mundo del café de especialidad en la última década. Mientras que los métodos tradicionales —lavado y natural— han dominado la industria durante siglos, la fermentación controlada en ambientes sin oxígeno abre un universo completamente nuevo de sabores y aromas.',
      '¿Qué significa "anaeróbico"? La palabra viene del griego: "an" (sin) + "aero" (aire). En un entorno anaeróbico, las levaduras y bacterias trabajan en ausencia de oxígeno, produciendo diferentes subproductos de fermentación que se impregnan en el grano.',
      'El proceso comienza después de despulpar los granos. En lugar de lavarlos o secarlos directamente, los caficultores los colocan en tanques herméticamente sellados. La fermentación puede durar entre 24 y 144 horas, dependiendo del perfil buscado. Durante este tiempo, la temperatura, el pH y la presión de CO₂ se monitorean constantemente.',
      'El resultado es un café con notas de sabor inusuales: frutas tropicales, vino tinto, chocolate, especias exóticas. Estos sabores pueden ser divisivos —algunos los aman, otros los encuentran demasiado procesados— pero no hay duda de que son memorables.',
      'En LA SOÑADA, seleccionamos cuidadosamente nuestros lotes de fermentación anaeróbica, asegurándonos de que el proceso complemente las características naturales del grano en lugar de enmascararlas.',
    ],
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = mockPosts[params.slug];
  if (!post) return { title: 'Artículo no encontrado' };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = mockPosts[params.slug];
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero imagen */}
      <div className="relative h-[50vh] bg-charcoal-950">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <span className="inline-block text-xs font-sans uppercase tracking-wider text-coffee-300 border border-coffee-600 rounded-full px-3 py-1 mb-4">
              {post.category}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-cream-100 leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-coffee-500 mb-10 pb-10 border-b border-coffee-100">
          <span>{post.author}</span>
          <span>·</span>
          <time>
            {new Date(post.publishedAt).toLocaleDateString('es-CO', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>

        {/* Cuerpo del artículo */}
        <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-charcoal-900 prose-p:text-coffee-700 prose-p:leading-relaxed">
          {post.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Volver */}
        <div className="mt-16 pt-8 border-t border-coffee-100">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-coffee-600 hover:text-coffee-800 transition-colors font-sans"
          >
            <ArrowLeft size={18} />
            Volver al blog
          </Link>
        </div>
      </div>
    </div>
  );
}
