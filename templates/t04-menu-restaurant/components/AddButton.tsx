'use client';

import React from 'react';
import { useCart } from '@/store/cart';
import type { Product } from '@/lib/types';
import { Icons } from './icons';

export type AddState = 'idle' | 'loading' | 'added';

/** Shared add-to-cart behaviour with the brief loading → added → idle feedback. */
export function useAddToCart() {
  const add = useCart((s) => s.add);
  const [state, setState] = React.useState<AddState>('idle');

  const addToCart = React.useCallback(
    (product: Product, qty = 1) => {
      setState('loading');
      window.setTimeout(() => {
        add(product, qty);
        setState('added');
        window.setTimeout(() => setState('idle'), 1300);
      }, 300);
    },
    [add],
  );

  return { state, addToCart };
}

/** Round quick-add button (idle "+", success check). */
export function AddButton({
  state,
  onClick,
  size = 44,
}: {
  state: AddState;
  onClick: () => void;
  size?: number;
}) {
  const added = state === 'added';
  const loading = state === 'loading';
  return (
    <button
      onClick={onClick}
      aria-label="Ajouter à la commande"
      style={{ width: size, height: size }}
      className={`grid shrink-0 place-items-center rounded-full text-white shadow-card transition-all ${
        added ? 'bg-success' : 'bg-primary'
      } ${loading ? 'scale-95' : 'scale-100'}`}
    >
      {added ? <Icons.Check size={20} /> : <Icons.Plus size={20} />}
    </button>
  );
}
