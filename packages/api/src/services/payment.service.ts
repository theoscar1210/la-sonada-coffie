/**
 * Servicio de pagos con Stripe
 */

import Stripe from 'stripe';
import { prisma } from '@la-sonada/database';

const stripe = new Stripe(process.env['STRIPE_SECRET_KEY'] ?? '', {
  apiVersion: '2024-04-10',
});

export async function createPaymentIntent(orderId: string, userId: string) {
  const order = await prisma.order.findFirst({
    where: { id: orderId, userId, status: 'PENDING' },
  });

  if (!order) {
    const error = new Error('Orden no encontrada o ya procesada') as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(Number(order.total) * 100), // centavos
    currency: 'cop',
    metadata: {
      orderId: order.id,
      orderNumber: order.orderNumber,
      userId,
    },
  });

  // Guardar el payment intent ID en la orden
  await prisma.order.update({
    where: { id: orderId },
    data: { stripePaymentIntentId: paymentIntent.id },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
    amount: Number(order.total),
  };
}

export async function handleStripeWebhook(payload: Buffer, signature: string) {
  const webhookSecret = process.env['STRIPE_WEBHOOK_SECRET'] ?? '';

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch {
    const error = new Error('Webhook signature inválida') as Error & { statusCode: number };
    error.statusCode = 400;
    throw error;
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const pi = event.data.object as Stripe.PaymentIntent;
      const orderId = pi.metadata['orderId'];
      if (orderId) {
        await prisma.order.update({
          where: { id: orderId },
          data: { status: 'CONFIRMED', paidAt: new Date() },
        });
      }
      break;
    }
    case 'payment_intent.payment_failed': {
      const pi = event.data.object as Stripe.PaymentIntent;
      const orderId = pi.metadata['orderId'];
      if (orderId) {
        await prisma.order.update({
          where: { id: orderId },
          data: { status: 'CANCELLED' },
        });
      }
      break;
    }
    default:
      break;
  }

  return { received: true };
}
