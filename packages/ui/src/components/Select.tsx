'use client';

import React from 'react';
import { cn } from '../lib/cn';

export type SelectOption = string | { value: string; label: string };

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  options?: SelectOption[];
  placeholder?: string;
  /** className applied to the outer wrapper. */
  className?: string;
}

/** Native select styled to match Xedo inputs, with chevron + label. */
export function Select({
  label,
  hint,
  error,
  id,
  options = [],
  placeholder,
  required = false,
  className,
  ...rest
}: SelectProps) {
  const autoId = React.useId();
  const selectId = id || autoId;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={selectId}
          className="font-body text-sm font-medium text-sand-900"
        >
          {label}
          {required && <span className="ml-0.5 text-error">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        <select
          id={selectId}
          required={required}
          className={cn(
            'h-11 w-full appearance-none rounded-md border bg-white pl-3.5 pr-[38px] font-body text-base text-sand-900 outline-none transition-[border-color,box-shadow] duration-[120ms] ease-std cursor-pointer',
            'disabled:bg-sand-100 disabled:cursor-not-allowed',
            error
              ? 'border-error focus:border-error'
              : 'border-sand-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(232,146,42,0.18)]',
          )}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
        <span className="pointer-events-none absolute right-3.5 text-sand-600">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
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
