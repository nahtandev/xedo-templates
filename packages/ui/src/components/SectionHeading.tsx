import React from 'react';
import { cn } from '../lib/cn';

export interface SectionHeadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  eyebrow?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  align?: 'left' | 'center';
}

/** Standardised section title with optional eyebrow, subtitle and trailing action. */
export function SectionHeading({
  title,
  eyebrow,
  subtitle,
  action,
  align = 'left',
  className,
  ...rest
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <div
      className={cn(
        'flex justify-between gap-4',
        centered
          ? 'flex-col items-center text-center'
          : 'flex-row items-end text-left',
        className,
      )}
      {...rest}
    >
      <div className={centered ? 'max-w-[640px]' : undefined}>
        {eyebrow && (
          <div className="mb-2 font-heading text-sm font-bold uppercase tracking-wide text-primary">
            {eyebrow}
          </div>
        )}
        <h2 className="m-0 font-heading text-3xl font-bold tracking-tight text-sand-900">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 mb-0 font-body text-lg text-sand-600">{subtitle}</p>
        )}
      </div>
      {action && !centered && <div className="shrink-0">{action}</div>}
    </div>
  );
}
