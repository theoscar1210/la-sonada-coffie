/**
 * Detalle de producto
 * URL: /productos/[slug]
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api/client';
import { ProductDetail } from '@/components/product/ProductDetail';
import type { Product } from '@/types';

interface PageProps {
  params: { slug: string };
}

async function getProduct(slug: string): Promise<Product | null> {
  const res = await api.get<Product>(`/products/${slug}`, { next: { revalidate: 600 } });
  return res.data;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) return { title: 'Producto no encontrado' };

  return {
    title: product.name,
    description: product.shortDesc,
    openGraph: {
      title: product.name,
      description: product.shortDesc,
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-coffee-50 pt-20">
      <ProductDetail product={product} />
    </div>
  );
}
