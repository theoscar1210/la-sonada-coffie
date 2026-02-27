import type { MetadataRoute } from 'next';

const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://lasonada.co';
const API_URL = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:3001/api';

// Slugs de posts del blog (mock — actualizar cuando se conecte Sanity)
const BLOG_SLUGS = [
  'libano-tolima-tierra-de-cafe',
  'fermentacion-anaerobica-libano',
  'honey-process-libano',
  'guia-preparacion-cafe',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL,                      lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE_URL}/productos`,        lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${SITE_URL}/proceso`,          lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/historia`,         lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/blog`,             lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
  ];

  // Páginas de productos dinámicas (desde la API)
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/products?limit=200`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json() as { products: Array<{ slug: string; updatedAt?: string }> };
      productPages = (data.products ?? []).map((p) => ({
        url: `${SITE_URL}/productos/${p.slug}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
    }
  } catch {
    // API no disponible en build time — los productos se excluyen del sitemap
  }

  // Páginas del blog
  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...blogPages];
}
