/**
 * Página storytelling del proceso del café
 * URL: /proceso
 */

import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Nuestro Proceso',
  description: 'Descubre cómo llevamos el café desde la finca hasta tu taza. Del origen, pasando por el procesado y la tostión artesanal.',
};

const timeline = [
  {
    id: 'historia',
    phase: '2019',
    title: 'El origen de LA SOÑADA',
    content:
      'Todo comenzó con un viaje a Huila, Colombia. El fundador, apasionado por el café, decidió conectar directamente a los productores con los amantes del café premium en las ciudades. La promesa era simple: café honesto, trazable y delicioso.',
    image: '/images/proceso/historia.jpg',
    align: 'right',
  },
  {
    id: 'seleccion',
    phase: 'Paso 01',
    title: 'Selección en origen',
    content:
      'Visitamos cada finca personalmente. Evaluamos el estado de las plantas, las prácticas de cultivo y el potencial del lote. Solo trabajamos con caficultores que comparten nuestra filosofía de calidad y sostenibilidad. Cada lote es evaluado por nuestro Q-Grader certificado.',
    image: '/images/proceso/seleccion.jpg',
    align: 'left',
  },
  {
    id: 'proceso',
    phase: 'Paso 02',
    title: 'Procesado y fermentación',
    content:
      'El método de procesado define el perfil de sabor. Trabajamos con cafés lavados para mayor claridad y acidez, naturales para dulzor y cuerpo, honey process para el equilibrio perfecto, y fermentaciones anaeróbicas para perfiles exóticos y complejos.',
    image: '/images/proceso/procesado.jpg',
    align: 'right',
  },
  {
    id: 'tostion',
    phase: 'Paso 03',
    title: 'Tostión artesanal',
    content:
      'Cada café recibe su propio perfil de tostión, desarrollado en nuestra tostadora de 10kg. Tostamos en lotes pequeños para garantizar consistencia y controlamos cada variable: temperatura, tiempo, punto de crack y desarrollo. El objetivo siempre es resaltar lo mejor del grano.',
    image: '/images/proceso/tostion.jpg',
    align: 'left',
  },
  {
    id: 'entrega',
    phase: 'Paso 04',
    title: 'Fresco a tu puerta',
    content:
      'Empacamos dentro de las 24 horas post-tostión. Usamos bolsas con válvula desgasificadora de un solo sentido que permite al café liberar CO₂ sin absorber oxígeno. Cada bolsa incluye la fecha de tostión, el lote y un QR con información completa de la finca.',
    image: '/images/proceso/empaque.jpg',
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
            src="/images/proceso/hero.jpg"
            alt="Proceso del café"
            fill
            className="object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <p className="text-coffee-400 text-sm uppercase tracking-widest mb-3 font-sans">
            Del campo a tu taza
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
