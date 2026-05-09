'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

const products = [
  {
    src: '/images/IMG-20260426-WA0017.jpg',
    label: 'Natural',
    alt: 'Café Natural Finca Los Pinos — La Soñada Specialty Coffee',
    rotate: '-rotate-6',
    delay: 0.5,
  },
  {
    src: '/images/IMG-20260426-WA0018.jpg',
    label: 'Honey',
    alt: 'Café Honey Finca Los Pinos — La Soñada Specialty Coffee',
    rotate: 'rotate-0',
    delay: 0.6,
  },
  {
    src: '/images/IMG-20260426-WA0019.jpg',
    label: 'Lavado',
    alt: 'Café Lavado Finca Los Pinos — La Soñada Specialty Coffee',
    rotate: 'rotate-6',
    delay: 0.7,
  },
];

export function HeroSection() {
  return (
    <section className="hero-section">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Textura sutil */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c97e2f' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-5rem)]">

          {/* Columna izquierda — Texto */}
          <div className="text-center lg:text-left py-16 lg:py-0">
            {/* Origen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="inline-flex items-center gap-2 text-coffee-400 text-xs font-sans tracking-[0.25em] uppercase mb-4 border border-coffee-700 rounded-full px-4 py-1.5">
                <span className="w-1.5 h-1.5 bg-coffee-400 rounded-full animate-pulse" />
                Café de Especialidad Premium
              </p>
            </motion.div>

            {/* Título */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream-100 leading-[1.05] mb-5"
            >
              La experiencia
              <br />
              <span className="text-coffee-400 italic">perfecta</span>
              <br />
              en cada taza
            </motion.h1>

            {/* Finca / origen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-center gap-2 text-coffee-400 text-sm mb-3 justify-center lg:justify-start"
            >
              <MapPin size={14} className="flex-shrink-0" />
              <span className="font-sans">Finca Los Pinos · Vereda La Marcada · Líbano, Tolima · 1.600 msnm</span>
            </motion.div>

            {/* Procesos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="flex gap-2 mb-8 justify-center lg:justify-start flex-wrap"
            >
              {['Natural', 'Honey', 'Lavado'].map((p) => (
                <span
                  key={p}
                  className="px-3 py-1 bg-coffee-800/60 border border-coffee-700 text-coffee-300 text-xs font-sans rounded-full"
                >
                  {p}
                </span>
              ))}
            </motion.div>

            {/* Descripción */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-coffee-400 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10"
            >
              Seleccionamos los mejores granos de Finca Los Pinos a 1.600 msnm, los procesamos con
              métodos Natural, Honey y Lavado, y los tostamos artesanalmente para llevarte el
              verdadero sabor del Líbano, Tolima.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/productos" className="btn-primary text-base px-8 py-4">
                Explorar cafés
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/proceso"
                className="btn-secondary border-coffee-700 text-coffee-300 hover:bg-coffee-900/30 hover:border-coffee-600 text-base px-8 py-4"
              >
                Ver nuestro proceso
              </Link>
            </motion.div>
          </div>

          {/* Columna derecha — Productos */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center relative h-[520px]"
          >
            {products.map((product, i) => (
              <motion.div
                key={product.label}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: product.delay }}
                className={`absolute w-44 xl:w-52 ${product.rotate} hover:rotate-0 hover:scale-110 hover:z-20 transition-all duration-500 cursor-pointer`}
                style={{
                  left: `${i * 30}%`,
                  top: i === 1 ? '20px' : i === 0 ? '50px' : '40px',
                }}
              >
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-charcoal-950/60 ring-1 ring-coffee-700/30">
                  <Image
                    src={product.src}
                    alt={product.alt}
                    width={210}
                    height={315}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="text-center text-coffee-400 text-xs font-sans mt-2 tracking-widest uppercase">
                  {product.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <div className="w-px h-12 bg-gradient-to-b from-coffee-600 to-transparent mx-auto mb-2" />
        <p className="text-coffee-600 text-xs tracking-widest uppercase">Scroll</p>
      </motion.div>
    </section>
  );
}
