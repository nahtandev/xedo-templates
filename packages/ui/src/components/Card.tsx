import React from 'react';
import { cn } from '../lib/cn';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  as?: React.ElementType;
}

const PADS: Record<NonNullable<CardProps['padding']>, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

/** Surface container — white, soft shadow, optional hover lift. */
export function Card({
  children,
  padding = 'md',
  interactive = false,
  as,
  className,
  ...rest
}: CardProps) {
  const Tag = (as || 'div') as React.ElementType;
  return (
    <Tag
      className={cn(
        'rounded-lg border border-sand-200 bg-white shadow-card transition-[box-shadow,transform] duration-200 ease-out',
        interactive && 'hover:-translate-y-0.5 hover:shadow-hover',
        PADS[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
