'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="hero-section">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Partículas / textura sutil */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c97e2f' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Contenido centrado */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="inline-flex items-center gap-2 text-coffee-400 text-sm font-sans tracking-[0.3em] uppercase mb-6 border border-coffee-700 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 bg-coffee-400 rounded-full animate-pulse" />
            Café de Especialidad Premium
          </p>
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="font-serif text-6xl md:text-8xl font-bold text-cream-100 leading-none mb-6"
        >
          La experiencia
          <br />
          <span className="text-coffee-400 italic">perfecta</span>
          <br />
          en cada taza
        </motion.h1>

        {/* Descripción */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-coffee-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Seleccionamos los mejores granos de origen único, los tostamos con precisión artesanal
          y los entregamos frescos directo a tu puerta.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/productos" className="btn-primary text-base px-8 py-4">
            Explorar cafés
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/proceso"
            className="inline-flex items-center gap-3 text-cream-300 hover:text-cream-100 transition-colors font-sans"
          >
            <span className="w-10 h-10 rounded-full border border-coffee-600 flex items-center justify-center">
              <Play size={16} fill="currentColor" />
            </span>
            Nuestro proceso
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-16 bg-gradient-to-b from-coffee-600 to-transparent mx-auto mb-2" />
          <p className="text-coffee-600 text-xs tracking-widest uppercase">Scroll</p>
        </motion.div>
      </div>
    </section>
  );
}
