'use client';

import React from 'react';
import Link from 'next/link';
import { PriceDisplay, CollectionBadge, Button, RichText } from '@xedo/ui';
import type { Product } from '@/lib/types';
import { useCart } from '@/store/cart';
import { formatAmount } from '@/lib/format';
import { FoodRow } from './FoodRow';
import { Icons } from './icons';

export function DishDetail({
  dish,
  related,
}: {
  dish: Product;
  related: Product[];
}) {
  const add = useCart((s) => s.add);
  const setOpen = useCart((s) => s.setOpen);
  const [qty, setQty] = React.useState(1);

  function handleAdd() {
    add(dish, qty);
    setOpen(true);
  }

  return (
    <div className="mx-auto max-w-content px-6 pb-20 pt-5">
      <Link
        href="/menu"
        className="mb-3 inline-flex items-center gap-2 py-2 font-body text-sm font-medium text-sand-600 hover:text-sand-900"
      >
        <Icons.Back size={16} /> Retour au menu
      </Link>

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-xl border border-sand-200 bg-sand-100">
          {dish.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={dish.image} alt={dish.name} className="h-full w-full object-cover" />
          ) : (
            <span className="grid h-full w-full place-items-center text-sand-300">
              <Icons.Bowl size={44} />
            </span>
          )}
        </div>

        {/* Info */}
        <div>
          <CollectionBadge variant="soft">{dish.collection}</CollectionBadge>
          <h1 className="mb-3.5 mt-3 font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {dish.name}
          </h1>
          <PriceDisplay amount={dish.price} currency="XOF" size="lg" />

          {dish.description ? (
            <div className="my-5 max-w-[480px] font-body text-base leading-relaxed text-sand-600">
              <RichText html={dish.description} />
            </div>
          ) : (
            dish.descriptionText && (
              <p className="my-5 max-w-[480px] font-body text-base leading-relaxed text-sand-600">
                {dish.descriptionText}
              </p>
            )
          )}

          <div className="mb-5 flex max-w-[480px] items-stretch gap-3">
            <div className="flex items-center overflow-hidden rounded-full border border-sand-300 bg-white">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Diminuer"
                className="grid h-[52px] w-12 place-items-center text-sand-600 hover:bg-sand-100"
              >
                <Icons.Minus size={16} />
              </button>
              <span className="w-9 text-center font-accent text-lg font-bold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Augmenter"
                className="grid h-[52px] w-12 place-items-center text-sand-600 hover:bg-sand-100"
              >
                <Icons.Plus size={16} />
              </button>
            </div>
            <div className="flex-1">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                leftIcon={<Icons.Cart size={18} />}
                onClick={handleAdd}
              >
                Ajouter · {formatAmount(dish.price * qty)} FCFA
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-md bg-xedo-50 px-4 py-3 text-xedo-700">
            <Icons.Flame size={18} />
            <span className="text-sm font-medium">
              Préparé minute, dès réception de votre commande.
            </span>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-[18px] font-heading text-2xl font-bold">
            Autres {dish.collection.toLowerCase()}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((d) => (
              <FoodRow key={d.id} dish={d} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
