import { z } from 'zod';

const OrderStatusEnum = z.enum([
  'PENDING',
  'CONFIRMED',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
  'REFUNDED',
]);

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().cuid(),
        quantity: z.number().int().positive(),
        grind: z.string().optional(),
      }),
    )
    .min(1, 'El carrito está vacío'),
  addressId: z.string().cuid().optional(),
  // Si no tiene dirección guardada, puede enviar una dirección nueva
  shippingAddress: z
    .object({
      name: z.string().min(2),
      street: z.string().min(5),
      city: z.string().min(2),
      state: z.string().min(2),
      country: z.string().min(2),
      zip: z.string().min(3),
    })
    .optional(),
  notes: z.string().max(500).optional(),
});

export const updateOrderStatusSchema = z.object({
  status: OrderStatusEnum,
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
