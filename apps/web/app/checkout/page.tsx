'use client';

/**
 * Checkout con Stripe Elements
 * URL: /checkout
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCartStore } from '@/lib/store/cart';
import { useAuthStore } from '@/lib/store/auth';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

const stripePromise = loadStripe(
  process.env['NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'] ?? '',
);

export default function CheckoutPage() {
  const { items, subtotal, total } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (mounted && items.length === 0) router.replace('/carrito');
  }, [mounted, items.length, router]);

  if (!mounted) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-coffee-50 pt-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="font-serif text-3xl font-bold text-charcoal-900 mb-4">
            Inicia sesión para continuar
          </h1>
          <p className="text-coffee-500 mb-8">
            Necesitas una cuenta para completar tu compra
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/cuenta/login?redirect=/checkout" className="btn-primary text-center">
              Iniciar sesión
            </Link>
            <Link href="/cuenta/registro?redirect=/checkout" className="btn-secondary text-center">
              Crear cuenta
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const sub = subtotal();
  const tot = total();
  const shipping = sub >= 100000 ? 0 : 8000;

  return (
    <div className="min-h-screen bg-coffee-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal-900 mb-6 md:mb-10">Checkout</h1>

        <div className="grid lg:grid-cols-5 gap-6 md:gap-8 items-start">
          {/* Formulario — 3/5 */}
          <div className="lg:col-span-3">
            <Elements
              stripe={stripePromise}
              options={{
                locale: 'es',
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: '#b06325',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    borderRadius: '12px',
                  },
                },
              }}
            >
              <CheckoutForm />
            </Elements>
          </div>

          {/* Resumen — 2/5 */}
          <div className="lg:col-span-2">
            <div className="card p-4 sm:p-6 sticky top-24 sm:top-28">
              <h2 className="font-serif text-xl font-semibold mb-5">Tu pedido</h2>

              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.grind}`} className="flex justify-between text-sm">
                    <span className="text-coffee-700 flex-1 mr-2 truncate">
                      {item.product.name}
                      {item.grind ? ` (${item.grind})` : ''} × {item.quantity}
                    </span>
                    <span className="font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-coffee-100 pt-4 space-y-2">
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
              </div>

              <div className="border-t border-coffee-100 pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(tot)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
