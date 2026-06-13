'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ProductCard, type CartButtonState } from '@xedo/ui';
import type { Product } from '@/lib/types';
import { useCart } from '@/store/cart';

export function ProductCardConnected({ product }: { product: Product }) {
  const router = useRouter();
  const add = useCart((s) => s.add);
  const [cartState, setCartState] = React.useState<CartButtonState>('idle');

  function handleAdd() {
    setCartState('loading');
    window.setTimeout(() => {
      add(product, 1);
      setCartState('added');
      window.setTimeout(() => setCartState('idle'), 1400);
    }, 300);
  }

  return (
    <ProductCard
      name={product.name}
      collection={product.collection}
      image={product.image}
      price={product.price}
      currency="XOF"
      cartState={cartState}
      onAddToCart={handleAdd}
      onClick={() => router.push(`/produits/${product.slug}`)}
    />
  );
}
