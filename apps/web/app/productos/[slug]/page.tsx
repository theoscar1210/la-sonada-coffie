/**
 * Detalle de producto
 * URL: /productos/[slug]
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api/client';
import { ProductDetail } from '@/components/product/ProductDetail';
import type { Product } from '@/types';

const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://lasonada.co';

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

  const ogImage = product.images[0]
    ? { url: product.images[0], width: 800, height: 800, alt: product.name }
    : undefined;

  return {
    title: `${product.name} — Café del Líbano, Tolima`,
    description: product.shortDesc,
    keywords: [
      product.name,
      'café de especialidad',
      'Líbano Tolima',
      'café colombiano',
      product.origin ?? '',
    ].filter(Boolean),
    alternates: { canonical: `${SITE_URL}/productos/${params.slug}` },
    openGraph: {
      type: 'website',
      title: product.name,
      description: product.shortDesc,
      url: `${SITE_URL}/productos/${params.slug}`,
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.shortDesc,
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDesc,
    image: product.images,
    sku: product.id,
    brand: { '@type': 'Brand', name: 'LA SOÑADA COFFIE' },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/productos/${params.slug}`,
      priceCurrency: 'COP',
      price: product.price,
      availability:
        (product.stock ?? 1) > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'LA SOÑADA COFFIE' },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-coffee-50 pt-20">
        <ProductDetail product={product} />
      </div>
    </>
  );
}
