'use client';

import React from 'react';
import { cn } from '../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-11 px-5 text-base gap-2',
  lg: 'h-13 px-7 text-lg gap-2.5',
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white border border-transparent shadow-card hover:bg-(--color-primary-hover) disabled:shadow-none',
  secondary:
    'bg-white text-sand-900 border border-sand-300 hover:bg-sand-100',
  ghost: 'bg-transparent text-primary border border-transparent hover:bg-xedo-50',
  dark: 'bg-sand-900 text-sand-100 border border-transparent hover:bg-sand-800',
};

/** Xedo primary action button. Warm ochre fill with hover/active states. */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  type = 'button',
  leftIcon,
  rightIcon,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md font-heading font-semibold leading-none cursor-pointer transition-[background-color,transform] duration-[120ms] ease-std',
        'active:translate-y-px active:scale-[0.99]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        fullWidth ? 'w-full' : 'w-auto',
        SIZES[size],
        VARIANTS[variant],
        className,
      )}
      {...rest}
    >
      {leftIcon && <span className="inline-flex">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="inline-flex">{rightIcon}</span>}
    </button>
  );
}
