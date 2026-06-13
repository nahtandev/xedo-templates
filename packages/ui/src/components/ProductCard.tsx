'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { PriceDisplay } from './PriceDisplay';
import { CollectionBadge } from './CollectionBadge';
import { CartButton, type CartButtonState } from './CartButton';

export interface ProductCardProps {
  name: string;
  image?: string;
  price: number;
  compareAt?: number;
  currency?: string;
  collection?: string;
  badge?: string;
  showCollection?: boolean;
  wishlisted?: boolean;
  cartState?: CartButtonState;
  onAddToCart?: () => void;
  onToggleWishlist?: () => void;
  onClick?: () => void;
  className?: string;
}

const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={filled ? 'var(--color-primary)' : 'none'}
    stroke={filled ? 'var(--color-primary)' : 'var(--color-sand-700)'}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

/**
 * Product card — image, optional collection + sale badge, name, price, add-to-cart.
 * Composes PriceDisplay, CollectionBadge and CartButton.
 */
export function ProductCard({
  name,
  image,
  price,
  compareAt,
  currency = 'XOF',
  collection,
  badge,
  showCollection = true,
  wishlisted = false,
  cartState = 'idle',
  onAddToCart,
  onToggleWishlist,
  onClick,
  className,
}: ProductCardProps) {
  const onSale = typeof compareAt === 'number' && compareAt > price;
  const discount = onSale
    ? Math.round((1 - price / (compareAt as number)) * 100)
    : 0;

  return (
    <div
      className={cn(
        'group flex flex-col overflow-hidden rounded-lg border border-sand-200 bg-white shadow-card transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-[3px] hover:shadow-hover',
        className,
      )}
    >
      {/* Media */}
      <div
        onClick={onClick}
        className={cn(
          'relative aspect-square overflow-hidden bg-sand-100',
          onClick && 'cursor-pointer',
        )}
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-[320ms] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-sand-400">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}

        {/* Top-left badges */}
        <div className="absolute left-2.5 top-2.5 flex gap-1.5">
          {badge && <CollectionBadge variant="onImage">{badge}</CollectionBadge>}
          {onSale && (
            <span className="rounded-full bg-primary px-2.5 py-[3px] font-accent text-xs font-bold text-white">
              −{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        {onToggleWishlist && (
          <button
            type="button"
            aria-label={wishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist();
            }}
            className="absolute right-2 top-2 grid h-[34px] w-[34px] place-items-center rounded-full bg-white/90 shadow-card backdrop-blur-[4px]"
          >
            <HeartIcon filled={wishlisted} />
          </button>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          {showCollection && collection && (
            <span className="font-heading text-xs font-semibold uppercase tracking-wide text-primary">
              {collection}
            </span>
          )}
          <h3
            onClick={onClick}
            className={cn(
              'm-0 line-clamp-2 font-heading text-base font-semibold leading-5 text-sand-900',
              onClick && 'cursor-pointer',
            )}
          >
            {name}
          </h3>
        </div>
        <PriceDisplay
          amount={price}
          compareAt={compareAt}
          currency={currency}
          size="md"
        />
        <CartButton state={cartState} size="sm" onClick={onAddToCart} />
      </div>
    </div>
  );
}
