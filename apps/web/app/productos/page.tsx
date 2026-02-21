/**
 * Catálogo de productos con filtros
 * URL: /productos
 */

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { api } from '@/lib/api/client';
import { ProductCard } from '@/components/ui/ProductCard';
import { FilterSidebar } from '@/components/ui/FilterSidebar';
import type { Product, Category } from '@/types';

export const metadata: Metadata = {
  title: 'Catálogo',
  description: 'Explora nuestra selección de cafés de especialidad. Filtra por origen, tostión y precio.',
};

interface PageProps {
  searchParams: {
    category?: string;
    origin?: string;
    roastLevel?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
    search?: string;
  };
}

async function getProducts(params: PageProps['searchParams']) {
  const query = new URLSearchParams();
  if (params.category) query.set('category', params.category);
  if (params.origin) query.set('origin', params.origin);
  if (params.roastLevel) query.set('roastLevel', params.roastLevel);
  if (params.minPrice) query.set('minPrice', params.minPrice);
  if (params.maxPrice) query.set('maxPrice', params.maxPrice);
  if (params.page) query.set('page', params.page);
  if (params.search) query.set('search', params.search);
  query.set('limit', '12');

  const res = await api.get<{ products: Product[]; pagination: { total: number; totalPages: number } }>(
    `/products?${query.toString()}`,
    { next: { revalidate: 300 } },
  );

  return res.data ?? { products: [], pagination: { total: 0, totalPages: 0 } };
}

async function getCategories(): Promise<Category[]> {
  // Las categorías vienen embebidas en los productos; podríamos tener un endpoint dedicado
  // Por ahora retornamos categorías hardcodeadas
  return [
    { id: '1', name: 'Café de Origen', slug: 'cafe-de-origen' },
    { id: '2', name: 'Blends Especiales', slug: 'blends-especiales' },
    { id: '3', name: 'Kits y Regalos', slug: 'kits-y-regalos' },
  ];
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const [{ products, pagination }, categories] = await Promise.all([
    getProducts(searchParams),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-coffee-50 pt-20">
      {/* Header */}
      <div className="bg-charcoal-950 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-sans uppercase tracking-widest text-coffee-500 mb-2">
            Tienda
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-cream-100">
            Nuestros cafés
          </h1>
          <p className="text-coffee-500 mt-3">
            {pagination.total} productos disponibles
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <Suspense fallback={null}>
              <FilterSidebar categories={categories} />
            </Suspense>
          </div>

          {/* Grid productos */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-serif text-2xl text-coffee-500 mb-2">
                  Sin resultados
                </p>
                <p className="text-coffee-400 text-sm">
                  Prueba con otros filtros
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Paginación simple */}
                {pagination.totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-12">
                    {Array.from({ length: pagination.totalPages }).map((_, i) => {
                      const pageNum = i + 1;
                      const currentPage = Number(searchParams.page ?? 1);
                      const params = new URLSearchParams(
                        Object.entries(searchParams).filter(([, v]) => v !== undefined) as [string, string][],
                      );
                      params.set('page', String(pageNum));
                      return (
                        <a
                          key={pageNum}
                          href={`/productos?${params.toString()}`}
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                            currentPage === pageNum
                              ? 'bg-coffee-700 text-cream-100'
                              : 'bg-white border border-coffee-200 text-coffee-700 hover:border-coffee-400'
                          }`}
                        >
                          {pageNum}
                        </a>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
