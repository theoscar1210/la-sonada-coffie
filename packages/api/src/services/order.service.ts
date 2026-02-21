/**
 * Servicio de órdenes
 * Crea órdenes, calcula totales y gestiona estados
 */

import { prisma } from '@la-sonada/database';
import type { CreateOrderInput, UpdateOrderStatusInput } from '../schemas/order.schema.js';

const SHIPPING_COST = 8000; // COP
const FREE_SHIPPING_THRESHOLD = 100000; // COP

/** Genera número de orden incremental tipo LSC-0001 */
async function generateOrderNumber(): Promise<string> {
  const count = await prisma.order.count();
  return `LSC-${String(count + 1).padStart(4, '0')}`;
}

export async function createOrder(userId: string, input: CreateOrderInput) {
  // Cargar productos y verificar stock
  const productIds = input.items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, isActive: true },
  });

  if (products.length !== productIds.length) {
    const error = new Error('Uno o más productos no están disponibles') as Error & {
      statusCode: number;
    };
    error.statusCode = 400;
    throw error;
  }

  // Verificar stock y calcular subtotal
  let subtotal = 0;
  const orderItems = input.items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) throw new Error('Producto no encontrado');
    if (product.stock < item.quantity) {
      const error = new Error(`Stock insuficiente para ${product.name}`) as Error & {
        statusCode: number;
      };
      error.statusCode = 400;
      throw error;
    }
    const itemSubtotal = Number(product.price) * item.quantity;
    subtotal += itemSubtotal;
    return { productId: item.productId, quantity: item.quantity, grind: item.grind, unitPrice: Number(product.price), subtotal: itemSubtotal };
  });

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shippingCost;
  const orderNumber = await generateOrderNumber();

  // Resolver dirección de envío
  let shippingData: { shippingName: string; shippingStreet: string; shippingCity: string; shippingState: string; shippingCountry: string; shippingZip: string; addressId?: string };

  if (input.addressId) {
    const address = await prisma.address.findFirst({
      where: { id: input.addressId, userId },
    });
    if (!address) {
      const error = new Error('Dirección no encontrada') as Error & { statusCode: number };
      error.statusCode = 404;
      throw error;
    }
    const user = await prisma.user.findUnique({ where: { id: userId } });
    shippingData = {
      addressId: address.id,
      shippingName: user?.name ?? '',
      shippingStreet: address.street,
      shippingCity: address.city,
      shippingState: address.state,
      shippingCountry: address.country,
      shippingZip: address.zip,
    };
  } else if (input.shippingAddress) {
    const addr = input.shippingAddress;
    shippingData = {
      shippingName: addr.name,
      shippingStreet: addr.street,
      shippingCity: addr.city,
      shippingState: addr.state,
      shippingCountry: addr.country,
      shippingZip: addr.zip,
    };
  } else {
    const error = new Error('Se requiere una dirección de envío') as Error & { statusCode: number };
    error.statusCode = 400;
    throw error;
  }

  // Crear orden en transacción
  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        orderNumber,
        userId,
        status: 'PENDING',
        subtotal,
        shippingCost,
        discount: 0,
        total,
        notes: input.notes,
        ...shippingData,
        items: { create: orderItems },
      },
      include: {
        items: { include: { product: { select: { id: true, name: true, images: true } } } },
      },
    });

    // Decrementar stock
    await Promise.all(
      orderItems.map((item) =>
        tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        }),
      ),
    );

    return newOrder;
  });

  return order;
}

export async function getOrders(userId: string, role: string, page = 1, limit = 10) {
  const where = role === 'ADMIN' ? {} : { userId };
  const [total, orders] = await Promise.all([
    prisma.order.count({ where }),
    prisma.order.findMany({
      where,
      include: {
        user: { select: { id: true, email: true, name: true } },
        items: { include: { product: { select: { id: true, name: true, images: true } } } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return { orders, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } };
}

export async function getOrderById(id: string, userId: string, role: string) {
  const where = role === 'ADMIN' ? { id } : { id, userId };
  const order = await prisma.order.findFirst({
    where,
    include: {
      user: { select: { id: true, email: true, name: true } },
      items: { include: { product: { select: { id: true, name: true, images: true, slug: true } } } },
    },
  });

  if (!order) {
    const error = new Error('Orden no encontrada') as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }
  return order;
}

export async function updateOrderStatus(id: string, input: UpdateOrderStatusInput) {
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) {
    const error = new Error('Orden no encontrada') as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }
  return prisma.order.update({ where: { id }, data: { status: input.status } });
}
