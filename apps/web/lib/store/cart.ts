/**
 * Store del carrito con Zustand
 * Persiste en localStorage automáticamente
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, Product } from '@/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (product: Product, quantity?: number, grind?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed (derivados)
  itemCount: () => number;
  subtotal: () => number;
  total: () => number;
}

const SHIPPING_COST = 8000;
const FREE_SHIPPING_THRESHOLD = 100000;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1, grind) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.product.id === product.id && i.grind === grind,
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id && i.grind === grind
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
              isOpen: true,
            };
          }

          return {
            items: [...state.items, { product, quantity, grind }],
            isOpen: true,
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      itemCount: () => get().items.reduce((acc, i) => acc + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((acc, i) => acc + i.product.price * i.quantity, 0),

      total: () => {
        const sub = get().subtotal();
        return sub >= FREE_SHIPPING_THRESHOLD ? sub : sub + SHIPPING_COST;
      },
    }),
    {
      name: 'la-sonada-cart',
      storage: createJSONStorage(() => localStorage),
      // Solo persistir items, no el estado del drawer
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
