'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

const processes = [
  {
    key: 'natural',
    name: 'Natural',
    tagline: 'La fruta que define el sabor',
    description:
      'El café cherry se seca completo con su pulpa durante 20 a 30 días bajo el sol. La fruta transfiere dulzor y cuerpo directamente al grano. El resultado es una taza frutal, vinosa y de cuerpo pleno.',
    notes: ['Frutal', 'Vinoso', 'Cuerpo pleno', 'Dulzor intenso'],
    accent: 'bg-amber-500',
    border: 'border-amber-500/30',
    textAccent: 'text-amber-400',
    bg: 'bg-amber-950/20',
  },
  {
    key: 'honey',
    name: 'Honey',
    tagline: 'El equilibrio perfecto',
    description:
      'Se retira la pulpa pero se conserva el mucílago (miel) sobre el pergamino durante el secado. Este proceso combina la dulzura del natural con la limpieza del lavado, logrando el balance ideal.',
    notes: ['Caramelizado', 'Balanceado', 'Dulzor suave', 'Cuerpo medio'],
    accent: 'bg-coffee-500',
    border: 'border-coffee-500/30',
    textAccent: 'text-coffee-400',
    bg: 'bg-coffee-950/20',
  },
  {
    key: 'lavado',
    name: 'Lavado',
    tagline: 'El terroir en su estado más puro',
    description:
      'El grano es completamente despulpado y fermentado en agua antes del secado. Sin residuo de fruta, la taza refleja el terroir de Finca Los Pinos: acidez brillante, limpieza y notas florales propias de los 1.600 msnm.',
    notes: ['Acidez brillante', 'Floral', 'Limpio', 'Terroir claro'],
    accent: 'bg-pine-600',
    border: 'border-pine-600/30',
    textAccent: 'text-pine-400',
    bg: 'bg-pine-950/20',
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 bg-charcoal-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coffee-700 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-sm font-sans uppercase tracking-widest text-coffee-500 mb-3">
            Finca Los Pinos · Líbano, Tolima · 1.600 msnm
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream-100">
            Nuestros procesos
          </h2>
        </div>

        {/* Origen badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-coffee-400 text-xs font-sans border border-coffee-700 rounded-full px-5 py-2">
            <MapPin size={12} />
            Vereda La Marcada · Líbano, Tolima, Colombia
          </span>
        </motion.div>

        {/* Procesos */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {processes.map((process, i) => (
            <motion.div
              key={process.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`rounded-2xl border ${process.border} ${process.bg} p-8 relative overflow-hidden group`}
            >
              {/* Número de fondo */}
              <span className="absolute -top-4 -right-2 font-serif text-8xl font-bold text-white/5 select-none pointer-events-none">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Dot de color */}
              <div className={`w-3 h-3 ${process.accent} rounded-full mb-5`} />

              <h3 className={`font-serif text-3xl font-bold mb-1 ${process.textAccent}`}>
                {process.name}
              </h3>
              <p className="text-coffee-500 text-xs font-sans uppercase tracking-widest mb-5">
                {process.tagline}
              </p>
              <p className="text-coffee-400 text-sm leading-relaxed mb-6">
                {process.description}
              </p>

              {/* Notas de taza */}
              <div className="flex flex-wrap gap-2">
                {process.notes.map((note) => (
                  <span
                    key={note}
                    className="text-xs font-sans px-2.5 py-1 rounded-full bg-charcoal-900/60 text-coffee-400 border border-coffee-800"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/proceso"
            className="inline-flex items-center gap-2 text-coffee-400 hover:text-coffee-300 transition-colors font-sans"
          >
            Conocer más sobre nuestro proceso
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
