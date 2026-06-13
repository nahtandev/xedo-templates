import React from 'react';
import { cn } from '../lib/cn';

export type BadgeTone =
  | 'brand'
  | 'neutral'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'solid';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  size?: 'sm' | 'md';
  dot?: boolean;
}

const TONES: Record<BadgeTone, string> = {
  brand: 'bg-xedo-100 text-xedo-600',
  neutral: 'bg-sand-100 text-sand-700',
  success: 'bg-success-bg text-success',
  error: 'bg-error-bg text-error',
  warning: 'bg-warning-bg text-xedo-700',
  info: 'bg-info-bg text-info',
  solid: 'bg-primary text-white',
};

/** Small status / category pill. */
export function Badge({
  children,
  tone = 'brand',
  size = 'md',
  dot = false,
  className,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full font-body font-medium leading-snug',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm',
        TONES[tone],
        className,
      )}
      {...rest}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
