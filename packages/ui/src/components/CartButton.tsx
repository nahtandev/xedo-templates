'use client';

import React from 'react';
import { cn } from '../lib/cn';

export type CartButtonState = 'idle' | 'loading' | 'added';

export interface CartButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  state?: CartButtonState;
  label?: string;
  addedLabel?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

type CartButtonSize = NonNullable<CartButtonProps['size']>;

// Like Button, size drives height + horizontal padding + text + gap together —
// otherwise a `sm` button keeps `md` padding/text and the label wraps onto two
// lines on narrow cards (the product grid is 2 columns on mobile).
const SIZES: Record<CartButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-11 px-5 text-base gap-2',
  lg: 'h-13 px-7 text-lg gap-2.5',
};

const ICON_SIZES: Record<CartButtonSize, number> = {
  sm: 16,
  md: 18,
  lg: 20,
};

const CartIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
  </svg>
);

const Spinner = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className="[animation:xedo-spin_0.7s_linear_infinite]"
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const CheckIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

/** Add-to-cart button with loading + added states. */
export function CartButton({
  state = 'idle',
  label = 'Ajouter au panier',
  addedLabel = 'Ajouté',
  size = 'md',
  fullWidth = true,
  className,
  ...rest
}: CartButtonProps) {
  const isAdded = state === 'added';
  const isLoading = state === 'loading';
  const iconSize = ICON_SIZES[size];

  return (
    <button
      type="button"
      disabled={isLoading}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md font-heading font-semibold leading-none text-white shadow-card transition-[background-color] duration-200 ease-std',
        fullWidth ? 'w-full' : 'w-auto',
        SIZES[size],
        isAdded
          ? 'bg-success cursor-pointer'
          : isLoading
            ? 'bg-primary cursor-progress'
            : 'bg-primary cursor-pointer hover:bg-(--color-primary-hover)',
        className,
      )}
      {...rest}
    >
      <span className="inline-flex shrink-0">
        {isLoading ? (
          <Spinner size={iconSize} />
        ) : isAdded ? (
          <CheckIcon size={iconSize} />
        ) : (
          <CartIcon size={iconSize} />
        )}
      </span>
      <span className="truncate">
        {isLoading ? 'Ajout…' : isAdded ? addedLabel : label}
      </span>
    </button>
  );
}
