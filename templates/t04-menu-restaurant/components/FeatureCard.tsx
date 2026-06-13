'use client';

import { useRouter } from 'next/navigation';
import { PriceDisplay } from '@xedo/ui';
import type { Product } from '@/lib/types';
import { useAddToCart, AddButton } from './AddButton';
import { Icons } from './icons';

/** Vertical dish card used on the home "À la une" grid. */
export function FeatureCard({ dish }: { dish: Product }) {
  const router = useRouter();
  const { state, addToCart } = useAddToCart();
  const open = () => router.push(`/menu/${dish.slug}`);

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-sand-200 bg-white">
      <button onClick={open} className="relative block aspect-[4/3] overflow-hidden bg-sand-100">
        {dish.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={dish.image} alt={dish.name} className="h-full w-full object-cover" />
        ) : (
          <span className="grid h-full w-full place-items-center text-sand-300">
            <Icons.Bowl size={36} />
          </span>
        )}
      </button>
      <div className="flex flex-1 flex-col p-4 sm:p-[18px]">
        <button onClick={open} className="text-left">
          <h3 className="mb-1.5 font-heading text-lg font-bold leading-tight sm:text-xl">
            {dish.name}
          </h3>
        </button>
        {dish.descriptionText && (
          <p className="mb-4 line-clamp-2 font-body text-sm leading-relaxed text-sand-600">
            {dish.descriptionText}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-3">
          <PriceDisplay amount={dish.price} currency="XOF" size="lg" />
          <AddButton state={state} onClick={() => addToCart(dish)} />
        </div>
      </div>
    </div>
  );
}
