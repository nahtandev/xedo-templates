import React from 'react';
import { cn } from '../lib/cn';

export type StoreLogoSize = 'sm' | 'md' | 'lg';

export interface StoreLogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  name?: string;
  initial?: string;
  shape?: 'rounded' | 'circle';
  size?: StoreLogoSize;
  /** Override the mark colour (defaults to --color-primary). */
  color?: string;
  showName?: boolean;
}

const SIZES: Record<
  StoreLogoSize,
  { box: string; letter: string; name: string; gap: string; radius: string }
> = {
  sm: { box: 'h-6 w-6', letter: 'text-[13px]', name: 'text-base', gap: 'gap-2', radius: 'rounded-[6px]' },
  md: { box: 'h-8 w-8', letter: 'text-[17px]', name: 'text-xl', gap: 'gap-2.5', radius: 'rounded-md' },
  lg: { box: 'h-11 w-11', letter: 'text-[23px]', name: 'text-3xl', gap: 'gap-3', radius: 'rounded-[11px]' },
};

/**
 * Wordmark logo — geometric mark with the store initial + name.
 * The mark colour follows --color-primary (override per store via `color`).
 */
export function StoreLogo({
  name = 'Ma Boutique',
  initial,
  shape = 'rounded',
  size = 'md',
  color,
  showName = true,
  className,
  ...rest
}: StoreLogoProps) {
  const s = SIZES[size];
  const letter = (initial || name.trim().charAt(0) || 'X').toUpperCase();

  return (
    <span
      className={cn('inline-flex items-center', s.gap, className)}
      {...rest}
    >
      <span
        aria-hidden="true"
        style={{ background: color || 'var(--color-primary)' }}
        className={cn(
          'grid shrink-0 place-items-center font-heading font-extrabold leading-none text-white',
          s.box,
          s.letter,
          shape === 'circle' ? 'rounded-full' : s.radius,
        )}
      >
        {letter}
      </span>
      {showName && (
        <span
          className={cn(
            'whitespace-nowrap font-heading font-bold tracking-tight text-sand-900',
            s.name,
          )}
        >
          {name}
        </span>
      )}
    </span>
  );
}
