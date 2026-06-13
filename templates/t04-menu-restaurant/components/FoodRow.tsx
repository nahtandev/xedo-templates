'use client';

import { useRouter } from 'next/navigation';
import { PriceDisplay } from '@xedo/ui';
import type { Product } from '@/lib/types';
import { useAddToCart, AddButton } from './AddButton';
import { Icons } from './icons';

/** Horizontal dish card used in the menu sections and dish suggestions. */
export function FoodRow({ dish }: { dish: Product }) {
  const router = useRouter();
  const { state, addToCart } = useAddToCart();
  const open = () => router.push(`/menu/${dish.slug}`);

  return (
    <div className="flex gap-4 rounded-lg border border-sand-200 bg-[#f5f0e8] p-3.5">
      <button onClick={open} className="shrink-0">
        <div className="h-[116px] w-[120px] overflow-hidden rounded-md bg-sand-100 sm:w-[132px]">
          {dish.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={dish.image} alt={dish.name} className="h-full w-full object-cover" />
          ) : (
            <span className="grid h-full w-full place-items-center text-sand-300">
              <Icons.Bowl size={28} />
            </span>
          )}
        </div>
      </button>
      <div className="flex min-w-0 flex-1 flex-col">
        <button onClick={open} className="text-left">
          <h3 className="mb-1 font-body text-base font-semibold leading-snug sm:text-lg">
            {dish.name}
          </h3>
        </button>
        {dish.descriptionText && (
          <p className="line-clamp-2 font-body text-sm leading-snug text-sand-600">
            {dish.descriptionText}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 pt-2.5">
          <PriceDisplay amount={dish.price} currency="XOF" size="md" />
          <AddButton state={state} onClick={() => addToCart(dish)} />
        </div>
      </div>
    </div>
  );
}
