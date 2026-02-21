'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/lib/api/client';
import { useCartStore } from '@/lib/store/cart';
import { Loader2, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const shippingSchema = z.object({
  name: z.string().min(2, 'Nombre requerido'),
  street: z.string().min(5, 'Dirección requerida'),
  city: z.string().min(2, 'Ciudad requerida'),
  state: z.string().min(2, 'Departamento requerido'),
  country: z.string().min(2, 'País requerido').default('Colombia'),
  zip: z.string().min(3, 'Código postal requerido'),
  notes: z.string().optional(),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

export function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: { country: 'Colombia' },
  });

  const handleShippingSubmit = async (data: ShippingFormData) => {
    setIsLoading(true);
    try {
      // Crear la orden en el backend
      const orderRes = await api.post<{ id: string }>('/orders', {
        items: items.map((i) => ({
          productId: i.product.id,
          quantity: i.quantity,
          grind: i.grind,
        })),
        shippingAddress: data,
        notes: data.notes,
      });

      if (!orderRes.success || !orderRes.data) {
        throw new Error(orderRes.error?.message ?? 'Error creando la orden');
      }

      setOrderId(orderRes.data.id);

      // Crear PaymentIntent con Stripe
      const paymentRes = await api.post<{ clientSecret: string }>('/payments/create-intent', {
        orderId: orderRes.data.id,
      });

      if (!paymentRes.success || !paymentRes.data) {
        throw new Error(paymentRes.error?.message ?? 'Error iniciando el pago');
      }

      setClientSecret(paymentRes.data.clientSecret);
      setStep('payment');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSubmit = async () => {
    if (!stripe || !elements || !clientSecret) return;

    setIsLoading(true);
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/cuenta/ordenes?success=true`,
        },
      });

      if (error) {
        toast.error(error.message ?? 'Error procesando el pago');
      } else {
        clearCart();
        router.push('/cuenta/ordenes?success=true');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Step 1: Dirección */}
      <div className={step === 'payment' ? 'opacity-50 pointer-events-none' : ''}>
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 'shipping' ? 'bg-coffee-700 text-cream-100' : 'bg-green-500 text-white'}`}>
            {step === 'payment' ? '✓' : '1'}
          </div>
          <h2 className="font-serif text-xl font-semibold text-charcoal-900">
            Dirección de envío
          </h2>
        </div>

        <form onSubmit={handleSubmit(handleShippingSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1">
              Nombre completo
            </label>
            <input {...register('name')} className="input" placeholder="Juan García" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1">
              Dirección
            </label>
            <input {...register('street')} className="input" placeholder="Calle 93 # 11-27, Apto 301" />
            {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-1">Ciudad</label>
              <input {...register('city')} className="input" placeholder="Bogotá" />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-1">
                Departamento
              </label>
              <input {...register('state')} className="input" placeholder="Cundinamarca" />
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-1">País</label>
              <input {...register('country')} className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-1">
                Código postal
              </label>
              <input {...register('zip')} className="input" placeholder="110221" />
              {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1">
              Notas adicionales (opcional)
            </label>
            <textarea
              {...register('notes')}
              className="input resize-none"
              rows={2}
              placeholder="Instrucciones de entrega, apartamento, etc."
            />
          </div>

          {step === 'shipping' && (
            <button type="submit" disabled={isLoading} className="btn-primary w-full">
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Procesando...
                </>
              ) : (
                'Continuar al pago'
              )}
            </button>
          )}
        </form>
      </div>

      {/* Step 2: Pago */}
      {step === 'payment' && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-coffee-700 text-cream-100 flex items-center justify-center text-sm font-bold">
              2
            </div>
            <h2 className="font-serif text-xl font-semibold text-charcoal-900">
              Información de pago
            </h2>
          </div>

          <div className="p-4 border border-coffee-200 rounded-xl mb-4">
            <PaymentElement />
          </div>

          <div className="flex items-center gap-2 text-xs text-coffee-500 mb-6">
            <Lock size={14} />
            <span>Pago seguro procesado por Stripe. Nunca almacenamos datos de tarjeta.</span>
          </div>

          <button
            onClick={handlePaymentSubmit}
            disabled={isLoading || !stripe || !elements}
            className="btn-primary w-full"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Procesando pago...
              </>
            ) : (
              <>
                <Lock size={18} />
                Pagar ahora
              </>
            )}
          </button>

          <button
            onClick={() => setStep('shipping')}
            className="btn-ghost w-full mt-2 text-sm"
          >
            ← Volver a dirección
          </button>
        </div>
      )}
    </div>
  );
}
