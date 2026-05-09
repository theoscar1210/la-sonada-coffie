/**
 * Historia de la marca — LA SOÑADA COFFIE
 * URL: /historia
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Historia de la marca — LA SOÑADA COFFIE',
  description:
    'Conoce la historia de LA SOÑADA COFFIE: cómo nació una marca de café de especialidad en el Líbano, Tolima, Colombia, con amor por el origen, el caficultor y el sabor.',
  keywords: [
    'historia La Soñada Coffie',
    'Finca Los Pinos Líbano Tolima',
    'café especialidad Líbano Tolima',
    'Vereda La Marcada Líbano',
    'café 1600 msnm Tolima',
    'emprendimiento cafetero Colombia',
    'origen café colombiano',
  ],
  alternates: { canonical: '/historia' },
  openGraph: {
    title: 'Historia de la marca — LA SOÑADA COFFIE',
    description: 'Cómo nació LA SOÑADA COFFIE en el Líbano, Tolima. Una historia de café, territorio y sueños.',
    url: '/historia',
    images: [{
      url: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/c_fill,w_1200,h_630/v1772031891/SaveClip.App_554401032_17947154325044463_9108692877301623870_n_fmee9x.jpg',
      width: 1200,
      height: 630,
      alt: 'Historia de LA SOÑADA COFFIE — Líbano, Tolima',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Historia de la marca — LA SOÑADA COFFIE',
    description: 'Cómo nació LA SOÑADA COFFIE en el Líbano, Tolima.',
    images: ['https://res.cloudinary.com/dsbzuhyfu/image/upload/c_fill,w_1200,h_630/v1772031891/SaveClip.App_554401032_17947154325044463_9108692877301623870_n_fmee9x.jpg'],
  },
};

const IMG = {
  hero:    'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031891/SaveClip.App_554401032_17947154325044463_9108692877301623870_n_fmee9x.jpg',
  logo:    'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031839/SaveClip.App_623951363_18011151110666596_752443976468967087_n_jikvhr.jpg',
  campo:   'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031888/SaveClip.App_529477147_17941794516044463_6672011794010563298_n_hthrjs.jpg',
  proceso: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031883/SaveClip.App_528667901_17941794480044463_7749262412641503883_n_uwpplo.jpg',
  tostion: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031847/SaveClip.App_621986866_18066107045241922_897931816791468786_n_d2uwp7.jpg',
  empaque: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031839/SaveClip.App_624247203_18096365096489402_2997006078983668707_n_jlx4xy.webp',
  montana: 'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031886/SaveClip.App_529131866_17958666815969366_870099234742798010_n_qjkkek.webp',
  granos:  'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031822/SaveClip.App_528545761_17958666824969366_6813040915049069589_n_w6wwvf.webp',
  vida:    'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031895/SaveClip.App_561491638_17965500092969366_1633930827551455444_n_qixfkq.jpg',
  finca:   'https://res.cloudinary.com/dsbzuhyfu/image/upload/v1772031894/SaveClip.App_554771746_17947154346044463_6345059852936679585_n_bw9mvu.jpg',
};

const valores = [
  {
    icon: '🌱',
    titulo: 'Origen trazable',
    desc: 'Cada bolsa lleva el nombre del caficultor, la vereda y la altitud del lote. Transparencia total, de la finca a tu taza.',
  },
  {
    icon: '✋',
    titulo: 'Trabajo artesanal',
    desc: 'Lotes pequeños, tostión manual, empaques con válvula. Hacemos todo despacio porque el café lo merece.',
  },
  {
    icon: '🏔️',
    titulo: 'Territorio propio',
    desc: 'Somos del Líbano, Tolima. No buscamos cafés de moda en otras regiones; apostamos todo por nuestra tierra.',
  },
  {
    icon: '🤝',
    titulo: 'Precio justo',
    desc: 'Pagamos por encima del mercado a los caficultores. Su bienestar es parte de nuestra fórmula de calidad.',
  },
];

export default function HistoriaPage() {
  return (
    <div className="min-h-screen bg-coffee-50 pt-20">

      {/* ── Hero ── */}
      <section className="relative h-[70vh] flex items-end bg-charcoal-950 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={IMG.hero}
            alt="Paisaje cafetero del Líbano, Tolima"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <p className="text-coffee-400 text-xs sm:text-sm uppercase tracking-widest mb-3 font-sans">
            Finca Los Pinos · Vereda La Marcada · Líbano, Tolima · 1.600 msnm
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-cream-100 leading-none mb-4">
            Historia<br />de la marca
          </h1>
          <p className="text-coffee-300 text-base sm:text-lg max-w-xl">
            Cómo un sueño entre cafetales se convirtió en LA SOÑADA COFFIE.
          </p>
        </div>
      </section>

      {/* ── El comienzo ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <p className="text-sm text-coffee-500 font-sans uppercase tracking-widest mb-3">
                El origen
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 mb-6">
                Todo comenzó con un sueño
              </h2>
              <div className="space-y-4 text-coffee-600 leading-relaxed text-base sm:text-lg">
                <p>
                  En la Vereda La Marcada, municipio del Líbano, Tolima, a 1.600 metros sobre el nivel del mar,
                  entre montañas verdes y el aroma permanente del café maduro, nació la idea que hoy es LA SOÑADA COFFIE.
                  Todo comienza en <strong className="text-charcoal-800">Finca Los Pinos</strong>, donde los granos
                  crecen lentos, acumulando azúcares y complejidad.
                </p>
                <p>
                  No fue en una oficina ni en un laboratorio. Fue en medio de los cafetales, escuchando a los
                  caficultores hablar de sus cosechas, entendiendo que había algo extraordinario en esos granos
                  que nunca llegaba directamente al consumidor final.
                </p>
                <p>
                  La pregunta era simple: ¿por qué el mejor café de Finca Los Pinos se exporta como commodity cuando
                  podría llegar como especialidad, con proceso Natural, Honey o Lavado, a quienes lo saben apreciar?
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={IMG.montana}
                alt="Montañas cafeteras del Líbano, Tolima"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── La tierra ── */}
      <section className="py-16 sm:py-24 bg-charcoal-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl md:order-1">
              <Image
                src={IMG.campo}
                alt="Caficultores del Líbano, Tolima"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:order-2">
              <p className="text-sm text-coffee-400 font-sans uppercase tracking-widest mb-3">
                La tierra
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream-100 mb-6">
                El Líbano, Tolima:<br />tierra de cafés de excepción
              </h2>
              <div className="space-y-4 text-coffee-400 leading-relaxed text-base sm:text-lg">
                <p>
                  El Líbano es uno de los municipios cafeteros más emblemáticos de Colombia. En la Vereda La Marcada,
                  Finca Los Pinos se sitúa exactamente a <strong className="text-coffee-300">1.600 msnm</strong> en la
                  cordillera Central — una altitud ideal que garantiza temperaturas frescas, lluvias bien distribuidas
                  y suelos ricos en minerales volcánicos.
                </p>
                <p>
                  A esa altura el café crece lento. El grano tarda más en madurar y acumula más azúcares,
                  lo que se traduce en mayor complejidad en la taza. Los caficultores de Finca Los Pinos
                  llevan generaciones cultivando con el mismo amor y dedicación.
                </p>
                <p>
                  Nuestra marca no podría existir en otro lugar. Finca Los Pinos, Vereda La Marcada, Líbano, Tolima —
                  no es solo nuestro origen; es nuestra identidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── El nombre ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mx-auto mb-8 ring-4 ring-coffee-300 shadow-xl">
            <Image
              src={IMG.logo}
              alt="Logo LA SOÑADA COFFIE"
              fill
              className="object-cover object-center scale-110"
            />
          </div>
          <p className="text-sm text-coffee-500 font-sans uppercase tracking-widest mb-4">
            El nombre
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 mb-8">
            ¿Por qué "La Soñada"?
          </h2>
          <div className="space-y-5 text-coffee-600 leading-relaxed text-base sm:text-lg text-left max-w-2xl mx-auto">
            <p>
              En el argot cafetero colombiano, <em className="text-charcoal-800 font-medium">soñada</em> es la
              palabra que usan los caficultores para describir una cosecha perfecta: abundante, sana,
              de granos uniformes y perfectamente maduros. Es la cosecha que todo cultivador sueña pero
              pocas veces llega.
            </p>
            <p>
              Para nosotros, cada lote que seleccionamos tiene que cumplir ese estándar. No trabajamos
              con cualquier café; buscamos los lotes que los mismos caficultores llaman así: <em className="text-charcoal-800 font-medium">"esta
              sí fue la soñada"</em>.
            </p>
            <p>
              Y <em className="text-charcoal-800 font-medium">COFFIE</em> —con IE— es nuestra forma de escribir
              nuestra propia historia. No una copia, no una traducción directa. Algo nuestro, del Líbano,
              que suena a café pero se escribe diferente, porque somos diferentes.
            </p>
          </div>
        </div>
      </section>

      {/* ── Galería de proceso ── */}
      <section className="py-16 sm:py-24 bg-coffee-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-sm text-coffee-500 font-sans uppercase tracking-widest mb-3">
              De la finca a tu taza
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
              El camino del grano
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {[
              { src: IMG.campo,   alt: 'Selección en finca',         label: 'Selección' },
              { src: IMG.proceso, alt: 'Procesado y fermentación',   label: 'Procesado' },
              { src: IMG.granos,  alt: 'Granos de café especial',    label: 'Granos' },
              { src: IMG.tostion, alt: 'Tostión artesanal',          label: 'Tostión' },
              { src: IMG.empaque, alt: 'Empaque con válvula',        label: 'Empaque' },
              { src: IMG.vida,    alt: 'Café de La Soñada',          label: 'Tu taza' },
            ].map((item) => (
              <div
                key={item.label}
                className="relative aspect-square rounded-xl overflow-hidden group shadow-sm"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal-950/30 group-hover:bg-charcoal-950/50 transition-colors duration-300" />
                <span className="absolute bottom-3 left-3 text-cream-100 text-xs font-sans font-semibold uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Valores ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-sm text-coffee-500 font-sans uppercase tracking-widest mb-3">
              Lo que nos mueve
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
              Nuestros valores
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((v) => (
              <div key={v.titulo} className="card p-6 text-center">
                <span className="text-4xl mb-4 block">{v.icon}</span>
                <h3 className="font-serif text-lg font-semibold text-charcoal-900 mb-3">
                  {v.titulo}
                </h3>
                <p className="text-sm text-coffee-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── La promesa ── */}
      <section className="relative py-20 sm:py-28 bg-charcoal-950 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={IMG.finca}
            alt="Finca cafetera del Líbano, Tolima"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-coffee-400 text-xs sm:text-sm uppercase tracking-widest mb-4 font-sans">
            Nuestra promesa
          </p>
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-cream-100 leading-snug mb-8">
            "Cada taza de LA SOÑADA es una promesa cumplida: el mejor café del Líbano, honesto,
            fresco y trazable, directo a tus manos."
          </blockquote>
          <p className="text-coffee-400 text-sm mb-10">
            — Equipo LA SOÑADA COFFIE, Líbano, Tolima
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/productos" className="btn-primary">
              Descubre nuestros cafés
            </Link>
            <Link href="/proceso" className="btn-secondary border-coffee-600 text-coffee-300 hover:bg-coffee-900/30">
              Ver nuestro proceso
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
