import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/lib/types';

interface CartState {
  items: CartItem[];
  open: boolean;
  /** publicId of the last Xedo cart created at checkout (for /confirmation). */
  lastOrderId: string | null;
  add: (product: Product, qty?: number) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
  setLastOrder: (publicId: string) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      open: false,
      lastOrderId: null,
      add: (product, qty = 1) =>
        set((state) => {
          const found = state.items.find((it) => it.id === product.id);
          if (found) {
            return {
              items: state.items.map((it) =>
                it.id === product.id ? { ...it, qty: it.qty + qty } : it,
              ),
            };
          }
          const item: CartItem = {
            id: product.id,
            slug: product.slug,
            name: product.name,
            collection: product.collection,
            image: product.image,
            price: product.price,
            qty,
          };
          return { items: [...state.items, item] };
        }),
      inc: (id) =>
        set((state) => ({
          items: state.items.map((it) =>
            it.id === id ? { ...it, qty: it.qty + 1 } : it,
          ),
        })),
      dec: (id) =>
        set((state) => ({
          items: state.items.map((it) =>
            it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it,
          ),
        })),
      remove: (id) =>
        set((state) => ({ items: state.items.filter((it) => it.id !== id) })),
      clear: () => set({ items: [] }),
      setOpen: (open) => set({ open }),
      setLastOrder: (publicId) => set({ lastOrderId: publicId, items: [], open: false }),
    }),
    {
      name: 'xedo-t01-cart',
      partialize: (state) => ({ items: state.items, lastOrderId: state.lastOrderId }),
    },
  ),
);

export const cartCount = (items: CartItem[]) =>
  items.reduce((sum, it) => sum + it.qty, 0);

export const cartSubtotal = (items: CartItem[]) =>
  items.reduce((sum, it) => sum + it.price * it.qty, 0);
