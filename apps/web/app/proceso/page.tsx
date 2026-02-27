/**
 * Página storytelling del proceso del café
 * URL: /proceso
 */

import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Nuestro Proceso — Del Líbano, Tolima a tu taza',
  description:
    'Conoce cómo seleccionamos, procesamos y tostamos cada grano en el Líbano, Tolima. Selección en finca, fermentación, tostión artesanal y empaque con válvula desgasificadora.',
  keywords: [
    'proceso café especialidad',
    'tostión artesanal Tolima',
    'fermentación anaeróbica café',
    'honey process Colombia',
    'café lavado Líbano',
    'caficultura Tolima',
  ],
  alternates: { canonical: '/proceso' },
  openGraph: {
    title: 'Nuestro Proceso — LA SOÑADA COFFIE',
    description: 'Del Líbano, Tolima a tu taza. Selección, procesado, tostión artesanal.',
    url: '/proceso',
    images: [{
      url: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/c_fill,w_1200,h_630/v1772031886/SaveClip.App_529131866_17958666815969366_870099234742798010_n_qjkkek.webp',
      width: 1200,
      height: 630,
      alt: 'Proceso del café — Líbano, Tolima',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nuestro Proceso — LA SOÑADA COFFIE',
    description: 'Del Líbano, Tolima a tu taza. Tostión artesanal en pequeños lotes.',
    images: ['https://res.cloudinary.com/dsbzuhyfu/image/upload/c_fill,w_1200,h_630/v1772031886/SaveClip.App_529131866_17958666815969366_870099234742798010_n_qjkkek.webp'],
  },
};

const IMG = {
  hero: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031886/SaveClip.App_529131866_17958666815969366_870099234742798010_n_qjkkek.webp',
  historia: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031891/SaveClip.App_554401032_17947154325044463_9108692877301623870_n_fmee9x.jpg',
  seleccion: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031888/SaveClip.App_529477147_17941794516044463_6672011794010563298_n_hthrjs.jpg',
  procesado: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031883/SaveClip.App_528667901_17941794480044463_7749262412641503883_n_uwpplo.jpg',
  tostion: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031847/SaveClip.App_621986866_18066107045241922_897931816791468786_n_d2uwp7.jpg',
  empaque: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031839/SaveClip.App_624247203_18096365096489402_2997006078983668707_n_jlx4xy.webp',
};

const timeline = [
  {
    id: 'historia',
    phase: 'Nuestro origen',
    title: 'Nació en el Líbano, Tolima',
    content:
      'Todo comenzó en las montañas del Líbano, Tolima, en el corazón de la cordillera Central de Colombia. Rodeados de cafetales que llevan décadas produciendo granos excepcionales, nació LA SOÑADA COFFIE con una promesa simple: llevar el café de estas tierras privilegiadas directamente a quienes lo saben apreciar. Café honesto, trazable y delicioso, de la montaña a tu taza.',
    image: IMG.historia,
    align: 'right',
  },
  {
    id: 'seleccion',
    phase: 'Paso 01',
    title: 'Selección en finca',
    content:
      'Trabajamos directamente con caficultores del Líbano, Tolima. Visitamos cada finca, evaluamos el estado de las plantas, las prácticas de cultivo y el potencial del lote. Solo trabajamos con productores que comparten nuestra filosofía de calidad y cuidado del territorio. Cada lote es evaluado para garantizar que lo que llega a tu taza sea lo mejor de la cosecha.',
    image: IMG.seleccion,
    align: 'left',
  },
  {
    id: 'proceso',
    phase: 'Paso 02',
    title: 'Procesado y fermentación',
    content:
      'El método de procesado define el perfil de sabor. Trabajamos con cafés lavados para mayor claridad y acidez brillante, naturales para dulzor y cuerpo, honey process para el equilibrio perfecto, y fermentaciones anaeróbicas para perfiles exóticos y complejos que sorprenden hasta al paladar más exigente.',
    image: IMG.procesado,
    align: 'right',
  },
  {
    id: 'tostion',
    phase: 'Paso 03',
    title: 'Tostión artesanal',
    content:
      'Cada café del Líbano recibe su propio perfil de tostión, desarrollado para resaltar las características únicas del terroir tolimense. Tostamos en lotes pequeños para garantizar consistencia y controlamos cada variable: temperatura, tiempo y desarrollo. El objetivo siempre es que en cada taza se sienta el origen.',
    image: IMG.tostion,
    align: 'left',
  },
  {
    id: 'entrega',
    phase: 'Paso 04',
    title: 'Fresco a tu puerta',
    content:
      'Empacamos dentro de las 24 horas post-tostión. Usamos bolsas con válvula desgasificadora de un solo sentido que permite al café liberar CO₂ sin absorber oxígeno. Cada bolsa incluye la fecha de tostión, el lote y la información completa de origen para que sepas exactamente de dónde viene tu café.',
    image: IMG.empaque,
    align: 'right',
  },
];

const roastProfiles = [
  { level: 'Clara', temp: '196°C', color: 'bg-amber-300', desc: 'Acidez brillante, floral y frutal. Perfecta para métodos de filtrado.' },
  { level: 'Media-Clara', temp: '200°C', color: 'bg-amber-500', desc: 'Balance entre acidez y dulzor. Versátil para espresso y filtrado.' },
  { level: 'Media', temp: '205°C', color: 'bg-coffee-500', desc: 'Cuerpo medio, caramelización moderada. El punto dulce del espresso.' },
  { level: 'Media-Oscura', temp: '210°C', color: 'bg-coffee-700', desc: 'Mayor cuerpo, menor acidez. Excelente con leche.' },
  { level: 'Oscura', temp: '218°C', color: 'bg-charcoal-800', desc: 'Intenso, amargo controlado. Crema espesa para espresso fuerte.' },
];

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-coffee-50 pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-end bg-charcoal-950">
        <div className="absolute inset-0">
          <Image
            src={IMG.hero}
            alt="Proceso del café La Soñada — Líbano, Tolima"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <p className="text-coffee-400 text-sm uppercase tracking-widest mb-3 font-sans">
            Líbano, Tolima · Del campo a tu taza
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-cream-100 leading-none">
            Nuestro proceso
          </h1>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {timeline.map((item) => (
              <div
                key={item.id}
                id={item.id}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  item.align === 'right' ? '' : 'md:flex-row-reverse'
                }`}
              >
                <div className={item.align === 'left' ? 'md:order-2' : ''}>
                  <p className="text-sm text-coffee-500 font-sans uppercase tracking-widest mb-2">
                    {item.phase}
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal-900 mb-5">
                    {item.title}
                  </h2>
                  <p className="text-coffee-600 leading-relaxed text-lg">{item.content}</p>
                </div>
                <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${item.align === 'left' ? 'md:order-1' : ''}`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfiles de tostión */}
      <section className="py-24 bg-charcoal-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-coffee-500 text-sm uppercase tracking-widest mb-3 font-sans">
              El arte de la tostión
            </p>
            <h2 className="font-serif text-4xl font-bold text-cream-100">
              Perfiles de tostión
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {roastProfiles.map((profile) => (
              <div key={profile.level} className="bg-coffee-900/50 rounded-2xl p-5 border border-coffee-800">
                <div className={`w-10 h-10 ${profile.color} rounded-xl mb-4`} />
                <p className="font-serif text-lg font-semibold text-cream-100 mb-1">
                  {profile.level}
                </p>
                <p className="text-xs text-coffee-500 mb-3">{profile.temp}</p>
                <p className="text-sm text-coffee-400 leading-relaxed">{profile.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
