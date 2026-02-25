'use client';

/**
 * Página del carrito
 * URL: /carrito
 */

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice, cloudinaryUrl } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, total, clearCart } = useCartStore();
  const sub = subtotal();
  const tot = total();
  const FREE_THRESHOLD = 100000;
  const shipping = sub >= FREE_THRESHOLD ? 0 : 8000;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-coffee-50 pt-20 flex items-center justify-center">
        <div className="text-center py-20">
          <ShoppingBag size={64} className="text-coffee-200 mx-auto mb-6" />
          <h1 className="font-serif text-3xl font-bold text-charcoal-900 mb-3">
            Tu carrito está vacío
          </h1>
          <p className="text-coffee-500 mb-8">Descubre nuestra selección de cafés premium</p>
          <Link href="/productos" className="btn-primary">
            Ver catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-coffee-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal-900 mb-6 md:mb-10">Tu carrito</h1>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Lista items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const img = item.product.images[0]
                ? cloudinaryUrl(item.product.images[0], { width: 200, height: 200 })
                : '/images/placeholder-coffee.jpg';

              return (
                <motion.div
                  key={`${item.product.id}-${item.grind}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="card p-4 sm:p-6 flex gap-4 sm:gap-6"
                >
                  <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-coffee-100">
                    <Image src={img} alt={item.product.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <Link
                          href={`/productos/${item.product.slug}`}
                          className="font-serif text-base sm:text-lg font-semibold text-charcoal-900 hover:text-coffee-700 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-coffee-500 mt-0.5">
                          {item.product.weight}g
                          {item.grind ? ` · ${item.grind}` : ''}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-coffee-300 hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3 border border-coffee-200 rounded-full px-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 text-coffee-500 hover:text-coffee-700"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 text-coffee-500 hover:text-coffee-700"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-sans font-bold text-lg text-charcoal-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <button
              onClick={clearCart}
              className="text-sm text-coffee-400 hover:text-red-400 transition-colors underline underline-offset-2"
            >
              Vaciar carrito
            </button>
          </div>

          {/* Resumen */}
          <div className="lg:col-span-1">
            <div className="card p-4 sm:p-6 sticky top-24 sm:top-28">
              <h2 className="font-serif text-xl font-semibold text-charcoal-900 mb-6">
                Resumen de orden
              </h2>

              <div className="space-y-3 pb-4 border-b border-coffee-100">
                <div className="flex justify-between text-sm">
                  <span className="text-coffee-600">Subtotal</span>
                  <span>{formatPrice(sub)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-coffee-600">Envío</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                    {shipping === 0 ? 'GRATIS' : formatPrice(shipping)}
                  </span>
                </div>
                {sub < FREE_THRESHOLD && (
                  <p className="text-xs text-coffee-400">
                    Agrega {formatPrice(FREE_THRESHOLD - sub)} más para envío gratis
                  </p>
                )}
              </div>

              <div className="flex justify-between font-bold text-lg mt-4 mb-6">
                <span>Total</span>
                <span>{formatPrice(tot)}</span>
              </div>

              <Link href="/checkout" className="btn-primary w-full text-center flex items-center justify-center gap-2">
                Continuar al checkout
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/productos"
                className="btn-ghost w-full text-center mt-3 text-sm text-coffee-600"
              >
                Seguir comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
