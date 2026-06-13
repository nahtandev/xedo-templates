'use client';

import React from 'react';
import { EmptyState } from '@xedo/ui';
import type { Product, Collection } from '@/lib/types';
import { categoryIcon } from './categoryIcon';
import { FoodRow } from './FoodRow';
import { Icons } from './icons';

export function MenuBrowser({
  collections,
  products,
  initialCategory,
}: {
  collections: Collection[];
  products: Product[];
  initialCategory?: string;
}) {
  const valid = initialCategory && collections.some((c) => c.slug === initialCategory);
  const [active, setActive] = React.useState<string>(valid ? initialCategory! : 'all');

  const tabs = [{ name: 'Tout', slug: 'all' }, ...collections];
  const shown = active === 'all' ? collections : collections.filter((c) => c.slug === active);

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-content px-6 py-16">
        <EmptyState
          icon={<Icons.Bowl size={26} />}
          title="Le menu est vide pour le moment"
          description="Revenez bientôt, les plats arrivent."
        />
      </div>
    );
  }

  return (
    <div>
      {/* Sticky category tabs */}
      <div className="sticky top-[68px] z-30 border-b border-sand-200 bg-sand-50/95 backdrop-blur-[8px]">
        <div className="mx-auto max-w-content px-6">
          <nav className="flex h-[58px] items-center gap-1 overflow-x-auto">
            {tabs.map((t) => {
              const on = active === t.slug;
              return (
                <button
                  key={t.slug}
                  onClick={() => setActive(t.slug)}
                  className={`shrink-0 rounded-full px-[18px] py-2.5 font-heading text-sm font-semibold transition-colors ${
                    on ? 'bg-primary text-white' : 'text-sand-600 hover:bg-sand-100'
                  }`}
                >
                  {t.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Sections per category */}
      <div className="mx-auto max-w-content px-6 pb-24 pt-7">
        {shown.map((col) => {
          const items = products.filter((p) => p.collectionSlug === col.slug);
          if (items.length === 0) return null;
          const Ico = categoryIcon(col.slug);
          return (
            <section key={col.slug} className="mb-11">
              <div className="mb-[18px] flex items-center gap-3">
                <span className="grid h-[38px] w-[38px] place-items-center rounded-full bg-xedo-50 text-primary">
                  <Ico size={19} />
                </span>
                <h2 className="m-0 font-heading text-2xl font-bold">{col.name}</h2>
                <span className="font-accent text-sm text-sand-400">
                  {items.length} {items.length > 1 ? 'plats' : 'plat'}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {items.map((d) => (
                  <FoodRow key={d.id} dish={d} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
