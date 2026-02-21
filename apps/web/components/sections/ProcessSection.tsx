'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sprout, Sun, Flame, Package, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Sprout,
    number: '01',
    title: 'Selección en origen',
    desc: 'Visitamos las fincas personalmente. Escogemos solo los lotes con puntuación Q-Grader superior a 85.',
  },
  {
    icon: Sun,
    number: '02',
    title: 'Proceso y secado',
    desc: 'Supervisamos el procesado: lavado, natural o honey, según las características del lote.',
  },
  {
    icon: Flame,
    number: '03',
    title: 'Tostión artesanal',
    desc: 'Tostamos en pequeños lotes con perfil específico para cada café, destacando sus notas únicas.',
  },
  {
    icon: Package,
    number: '04',
    title: 'Fresco a tu puerta',
    desc: 'Empacamos el mismo día de la tostión con válvula desgasificadora para máxima frescura.',
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 bg-charcoal-950 relative overflow-hidden">
      {/* Línea decorativa */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coffee-700 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-sans uppercase tracking-widest text-coffee-500 mb-3">
            Del grano a la taza
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream-100">
            Nuestro proceso
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Línea conectora — desktop */}
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-coffee-700 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center relative"
            >
              {/* Icono */}
              <div className="relative inline-flex">
                <div className="w-16 h-16 bg-coffee-900 border border-coffee-700 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <step.icon className="text-coffee-400" size={28} />
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-coffee-600 rounded-full text-cream-100 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>

              <h3 className="font-serif text-lg font-semibold text-cream-100 mb-2">
                {step.title}
              </h3>
              <p className="text-coffee-500 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-14">
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
