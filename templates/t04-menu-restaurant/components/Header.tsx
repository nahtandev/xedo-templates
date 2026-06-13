'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { StoreLogo, IconButton } from '@xedo/ui';
import { config } from '@/xedo.config';
import { useCart, cartCount } from '@/store/cart';
import { Icons } from './icons';

const LINKS: { href: string; label: string }[] = [
  { href: '/', label: 'Accueil' },
  { href: '/menu', label: 'Menu' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const setOpen = useCart((s) => s.setOpen);
  const count = useCart((s) => cartCount(s.items));

  // Avoid hydration mismatch on the persisted cart badge.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-sand-200 bg-sand-50/90 backdrop-blur-[8px]">
      <div className="mx-auto flex h-[68px] max-w-content items-center gap-3 px-4 sm:gap-5 sm:px-6">
        <Link href="/" className="shrink-0">
          <StoreLogo name={config.storeName} size="md" />
        </Link>

        <nav className="ml-1 flex flex-1 items-center gap-1 overflow-x-auto sm:ml-3">
          {LINKS.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`shrink-0 rounded-full px-3.5 py-[7px] font-heading text-sm font-semibold transition-colors ${
                  active
                    ? 'bg-xedo-100 text-xedo-700'
                    : 'text-sand-600 hover:bg-sand-100'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative ml-auto shrink-0">
          <IconButton
            label="Ma commande"
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
    </header>
  );
}
