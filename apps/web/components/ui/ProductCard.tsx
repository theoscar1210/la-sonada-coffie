'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice, cloudinaryUrl } from '@/lib/utils';
import { RoastLevelBadge } from './RoastLevelBadge';
import type { Product } from '@/types';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const imageUrl = product.images[0]
    ? cloudinaryUrl(product.images[0], { width: 600, height: 600 })
    : '/images/placeholder-coffee.jpg';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`${product.name} añadido al carrito`);
  };

  const discount =
    product.comparePrice
      ? Math.round((1 - product.price / product.comparePrice) * 100)
      : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="card card-hover group"
    >
      <Link href={`/productos/${product.slug}`} className="block">
        {/* Imagen */}
        <div className="relative aspect-square overflow-hidden bg-coffee-100">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {/* Badge descuento */}
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-coffee-700 text-cream-100 text-xs font-bold px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
          {/* Botón rápido agregar */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="absolute bottom-3 right-3 bg-coffee-800/90 backdrop-blur-sm text-cream-100 p-2.5 rounded-full hover:bg-coffee-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Agregar al carrito"
          >
            <ShoppingBag size={18} />
          </motion.button>
        </div>

        {/* Info */}
        <div className="p-4">
          {/* Categoría */}
          <p className="text-xs text-coffee-500 font-sans uppercase tracking-wider mb-1">
            {product.origin} · {product.weight}g
          </p>

          {/* Nombre */}
          <h3 className="font-serif text-lg font-semibold text-charcoal-900 leading-tight mb-2 line-clamp-2">
            {product.name}
          </h3>

          {/* Nivel de tostión */}
          <div className="mb-3">
            <RoastLevelBadge level={product.roastLevel} showDots={false} />
          </div>

          {/* Notas de sabor */}
          <div className="flex flex-wrap gap-1 mb-4">
            {product.flavorNotes.slice(0, 3).map((note) => (
              <span
                key={note}
                className="text-xs bg-coffee-50 text-coffee-700 border border-coffee-200 px-2 py-0.5 rounded-full"
              >
                {note}
              </span>
            ))}
          </div>

          {/* Precio */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-sans font-bold text-lg text-charcoal-900">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-sm text-coffee-400 line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>
            {product.stock === 0 && (
              <span className="text-xs text-red-500 font-medium">Agotado</span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
