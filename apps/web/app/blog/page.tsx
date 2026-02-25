/**
 * Blog + Galería de contenido — LA SOÑADA COFFIE
 * URL: /blog
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog — LA SOÑADA COFFIE',
  description:
    'Historias del café del Líbano, Tolima. Proceso, orígenes, técnicas de preparación y la cultura cafetera de nuestra región.',
};

const VIDEO_URL =
  'https://res.cloudinary.com/dsbzuhyfu/video/upload/v1772031850/SaveClip.App_AQOxs-WprIayd3vX7iWeD7UWsJsytA8UUikCP2ZFGVrhfnCmpuX6RYlPs18Xoldkz6KFkMpUN_skPAp03mi14dGG_igzem5.mp4';

const IMG = {
  a: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031888/SaveClip.App_529477147_17941794516044463_6672011794010563298_n_hthrjs.jpg',
  b: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031886/SaveClip.App_529131866_17958666815969366_870099234742798010_n_qjkkek.webp',
  c: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031883/SaveClip.App_528667901_17941794480044463_7749262412641503883_n_uwpplo.jpg',
  d: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031847/SaveClip.App_621986866_18066107045241922_897931816791468786_n_d2uwp7.jpg',
  e: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031844/SaveClip.App_572812163_17967627392969366_7030966973544852109_n_nnk6wa.jpg',
  f: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031841/SaveClip.App_630569795_17978709332969366_32657942601693164_n_lzes4x.jpg',
  g: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031840/SaveClip.App_625959868_18082962610967652_75738537982155299_n_f3fmus.jpg',
  h: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031839/SaveClip.App_624247203_18096365096489402_2997006078983668707_n_jlx4xy.webp',
  i: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031839/SaveClip.App_623951363_18011151110666596_752443976468967087_n_jikvhr.jpg',
  j: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031822/SaveClip.App_528545761_17958666824969366_6813040915049069589_n_w6wwvf.webp',
  k: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031891/SaveClip.App_554401032_17947154325044463_9108692877301623870_n_fmee9x.jpg',
  l: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031895/SaveClip.App_561491638_17965500092969366_1633930827551455444_n_qixfkq.jpg',
  m: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031894/SaveClip.App_554771746_17947154346044463_6345059852936679585_n_bw9mvu.jpg',
};

const posts = [
  {
    slug: 'libano-tolima-tierra-de-cafe',
    title: 'Líbano, Tolima: la tierra que sueña con el café',
    excerpt:
      'En las montañas de la cordillera Central, el Líbano guarda uno de los secretos mejor guardados del café colombiano. Altitud, clima y pasión caficultora se combinan para producir granos de excepción.',
    coverImage: IMG.k,
    author: 'Equipo La Soñada',
    publishedAt: '2024-02-10',
    category: 'Origen',
  },
  {
    slug: 'fermentacion-anaerobica-libano',
    title: 'Fermentación anaeróbica: el proceso que nos soñamos',
    excerpt:
      '72 horas en tanques sellados a 2.000 msnm. Así nace nuestro Natural Anaeróbico del Líbano, un café que desafía todo lo que creías saber sobre el sabor.',
    coverImage: IMG.a,
    author: 'Equipo La Soñada',
    publishedAt: '2024-01-28',
    category: 'Proceso',
  },
  {
    slug: 'honey-process-dulzor-natural',
    title: 'Honey Process: el dulzor natural de nuestras fincas',
    excerpt:
      'El proceso honey conserva parte del mucílago durante el secado al sol. En el Líbano, el resultado es un café de dulzor excepcional y cuerpo cremoso que enamora desde la primera taza.',
    coverImage: IMG.l,
    author: 'Laura M.',
    publishedAt: '2024-01-15',
    category: 'Proceso',
  },
  {
    slug: 'brew-guide-filtrado',
    title: 'Cómo preparar nuestro Washed en método filtrado',
    excerpt:
      'El método filtrado es el mejor aliado para los cafés lavados del Líbano. Te contamos paso a paso cómo extraer cada nota floral y su acidez limpia y elegante.',
    coverImage: IMG.b,
    author: 'Carlos R.',
    publishedAt: '2023-12-20',
    category: 'Preparación',
  },
];

// Galería de imágenes de la marca
const gallery = [IMG.c, IMG.d, IMG.e, IMG.f, IMG.g, IMG.h, IMG.i, IMG.j, IMG.m];

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-coffee-50 pt-20">
      {/* Header */}
      <div className="bg-charcoal-950 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-sans uppercase tracking-widest text-coffee-500 mb-2">
            Desde el Líbano, Tolima
          </p>
          <h1 className="font-serif text-5xl font-bold text-cream-100">Blog & Galería</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-20">

        {/* ── Video destacado ─────────────────────────────────── */}
        <section>
          <p className="text-xs font-sans uppercase tracking-widest text-coffee-500 mb-4">
            Video
          </p>
          <h2 className="font-serif text-3xl font-bold text-charcoal-900 mb-6">
            Detrás de cada taza
          </h2>
          <div className="relative w-full rounded-2xl overflow-hidden bg-charcoal-950 shadow-2xl aspect-video">
            <video
              src={VIDEO_URL}
              controls
              playsInline
              poster={IMG.k}
              className="w-full h-full object-cover"
            >
              Tu navegador no soporta video HTML5.
            </video>
          </div>
          <p className="mt-4 text-coffee-600 text-sm leading-relaxed max-w-2xl">
            Un vistazo al proceso artesanal detrás de cada bolsa de LA SOÑADA COFFIE.
            Del cafetal al tostador, en el corazón del Líbano, Tolima.
          </p>
        </section>

        {/* ── Post destacado ──────────────────────────────────── */}
        <section>
          <p className="text-xs font-sans uppercase tracking-widest text-coffee-500 mb-4">
            Artículo destacado
          </p>
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-0 items-stretch card overflow-hidden card-hover">
                <div className="relative aspect-[4/3] bg-coffee-100">
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="inline-block text-xs font-sans uppercase tracking-wider text-coffee-500 mb-3 border border-coffee-200 rounded-full px-3 py-1 w-fit">
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
        </section>

        {/* ── Grid de artículos ───────────────────────────────── */}
        <section>
          <p className="text-xs font-sans uppercase tracking-widest text-coffee-500 mb-6">
            Más artículos
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group card card-hover block"
              >
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
                      {new Date(post.publishedAt).toLocaleDateString('es-CO', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Galería de imágenes ─────────────────────────────── */}
        <section>
          <p className="text-xs font-sans uppercase tracking-widest text-coffee-500 mb-4">
            Galería
          </p>
          <h2 className="font-serif text-3xl font-bold text-charcoal-900 mb-8">
            Momentos desde el Líbano
          </h2>
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {gallery.map((src, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-xl break-inside-avoid bg-coffee-100"
              >
                <Image
                  src={src}
                  alt={`La Soñada Coffie — imagen ${i + 1}`}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
