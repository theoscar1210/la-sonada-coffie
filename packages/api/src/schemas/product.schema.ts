import { z } from 'zod';

const RoastLevelEnum = z.enum(['LIGHT', 'MEDIUM_LIGHT', 'MEDIUM', 'MEDIUM_DARK', 'DARK']);

export const productQuerySchema = z.object({
  category: z.string().optional(),
  origin: z.string().optional(),
  roastLevel: RoastLevelEnum.optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  featured: z.coerce.boolean().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
  search: z.string().optional(),
});

export const createProductSchema = z.object({
  name: z.string().min(2).max(200),
  slug: z.string().min(2).max(200).regex(/^[a-z0-9-]+$/),
  description: z.string().min(10),
  shortDesc: z.string().min(5).max(500),
  price: z.number().positive(),
  comparePrice: z.number().positive().optional(),
  stock: z.number().int().min(0),
  images: z.array(z.string().url()).min(1),
  categoryId: z.string().cuid(),
  origin: z.string().min(2),
  region: z.string().optional(),
  altitude: z.string().optional(),
  roastLevel: RoastLevelEnum,
  process: z.string().optional(),
  flavorNotes: z.array(z.string()).min(1),
  grindOptions: z.array(z.string()).min(1),
  weight: z.number().int().positive(),
  featured: z.boolean().default(false),
});

export const updateProductSchema = createProductSchema.partial();

export type ProductQuery = z.infer<typeof productQuerySchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
