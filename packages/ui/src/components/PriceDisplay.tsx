import React from 'react';
import { cn } from '../lib/cn';

export type PriceSize = 'sm' | 'md' | 'lg';

export interface PriceDisplayProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  amount: number;
  compareAt?: number;
  currency?: string;
  locale?: string;
  size?: PriceSize;
}

const NOW: Record<PriceSize, string> = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-3xl',
};
const WAS: Record<PriceSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

function format(value: number, currency: string, locale: string): string {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
      value,
    );
  } catch {
    return `${value} ${currency}`;
  }
}

/** Price in the accent (Outfit) face, with optional struck-through original. */
export function PriceDisplay({
  amount,
  compareAt,
  currency = 'XOF',
  locale = 'fr-FR',
  size = 'md',
  className,
  ...rest
}: PriceDisplayProps) {
  const onSale = typeof compareAt === 'number' && compareAt > amount;
  return (
    <span
      className={cn('inline-flex items-baseline gap-2', className)}
      {...rest}
    >
      <span
        className={cn(
          'font-accent font-bold tracking-tight',
          NOW[size],
          onSale ? 'text-primary' : 'text-sand-900',
        )}
      >
        {format(amount, currency, locale)}
      </span>
      {onSale && (
        <span
          className={cn(
            'font-accent font-medium text-sand-500 line-through',
            WAS[size],
          )}
        >
          {format(compareAt as number, currency, locale)}
        </span>
      )}
    </span>
  );
}
