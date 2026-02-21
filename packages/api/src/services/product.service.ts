/**
 * Servicio de productos
 * Lógica de negocio para CRUD de productos
 */

import { prisma } from '@la-sonada/database';
import type { ProductQuery, CreateProductInput, UpdateProductInput } from '../schemas/product.schema.js';

export async function getProducts(query: ProductQuery) {
  const { page, limit, category, origin, roastLevel, minPrice, maxPrice, featured, search } =
    query;

  const where = {
    isActive: true,
    ...(category && { category: { slug: category } }),
    ...(origin && { origin: { contains: origin, mode: 'insensitive' as const } }),
    ...(roastLevel && { roastLevel }),
    ...(featured !== undefined && { featured }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { description: { contains: search, mode: 'insensitive' as const } },
        { origin: { contains: search, mode: 'insensitive' as const } },
      ],
    }),
    ...((minPrice !== undefined || maxPrice !== undefined) && {
      price: {
        ...(minPrice !== undefined && { gte: minPrice }),
        ...(maxPrice !== undefined && { lte: maxPrice }),
      },
    }),
  };

  const [total, products] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      include: { category: { select: { id: true, name: true, slug: true } } },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return {
    products,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug, isActive: true },
    include: { category: { select: { id: true, name: true, slug: true } } },
  });

  if (!product) {
    const error = new Error('Producto no encontrado') as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return product;
}

export async function createProduct(data: CreateProductInput) {
  const existing = await prisma.product.findUnique({ where: { slug: data.slug } });
  if (existing) {
    const error = new Error('El slug ya existe') as Error & { statusCode: number };
    error.statusCode = 409;
    throw error;
  }

  return prisma.product.create({
    data: {
      ...data,
      price: data.price,
      comparePrice: data.comparePrice,
    },
    include: { category: { select: { id: true, name: true, slug: true } } },
  });
}

export async function updateProduct(id: string, data: UpdateProductInput) {
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    const error = new Error('Producto no encontrado') as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return prisma.product.update({ where: { id }, data });
}

export async function deleteProduct(id: string) {
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    const error = new Error('Producto no encontrado') as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }
  // Soft delete
  return prisma.product.update({ where: { id }, data: { isActive: false } });
}
