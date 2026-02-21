'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Check, ChevronLeft, ChevronRight, MapPin, Mountain, Droplets } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice, cloudinaryUrl } from '@/lib/utils';
import { RoastLevelBadge } from '@/components/ui/RoastLevelBadge';
import type { Product } from '@/types';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedGrind, setSelectedGrind] = useState<string | undefined>(
    product.grindOptions[0],
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(product, quantity, selectedGrind);
    setAdded(true);
    toast.success('Agregado al carrito');
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.comparePrice
    ? Math.round((1 - product.price / product.comparePrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-coffee-500 mb-8">
        <Link href="/" className="hover:text-coffee-700">Inicio</Link>
        <span>/</span>
        <Link href="/productos" className="hover:text-coffee-700">Catálogo</Link>
        <span>/</span>
        <span className="text-charcoal-700">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Galería */}
        <div>
          {/* Imagen principal */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-coffee-100 mb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={cloudinaryUrl(product.images[selectedImage] ?? '/images/placeholder-coffee.jpg', { width: 800, height: 800 })}
                  alt={`${product.name} — imagen ${selectedImage + 1}`}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Nav flechas */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage((i) => Math.max(0, i - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                  disabled={selectedImage === 0}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setSelectedImage((i) => Math.min(product.images.length - 1, i + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                  disabled={selectedImage === product.images.length - 1}
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-coffee-600' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={cloudinaryUrl(img, { width: 160, height: 160 })}
                    alt={`Imagen ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info del producto */}
        <div>
          {/* Categoría */}
          <p className="text-sm text-coffee-500 font-sans uppercase tracking-wider mb-2">
            {product.category.name}
          </p>

          {/* Nombre */}
          <h1 className="font-serif text-4xl font-bold text-charcoal-900 leading-tight mb-4">
            {product.name}
          </h1>

          {/* Tostión */}
          <div className="mb-5">
            <RoastLevelBadge level={product.roastLevel} showDots />
          </div>

          {/* Descripción corta */}
          <p className="text-coffee-600 leading-relaxed mb-6">{product.shortDesc}</p>

          {/* Detalles de origen */}
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-coffee-50 rounded-xl">
            <div className="flex flex-col items-center text-center gap-1">
              <MapPin size={18} className="text-coffee-500" />
              <span className="text-xs text-coffee-500 font-sans">Origen</span>
              <span className="text-sm font-medium text-charcoal-800">{product.origin}</span>
            </div>
            {product.altitude && (
              <div className="flex flex-col items-center text-center gap-1">
                <Mountain size={18} className="text-coffee-500" />
                <span className="text-xs text-coffee-500 font-sans">Altitud</span>
                <span className="text-sm font-medium text-charcoal-800">{product.altitude}</span>
              </div>
            )}
            {product.process && (
              <div className="flex flex-col items-center text-center gap-1">
                <Droplets size={18} className="text-coffee-500" />
                <span className="text-xs text-coffee-500 font-sans">Proceso</span>
                <span className="text-sm font-medium text-charcoal-800">{product.process}</span>
              </div>
            )}
          </div>

          {/* Notas de sabor */}
          <div className="mb-6">
            <p className="text-sm font-sans font-semibold text-coffee-600 uppercase tracking-wider mb-2">
              Notas de sabor
            </p>
            <div className="flex flex-wrap gap-2">
              {product.flavorNotes.map((note) => (
                <span
                  key={note}
                  className="px-3 py-1 bg-coffee-100 text-coffee-700 text-sm rounded-full border border-coffee-200"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Selector de molienda */}
          <div className="mb-6">
            <p className="text-sm font-sans font-semibold text-coffee-600 uppercase tracking-wider mb-2">
              Molienda
            </p>
            <div className="flex flex-wrap gap-2">
              {product.grindOptions.map((grind) => (
                <button
                  key={grind}
                  onClick={() => setSelectedGrind(grind)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all capitalize ${
                    selectedGrind === grind
                      ? 'bg-coffee-700 text-cream-100 border-coffee-700'
                      : 'border-coffee-300 text-coffee-700 hover:border-coffee-500'
                  }`}
                >
                  {grind}
                </button>
              ))}
            </div>
          </div>

          {/* Precio + cantidad + botón */}
          <div className="pt-6 border-t border-coffee-100">
            {/* Precio */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-sans text-4xl font-bold text-charcoal-900">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-lg text-coffee-400 line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
              {discount > 0 && (
                <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Cantidad */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-coffee-200 rounded-full">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 text-coffee-600 hover:text-coffee-800 font-bold"
                >
                  −
                </button>
                <span className="px-4 font-medium text-charcoal-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-4 py-2 text-coffee-600 hover:text-coffee-800 font-bold"
                >
                  +
                </button>
              </div>
              <p className="text-sm text-coffee-400">{product.stock} disponibles</p>
            </div>

            {/* Botón agregar */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full flex items-center justify-center gap-3 py-4 rounded-full font-sans font-semibold text-base transition-all ${
                added
                  ? 'bg-green-600 text-white'
                  : product.stock === 0
                  ? 'bg-coffee-200 text-coffee-500 cursor-not-allowed'
                  : 'bg-coffee-700 text-cream-100 hover:bg-coffee-800'
              }`}
            >
              {added ? (
                <>
                  <Check size={20} />
                  Agregado
                </>
              ) : product.stock === 0 ? (
                'Agotado'
              ) : (
                <>
                  <ShoppingBag size={20} />
                  Agregar al carrito — {formatPrice(product.price * quantity)}
                </>
              )}
            </motion.button>
          </div>

          {/* Descripción larga */}
          <div className="mt-8 pt-8 border-t border-coffee-100">
            <h2 className="font-serif text-xl font-semibold text-charcoal-900 mb-4">
              Sobre este café
            </h2>
            <div className="prose prose-sm text-coffee-600 leading-relaxed">
              {product.description.split('\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
