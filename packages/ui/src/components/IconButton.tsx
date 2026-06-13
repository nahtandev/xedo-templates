'use client';

import React from 'react';
import { cn } from '../lib/cn';

export type IconButtonVariant = 'primary' | 'secondary' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  shape?: 'rounded' | 'circle';
}

const SIZES: Record<IconButtonSize, string> = {
  sm: 'w-9 h-9',
  md: 'w-11 h-11',
  lg: 'w-13 h-13',
};

const VARIANTS: Record<IconButtonVariant, string> = {
  primary:
    'bg-primary text-white border border-transparent hover:bg-(--color-primary-hover)',
  secondary: 'bg-white text-sand-900 border border-sand-300 hover:bg-sand-100',
  ghost: 'bg-transparent text-sand-600 border border-transparent hover:bg-xedo-50',
};

/** Square/round icon-only button. Always pass an accessible label. */
export function IconButton({
  children,
  label,
  variant = 'secondary',
  size = 'md',
  shape = 'rounded',
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex items-center justify-center cursor-pointer transition-[background-color] duration-[120ms] ease-std',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        shape === 'circle' ? 'rounded-full' : 'rounded-md',
        SIZES[size],
        VARIANTS[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
