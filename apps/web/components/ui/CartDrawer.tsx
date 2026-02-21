'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice, cloudinaryUrl } from '@/lib/utils';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, total } = useCartStore();
  const sub = subtotal();
  const tot = total();
  const FREE_THRESHOLD = 100000;
  const toFreeShipping = Math.max(0, FREE_THRESHOLD - sub);

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-charcoal-950/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-coffee-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-coffee-600" size={22} />
                <h2 className="font-serif text-xl font-semibold text-charcoal-900">Tu carrito</h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-coffee-50 text-coffee-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Barra de envío gratis */}
            {toFreeShipping > 0 && (
              <div className="px-6 py-3 bg-coffee-50">
                <p className="text-xs text-coffee-700">
                  Agrega <strong>{formatPrice(toFreeShipping)}</strong> más para envío gratis
                </p>
                <div className="mt-1.5 h-1.5 bg-coffee-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-coffee-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (sub / FREE_THRESHOLD) * 100)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={48} className="text-coffee-200" />
                  <div>
                    <p className="font-serif text-lg text-charcoal-700">El carrito está vacío</p>
                    <p className="text-sm text-coffee-500 mt-1">Agrega algunos cafés deliciosos</p>
                  </div>
                  <Link href="/productos" onClick={closeCart} className="btn-primary mt-2">
                    Ver catálogo
                  </Link>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => {
                    const img = item.product.images[0]
                      ? cloudinaryUrl(item.product.images[0], { width: 120, height: 120 })
                      : '/images/placeholder-coffee.jpg';

                    return (
                      <motion.div
                        key={`${item.product.id}-${item.grind}`}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        className="flex gap-4 py-4 border-b border-coffee-50 last:border-0"
                      >
                        {/* Imagen */}
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-coffee-100">
                          <Image src={img} alt={item.product.name} fill className="object-cover" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-sans font-medium text-charcoal-900 text-sm leading-tight line-clamp-2">
                            {item.product.name}
                          </h3>
                          {item.grind && (
                            <p className="text-xs text-coffee-500 mt-0.5 capitalize">{item.grind}</p>
                          )}
                          <p className="text-xs text-coffee-400 mt-0.5">
                            {item.product.weight}g
                          </p>

                          {/* Controles */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2 bg-coffee-50 rounded-full px-1">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 hover:text-coffee-700 text-coffee-500"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="text-sm font-medium w-5 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 hover:text-coffee-700 text-coffee-500"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <span className="font-sans font-semibold text-charcoal-900 text-sm">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>

                        {/* Eliminar */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1 text-coffee-300 hover:text-red-400 transition-colors flex-shrink-0 self-start mt-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Footer con totales */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-coffee-100 bg-coffee-50 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-coffee-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(sub)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-coffee-600">Envío</span>
                  <span className={sub >= FREE_THRESHOLD ? 'text-green-600 font-medium' : ''}>
                    {sub >= FREE_THRESHOLD ? 'GRATIS' : formatPrice(8000)}
                  </span>
                </div>
                <div className="flex justify-between font-sans font-bold text-base border-t border-coffee-200 pt-3">
                  <span>Total</span>
                  <span>{formatPrice(tot)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn-primary w-full text-center mt-2"
                >
                  Ir al checkout
                </Link>
                <Link
                  href="/carrito"
                  onClick={closeCart}
                  className="btn-secondary w-full text-center text-sm"
                >
                  Ver carrito completo
                </Link>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
