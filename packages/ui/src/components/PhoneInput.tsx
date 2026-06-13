'use client';

import React from 'react';
import { getExampleNumber } from 'libphonenumber-js';
import examples from 'libphonenumber-js/examples.mobile.json';
import { cn } from '../lib/cn';
import { COUNTRIES, getFlagUrl, type Country } from '../lib/countries';
import { detectCountryFromIP } from '../lib/geoip';

const DEFAULT_COUNTRY = 'bj';
const DEFAULT_PLACEHOLDER = '00 00 00 00';

/** Realistic national-format example number for the selected country. */
function getPhonePlaceholder(countryCode: string): string {
  try {
    const example = getExampleNumber(
      countryCode.toUpperCase() as Parameters<typeof getExampleNumber>[0],
      examples as Parameters<typeof getExampleNumber>[1],
    );
    return example ? example.formatNational().replace(/\s/g, '') : DEFAULT_PLACEHOLDER;
  } catch {
    return DEFAULT_PLACEHOLDER;
  }
}

export interface PhoneInputProps {
  /** Full international number (callingCode + local), e.g. "+22996312479". */
  value: string;
  onChange: (full: string) => void;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  /** ISO-2 country to preselect (e.g. "bj"). Falls back to IP detection. */
  defaultCountry?: string;
  placeholder?: string;
  /** className applied to the outer wrapper. */
  className?: string;
}

/**
 * Phone field with country detection (IP) + dial-code picker. Shared across
 * templates and styled to the Xedo design system. Dependency-free: the dial
 * code chooser ships its own country list, no libphonenumber-js / icon lib.
 *
 * Controlled: `value` is the full international number; `onChange` receives the
 * full number on every keystroke or country change. To submit via a native
 * form, mirror `value` into a hidden input or read it from React state.
 */
export function PhoneInput({
  value,
  onChange,
  label,
  hint,
  error,
  required = false,
  defaultCountry,
  placeholder,
  className,
}: PhoneInputProps) {
  const [selected, setSelected] = React.useState<Country | null>(null);
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const containerRef = React.useRef<HTMLDivElement>(null);
  const initializedRef = React.useRef(false);
  const inputId = React.useId();

  // Initialise the selected country from the value, the prop, or IP detection.
  React.useEffect(() => {
    if (initializedRef.current) return;

    const fromValue = value && COUNTRIES.find((c) => value.startsWith(c.callingCode));
    if (fromValue) {
      setSelected(fromValue);
      initializedRef.current = true;
      return;
    }
    if (defaultCountry) {
      const match = COUNTRIES.find((c) => c.code === defaultCountry.toLowerCase());
      if (match) {
        setSelected(match);
        initializedRef.current = true;
        return;
      }
    }
    detectCountryFromIP(DEFAULT_COUNTRY).then((code) => {
      if (initializedRef.current) return;
      setSelected(
        COUNTRIES.find((c) => c.code === code) ??
          COUNTRIES.find((c) => c.code === DEFAULT_COUNTRY) ??
          null,
      );
      initializedRef.current = true;
    });
  }, [value, defaultCountry]);

  // Keep the selected country in sync if the value is (re)filled with a number
  // belonging to a different country (e.g. prefilled from a saved profile).
  React.useEffect(() => {
    if (!value || !selected) return;
    const match = COUNTRIES.find((c) => value.startsWith(c.callingCode));
    if (match && match.code !== selected.code) setSelected(match);
  }, [value, selected]);

  // Close the dropdown on outside click.
  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const localNumber =
    selected && value.startsWith(selected.callingCode)
      ? value.slice(selected.callingCode.length)
      : '';

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.callingCode.includes(q),
    );
  }, [search]);

  const selectCountry = (country: Country) => {
    setSelected(country);
    setOpen(false);
    setSearch('');
    onChange(country.callingCode + localNumber);
  };

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

      <div ref={containerRef} className="relative">
        <div
          className={cn(
            'flex h-11 items-center overflow-hidden rounded-md border bg-white transition-[border-color,box-shadow] duration-[120ms] ease-std',
            error
              ? 'border-error focus-within:border-error'
              : 'border-sand-300 focus-within:border-accent focus-within:shadow-[0_0_0_3px_rgba(232,146,42,0.18)]',
          )}
        >
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={open}
            className="flex h-full shrink-0 items-center gap-1.5 border-r border-sand-200 px-3 font-body text-sm font-semibold text-sand-700"
          >
            {selected ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getFlagUrl(selected.code)}
                  alt={selected.name}
                  className="h-[17px] w-[17px] rounded-full object-cover"
                />
                <span>{selected.callingCode}</span>
              </>
            ) : (
              <span className="text-sand-400">+229</span>
            )}
            <Chevron open={open} />
          </button>

          <input
            id={inputId}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            required={required}
            placeholder={
              placeholder ??
              (selected ? getPhonePlaceholder(selected.code) : DEFAULT_PLACEHOLDER)
            }
            value={localNumber}
            onChange={(e) => {
              const code = selected?.callingCode ?? '+229';
              onChange(code + e.target.value.replace(/[^\d\s]/g, ''));
            }}
            className="h-full flex-1 border-none bg-transparent px-3.5 font-body text-base text-sand-900 outline-none placeholder:text-sand-400"
          />
        </div>

        {open && (
          <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-md border border-sand-200 bg-white shadow-card">
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un pays…"
              className="w-full border-b border-sand-200 px-4 py-3 font-body text-sm outline-none placeholder:text-sand-400"
            />
            <ul role="listbox" className="max-h-60 overflow-auto">
              {filtered.map((country) => (
                <li
                  key={country.code}
                  role="option"
                  aria-selected={selected?.code === country.code}
                  onClick={() => selectCountry(country)}
                  className="flex cursor-pointer items-center gap-2 px-4 py-2 font-body text-sm hover:bg-sand-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getFlagUrl(country.code)}
                    alt={country.name}
                    className="h-4 w-6 rounded object-cover"
                  />
                  <span>{country.name}</span>
                  <span className="ml-auto font-accent text-sand-500">
                    {country.callingCode}
                  </span>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="px-4 py-3 font-body text-sm text-sand-500">
                  Aucun pays trouvé.
                </li>
              )}
            </ul>
          </div>
        )}
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

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('text-sand-400 transition-transform', open && 'rotate-180')}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
