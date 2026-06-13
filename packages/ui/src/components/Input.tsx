'use client';

import React from 'react';
import { cn } from '../lib/cn';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  leftIcon?: React.ReactNode;
  /** className applied to the outer wrapper. */
  className?: string;
}

/** Text input with label, hint and error state. Ochre focus ring. */
export function Input({
  label,
  hint,
  error,
  id,
  type = 'text',
  required = false,
  leftIcon,
  className,
  ...rest
}: InputProps) {
  const autoId = React.useId();
  const inputId = id || autoId;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="font-body text-sm font-medium text-sand-900"
        >
          {label}
          {required && <span className="ml-0.5 text-error">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 inline-flex text-sand-500">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          type={type}
          required={required}
          className={cn(
            'h-11 w-full rounded-md border bg-white font-body text-base text-sand-900 outline-none transition-[border-color,box-shadow] duration-[120ms] ease-std',
            'placeholder:text-sand-400',
            'disabled:bg-sand-100 disabled:cursor-not-allowed',
            leftIcon ? 'pl-[38px] pr-3.5' : 'px-3.5',
            error
              ? 'border-error focus:border-error'
              : 'border-sand-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(232,146,42,0.18)]',
          )}
          {...rest}
        />
      </div>
      {(error || hint) && (
        <span
          className={cn(
            'font-body text-xs',
            error ? 'text-error' : 'text-sand-500',
          )}
        >
          {error || hint}
        </span>
      )}
    </div>
  );
}
