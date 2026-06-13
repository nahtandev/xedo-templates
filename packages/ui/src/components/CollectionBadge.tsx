import React from 'react';
import { cn } from '../lib/cn';

export type CollectionBadgeVariant = 'soft' | 'outline' | 'onImage';

export interface CollectionBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: CollectionBadgeVariant;
}

const VARIANTS: Record<CollectionBadgeVariant, string> = {
  soft: 'bg-xedo-100 text-xedo-600 border-transparent',
  outline: 'bg-transparent text-xedo-700 border-xedo-300',
  onImage: 'bg-white/90 text-sand-900 border-transparent backdrop-blur-[4px]',
};

/** Collection / category tag. A subtle outlined variant of Badge for cards. */
export function CollectionBadge({
  children,
  variant = 'soft',
  className,
  ...rest
}: CollectionBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-[3px] font-heading text-xs font-semibold uppercase tracking-wide',
        VARIANTS[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
