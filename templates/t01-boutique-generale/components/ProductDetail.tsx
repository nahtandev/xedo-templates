'use client';

import React from 'react';
import Link from 'next/link';
import {
  PriceDisplay,
  Badge,
  CartButton,
  RichText,
  type CartButtonState,
} from '@xedo/ui';
import type { Product } from '@/lib/types';
import { useCart } from '@/store/cart';
import { Icons } from './icons';

export function ProductDetail({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const [qty, setQty] = React.useState(1);
  const [active, setActive] = React.useState(0);
  const [cartState, setCartState] = React.useState<CartButtonState>('idle');

  const gallery = product.gallery.length ? product.gallery : [];

  function handleAdd() {
    if (!product.inStock) return;
    setCartState('loading');
    window.setTimeout(() => {
      add(product, qty);
      setCartState('added');
      window.setTimeout(() => setCartState('idle'), 1400);
    }, 300);
  }

  return (
    <div className="mx-auto max-w-content px-6 pb-16 pt-5">
      <Link
        href="/catalogue"
        className="mb-2 inline-flex items-center gap-2 py-2 font-body text-sm font-medium text-sand-600 hover:text-sand-900"
      >
        <Icons.Back size={16} /> Retour au catalogue
      </Link>

      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-lg border border-sand-200 bg-sand-100">
            {gallery[active] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={gallery[active]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid h-full w-full place-items-center text-sand-400">
                <Icons.Search size={40} />
              </div>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-2.5">
              {gallery.slice(0, 4).map((url, i) => (
                <button
                  key={url}
                  onClick={() => setActive(i)}
                  className={`aspect-square overflow-hidden rounded-md bg-sand-100 ${
                    i === active ? 'border-2 border-primary' : 'border border-sand-200'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt=""
                    className={`h-full w-full object-cover ${i === active ? '' : 'opacity-60'}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <span className="font-heading text-sm font-semibold uppercase tracking-wide text-primary">
            {product.collection}
          </span>
          <h1 className="mb-3 mt-2 font-heading text-4xl font-extrabold leading-tight tracking-tight">
            {product.name}
          </h1>

          <div className="mb-4">
            {product.inStock ? (
              <Badge tone="success" size="sm" dot>
                En stock
              </Badge>
            ) : (
              <Badge tone="error" size="sm" dot>
                Rupture de stock
              </Badge>
            )}
          </div>

          <PriceDisplay amount={product.price} currency="XOF" size="lg" />

          {product.description && (
            <RichText html={product.description} className="mb-6 mt-5 max-w-[520px]" />
          )}

          {/* Qty + add */}
          <div className="mt-6 flex max-w-[460px] items-stretch gap-3">
            <div className="flex items-center overflow-hidden rounded-md border border-sand-300">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                aria-label="Diminuer"
                className="grid h-11 w-11 place-items-center bg-white text-sand-600 hover:bg-sand-100"
              >
                <Icons.Minus size={16} />
              </button>
              <span className="w-10 text-center font-accent text-lg font-bold">
                {qty}
              </span>
              <button
                onClick={() => setQty(qty + 1)}
                aria-label="Augmenter"
                className="grid h-11 w-11 place-items-center bg-white text-sand-600 hover:bg-sand-100"
              >
                <Icons.Plus size={16} />
              </button>
            </div>
            <div className="flex-1">
              <CartButton
                state={cartState}
                size="lg"
                disabled={!product.inStock}
                onClick={handleAdd}
              />
            </div>
          </div>

          {/* Delivery note */}
          <div className="mt-5 flex items-center gap-2.5 rounded-md bg-xedo-50 px-4 py-3 text-xedo-700">
            <Icons.Truck size={18} />
            <span className="text-sm font-medium">
              Livraison calculée selon votre zone à la commande
            </span>
          </div>
        </div>
      </div>

      {/* Detailed product sheet (TipTap rich text from the merchant) */}
      {product.productSheet && (
        <section className="mt-12 border-t border-sand-200 pt-8">
          <h2 className="mb-4 font-heading text-2xl font-bold tracking-tight">
            Fiche produit
          </h2>
          <RichText html={product.productSheet} className="max-w-narrow" />
        </section>
      )}
    </div>
  );
}
