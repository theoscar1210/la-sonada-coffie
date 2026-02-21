'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, User, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useAuthStore } from '@/lib/store/auth';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Café', href: '/productos' },
  { label: 'Proceso', href: '/proceso' },
  { label: 'Blog', href: '/blog' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleCart, itemCount } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const count = itemCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-coffee-950/95 backdrop-blur-md shadow-lg shadow-coffee-950/20'
          : 'bg-transparent',
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-serif text-2xl font-bold text-cream-100 tracking-wide group-hover:text-coffee-300 transition-colors">
              LA SOÑADA
            </span>
            <span className="font-sans text-xs tracking-[0.4em] text-coffee-400 uppercase">
              COFFIE
            </span>
          </Link>

          {/* Nav links — desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cream-200 hover:text-coffee-300 font-sans text-sm tracking-wide transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Cuenta */}
            {isAuthenticated ? (
              <Link
                href="/cuenta"
                className="hidden md:flex items-center gap-1.5 text-cream-200 hover:text-coffee-300 transition-colors"
              >
                <User size={18} />
                <span className="text-sm">{user?.name?.split(' ')[0]}</span>
                <ChevronDown size={14} />
              </Link>
            ) : (
              <Link
                href="/cuenta/login"
                className="hidden md:inline-flex text-sm text-cream-300 hover:text-cream-100 transition-colors"
              >
                Iniciar sesión
              </Link>
            )}

            {/* Carrito */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-cream-200 hover:text-coffee-300 transition-colors"
              aria-label={`Carrito (${count} items)`}
            >
              <ShoppingBag size={22} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-coffee-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {count > 99 ? '99+' : count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-cream-200"
              aria-label="Menú"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-coffee-800"
            >
              <div className="py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-cream-200 hover:text-coffee-300 font-sans text-base px-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href={isAuthenticated ? '/cuenta' : '/cuenta/login'}
                  className="text-cream-200 hover:text-coffee-300 font-sans text-base px-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {isAuthenticated ? 'Mi cuenta' : 'Iniciar sesión'}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
