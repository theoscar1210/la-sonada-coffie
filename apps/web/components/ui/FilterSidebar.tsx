'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { RoastLevelBadge } from './RoastLevelBadge';
import type { Category, RoastLevel } from '@/types';

interface FilterSidebarProps {
  categories: Category[];
}

const ROAST_LEVELS: RoastLevel[] = ['LIGHT', 'MEDIUM_LIGHT', 'MEDIUM', 'MEDIUM_DARK', 'DARK'];
const ORIGINS = ['Colombia', 'Etiopía', 'Guatemala', 'Kenia', 'Brasil', 'Costa Rica'];
const PRICE_RANGES = [
  { label: 'Hasta $30.000', max: 30000 },
  { label: '$30.000 – $45.000', min: 30000, max: 45000 },
  { label: 'Más de $45.000', min: 45000 },
];

export function FilterSidebar({ categories }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      params.delete('page'); // reset page on filter change
      return params.toString();
    },
    [searchParams],
  );

  const setFilter = (key: string, value: string | null) => {
    router.push(`${pathname}?${createQueryString({ [key]: value })}`, { scroll: false });
  };

  const activeCategory = searchParams.get('category');
  const activeRoast = searchParams.get('roastLevel');
  const activeOrigin = searchParams.get('origin');

  const clearAll = () => router.push(pathname);

  const hasFilters = activeCategory || activeRoast || activeOrigin;

  return (
    <aside className="space-y-8">
      {/* Header filtros */}
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-semibold text-charcoal-900">Filtros</h2>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-coffee-600 hover:text-coffee-800 underline underline-offset-2"
          >
            Limpiar todo
          </button>
        )}
      </div>

      {/* Categorías */}
      <div>
        <h3 className="font-sans font-semibold text-sm uppercase tracking-wider text-coffee-600 mb-3">
          Categoría
        </h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setFilter('category', activeCategory === cat.slug ? null : cat.slug)
              }
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activeCategory === cat.slug
                  ? 'bg-coffee-700 text-cream-100 font-medium'
                  : 'text-charcoal-700 hover:bg-coffee-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Nivel de tostión */}
      <div>
        <h3 className="font-sans font-semibold text-sm uppercase tracking-wider text-coffee-600 mb-3">
          Tostión
        </h3>
        <div className="space-y-2">
          {ROAST_LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => setFilter('roastLevel', activeRoast === level ? null : level)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                activeRoast === level ? 'bg-coffee-50 ring-1 ring-coffee-300' : 'hover:bg-coffee-50'
              }`}
            >
              <RoastLevelBadge level={level} showDots={true} className="pointer-events-none" />
            </button>
          ))}
        </div>
      </div>

      {/* Origen */}
      <div>
        <h3 className="font-sans font-semibold text-sm uppercase tracking-wider text-coffee-600 mb-3">
          Origen
        </h3>
        <div className="flex flex-wrap gap-2">
          {ORIGINS.map((origin) => (
            <button
              key={origin}
              onClick={() => setFilter('origin', activeOrigin === origin ? null : origin)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                activeOrigin === origin
                  ? 'bg-coffee-700 text-cream-100 border-coffee-700'
                  : 'border-coffee-200 text-coffee-700 hover:border-coffee-400'
              }`}
            >
              {origin}
            </button>
          ))}
        </div>
      </div>

      {/* Rango de precio */}
      <div>
        <h3 className="font-sans font-semibold text-sm uppercase tracking-wider text-coffee-600 mb-3">
          Precio
        </h3>
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.label}
              onClick={() =>
                router.push(
                  `${pathname}?${createQueryString({
                    minPrice: range.min?.toString() ?? null,
                    maxPrice: range.max?.toString() ?? null,
                  })}`,
                  { scroll: false },
                )
              }
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-charcoal-700 hover:bg-coffee-50 transition-colors"
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
