/**
 * Artículo individual del blog
 * URL: /blog/[slug]
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://lasonada.co';

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
    coverImage: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031883/SaveClip.App_528667901_17941794480044463_7749262412641503883_n_uwpplo.jpg',
    author: 'Equipo La Soñada',
    publishedAt: '2024-01-20',
    category: 'Proceso',
    body: [
      'La fermentación anaeróbica es uno de los procesos más emocionantes que ha llegado al mundo del café de especialidad en la última década. Mientras que los métodos tradicionales —lavado y natural— han dominado la industria durante siglos, la fermentación controlada en ambientes sin oxígeno abre un universo completamente nuevo de sabores y aromas.',
      '¿Qué significa "anaeróbico"? La palabra viene del griego: "an" (sin) + "aero" (aire). En un entorno anaeróbico, las levaduras y bacterias trabajan en ausencia de oxígeno, produciendo diferentes subproductos de fermentación que se impregnan en el grano.',
      'El proceso comienza después de despulpar los granos. En lugar de lavarlos o secarlos directamente, los caficultores los colocan en tanques herméticamente sellados. La fermentación puede durar entre 24 y 144 horas, dependiendo del perfil buscado. Durante este tiempo, la temperatura, el pH y la presión de CO₂ se monitorean constantemente.',
      'El resultado es un café con notas de sabor inusuales: frutas tropicales, vino tinto, chocolate, especias exóticas. Estos sabores pueden ser divisivos —algunos los aman, otros los encuentran demasiado procesados— pero no hay duda de que son memorables.',
      'En LA SOÑADA, seleccionamos cuidadosamente nuestros lotes de fermentación anaeróbica del Líbano, Tolima, asegurándonos de que el proceso complemente las características naturales del grano en lugar de enmascararlas.',
    ],
  },
  'libano-tolima-tierra-de-cafe': {
    title: 'Líbano, Tolima: la tierra que sueña con el café',
    excerpt: 'En las montañas de la cordillera Central, el Líbano guarda uno de los secretos mejor guardados del café colombiano.',
    coverImage: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031891/SaveClip.App_554401032_17947154325044463_9108692877301623870_n_fmee9x.jpg',
    author: 'Equipo La Soñada',
    publishedAt: '2024-02-10',
    category: 'Origen',
    body: [
      'El Líbano, Tolima, es uno de los municipios cafeteros más antiguos de Colombia. Ubicado en la cordillera Central, entre 1.500 y 2.200 metros sobre el nivel del mar, reúne las condiciones ideales para producir café de especialidad: temperaturas frescas, lluvias bien distribuidas y suelos volcánicos ricos en minerales.',
      'A diferencia de otras regiones cafeteras que ganaron fama internacional más rápidamente —Huila, Nariño, Cauca—, el Líbano ha cultivado su café con discreción durante décadas. Sus caficultores, muchos de ellos herederos de generaciones de tradición, han perfeccionado el arte del cultivo sin grandes alardes.',
      'La altitud del Líbano hace que el café madure lento. Este proceso extendido permite que el grano acumule más azúcares, desarrolle mayor complejidad aromática y exprese con claridad el terroir de la región. El resultado son cafés con perfil de taza excepcional: notas cítricas, florales y dulces, con una acidez brillante y limpia.',
      'En LA SOÑADA COFFIE, elegimos el Líbano no por conveniencia sino por convicción. Es nuestra tierra, conocemos sus caminos, sus fincas y sus caficultores por nombre. Eso nos permite garantizar la trazabilidad que un café de especialidad merece.',
    ],
  },
  'fermentacion-anaerobica-libano': {
    title: 'Fermentación anaeróbica: el proceso que nos soñamos',
    excerpt: '72 horas en tanques sellados a 2.000 msnm. Así nace nuestro Natural Anaeróbico del Líbano.',
    coverImage: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031883/SaveClip.App_528667901_17941794480044463_7749262412641503883_n_uwpplo.jpg',
    author: 'Equipo La Soñada',
    publishedAt: '2024-02-20',
    category: 'Proceso',
    body: [
      'Cuando decidimos trabajar con fermentación anaeróbica en el Líbano, muchos nos preguntaron si tenía sentido hacerlo a 2.000 metros de altitud. La respuesta, después de más de un año de experimentación, es un rotundo sí.',
      'La altitud del Líbano actúa como regulador natural de temperatura durante la fermentación. A diferencia de zonas más cálidas donde el proceso puede descontrolarse rápidamente, en nuestras fincas podemos mantener fermentaciones largas —hasta 72 horas— con mayor precisión y resultados más consistentes.',
      'El proceso empieza con la selección cuidadosa de cerezas de café maduras. Solo las más uniformes entran a los tanques. Una vez sellados, la levadura natural presente en la piel de la cereza comienza a trabajar en ausencia de oxígeno, produciendo alcoholes y ésteres que se impregnan en el grano.',
      'El resultado es un café con notas de fruta tropical, jazmín y una dulzura que recuerda al vino tinto. Es el café que nos soñamos cuando fundamos LA SOÑADA: audaz, trazable, inconfundiblemente del Líbano.',
    ],
  },
  'honey-process-libano': {
    title: 'Honey Process: el equilibrio perfecto del Líbano',
    excerpt: 'Ni lavado ni natural: el proceso honey es el punto de equilibrio donde el café del Líbano brilla con luz propia.',
    coverImage: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031888/SaveClip.App_529477147_17941794516044463_6672011794010563298_n_hthrjs.jpg',
    author: 'Equipo La Soñada',
    publishedAt: '2024-03-05',
    category: 'Proceso',
    body: [
      'El proceso honey toma su nombre del aspecto que adquieren los granos durante el secado: cubiertos por la miel natural de la cereza, brillan como ámbar bajo el sol. Y su perfil de sabor es igual de especial: la dulzura del natural con la limpieza del lavado.',
      'En el Líbano, el proceso honey funciona especialmente bien por la baja humedad relativa durante la temporada de cosecha. Esta condición permite un secado lento y controlado que preserva los azúcares de la pulpa y los transfiere gradualmente al grano.',
      'Nuestro Honey Process del Líbano se seca entre 18 y 25 días en camas elevadas, revuelto varias veces al día para garantizar uniformidad. El resultado es un café de cuerpo sedoso, dulzor de panela y una acidez suave que lo hace perfecto para espresso y métodos de filtrado por igual.',
    ],
  },
  'guia-preparacion-cafe': {
    title: 'Cómo preparar el café del Líbano en casa',
    excerpt: 'Guía práctica para extraer todo el potencial de nuestros cafés de especialidad con los métodos más populares.',
    coverImage: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031840/SaveClip.App_625959868_18082962610967652_75738537982155299_n_f3fmus.jpg',
    author: 'Equipo La Soñada',
    publishedAt: '2024-03-15',
    category: 'Preparación',
    body: [
      'El mejor café de especialidad del mundo puede arruinarse con una mala preparación. Y el café más modesto puede sorprender con la técnica correcta. Por eso queremos compartir nuestra guía de preparación para los cafés del Líbano que llegan a tu puerta.',
      'Para V60 o Chemex (filtrado): usa agua a 92-94°C, molido medio-fino, ratio 1:15 (1g de café por 15ml de agua). Empieza con un bloom de 30 segundos (el doble del peso del café en agua) y vierte el resto en 2-3 etapas circulares. Tiempo total: 3-4 minutos.',
      'Para Aeropress: molido medio, agua a 85-88°C, ratio 1:12. Vierte, revuelve 10 segundos, espera 1 minuto y presiona suavemente durante 30 segundos. Este método resalta el cuerpo y la dulzura de nuestros honey y naturales.',
      'Para espresso: molido fino, 18-20g de café, 36-40g de extracción en 25-30 segundos a 93°C. Nuestro Blend Signature está diseñado específicamente para este método y produce una crema densa con notas de chocolate y caramelo.',
      'Lo más importante: usa el café dentro de las 4 semanas post-tostión y muele justo antes de preparar. Cada bolsa de LA SOÑADA incluye la fecha de tostión para que siempre sepas qué tan fresco está tu café.',
    ],
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = mockPosts[params.slug];
  if (!post) return { title: 'Artículo no encontrado' };

  return {
    title: post.title,
    description: post.excerpt,
    keywords: ['café especialidad', 'Líbano Tolima', post.category.toLowerCase(), 'LA SOÑADA COFFIE'],
    alternates: { canonical: `${SITE_URL}/blog/${params.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${params.slug}`,
      images: [{ url: post.coverImage, width: 1200, height: 800, alt: post.title }],
      publishedTime: post.publishedAt,
      authors: [post.author],
      section: post.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = mockPosts[params.slug];
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'LA SOÑADA COFFIE',
      logo: {
        '@type': 'ImageObject',
        url: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031839/SaveClip.App_623951363_18011151110666596_752443976468967087_n_jikvhr.jpg',
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${params.slug}` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            <time dateTime={post.publishedAt}>
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
    </>
  );
}
