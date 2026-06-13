'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { StoreLogo, IconButton } from '@xedo/ui';
import { config } from '@/xedo.config';
import type { Collection } from '@/lib/types';
import { useCart, cartCount } from '@/store/cart';
import { Icons } from './icons';

export function Header({ collections }: { collections: Collection[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setOpen = useCart((s) => s.setOpen);
  const count = useCart((s) => cartCount(s.items));

  // Avoid hydration mismatch on the persisted cart badge.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const [query, setQuery] = React.useState('');
  const activeCollection =
    pathname === '/catalogue'
      ? searchParams.get('collection') ?? 'all'
      : null;

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/catalogue?q=${encodeURIComponent(q)}` : '/catalogue');
  }

  const tabs = [{ name: 'Tout', slug: 'all' }, ...collections];

  // Shared search field — rendered inline in the top row on desktop and as a
  // dedicated full-width row on mobile (where it can't fit beside logo + cart).
  const search = (className: string) => (
    <form onSubmit={submitSearch} className={`relative flex items-center ${className}`}>
      <span className="absolute left-3.5 inline-flex text-sand-500">
        <Icons.Search size={18} />
      </span>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un produit…"
        aria-label="Rechercher un produit"
        className="h-11 w-full rounded-full border border-sand-300 bg-white pl-10 pr-3.5 font-body text-base text-sand-900 outline-none placeholder:text-sand-400 focus:border-accent focus:shadow-[0_0_0_3px_rgba(232,146,42,0.18)]"
      />
    </form>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-sand-200 bg-sand-50/90 backdrop-blur-[8px]">
      <div className="mx-auto max-w-content px-6">
        {/* top row */}
        <div className="flex h-[68px] items-center gap-5">
          <Link href="/" className="shrink-0">
            <StoreLogo name={config.storeName} size="md" />
          </Link>

          {/* inline search — desktop only */}
          {search('ml-2 hidden max-w-[440px] flex-1 md:flex')}

          <div className="relative ml-auto shrink-0">
            <IconButton
              label="Mon panier"
              variant="secondary"
              shape="circle"
              onClick={() => setOpen(true)}
            >
              <Icons.Cart />
            </IconButton>
            {mounted && count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full border-2 border-sand-50 bg-primary px-1 font-accent text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </div>
        </div>

        {/* search row — mobile only */}
        {search('pb-3 md:hidden')}

        {/* collection nav */}
        {tabs.length > 1 && (
          <nav className="flex h-[46px] items-center gap-1 overflow-x-auto">
            {tabs.map((c) => {
              const active = activeCollection === c.slug;
              const href =
                c.slug === 'all'
                  ? '/catalogue'
                  : `/catalogue?collection=${encodeURIComponent(c.slug)}`;
              return (
                <Link
                  key={c.slug}
                  href={href}
                  className={`shrink-0 rounded-full px-3.5 py-[7px] font-heading text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-xedo-100 text-xedo-700'
                      : 'text-sand-600 hover:bg-sand-100'
                  }`}
                >
                  {c.name}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
