'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button, PriceDisplay, EmptyState, IconButton } from '@xedo/ui';
import { useCart, cartCount, cartSubtotal } from '@/store/cart';
import { formatAmount } from '@/lib/format';
import { Icons } from './icons';

/**
 * Floating cart button + slide-in order drawer. The drawer is the single cart
 * surface (the header cart button opens it too, via the shared `open` state).
 * The floating button is hidden on the checkout/confirmation routes.
 */
export function CartFab() {
  const router = useRouter();
  const pathname = usePathname();
  const { items, open, setOpen, inc, dec, remove } = useCart();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const subtotal = cartSubtotal(items);
  const count = cartCount(items);
  const hideFab = pathname === '/commande' || pathname === '/confirmation';

  function goCheckout() {
    setOpen(false);
    router.push('/commande');
  }

  return (
    <>
      {/* Floating button */}
      {mounted && !hideFab && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Voir ma commande"
          className={`fixed bottom-5 right-5 z-[45] flex h-[60px] min-w-[60px] items-center rounded-full bg-primary text-white shadow-modal transition-transform hover:scale-[1.03] sm:bottom-6 sm:right-6 ${
            count > 0 ? 'gap-3 pl-[18px] pr-5' : ''
          }`}
        >
          <span className="relative grid h-[60px] w-[60px] shrink-0 place-items-center">
            <Icons.Cart size={24} />
            {count > 0 && (
              <span className="absolute right-2 top-2.5 grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 font-accent text-[11px] font-bold text-primary">
                {count}
              </span>
            )}
          </span>
          {count > 0 && (
            <span className="pr-0.5 font-accent text-lg font-bold">
              {formatAmount(subtotal)} F
            </span>
          )}
        </button>
      )}

      {/* Scrim */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-sand-900/40 transition-opacity duration-200 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Panel */}
      <aside
        className={`fixed inset-y-0 right-0 z-[51] flex w-[min(420px,100vw)] flex-col bg-sand-50 shadow-modal transition-transform duration-[320ms] ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-sand-200 px-5 py-5">
          <h2 className="m-0 font-heading text-xl font-bold">
            Ma commande <span className="font-accent text-sand-500">({count})</span>
          </h2>
          <IconButton label="Fermer" variant="ghost" onClick={() => setOpen(false)}>
            <Icons.Close />
          </IconButton>
        </div>

        <div className={`flex-1 overflow-y-auto ${items.length ? 'px-5 py-3' : ''}`}>
          {items.length === 0 ? (
            <EmptyState
              icon={<Icons.Cart size={26} />}
              title="Votre commande est vide"
              description="Ajoutez des plats depuis le menu."
              action={
                <Button
                  size="sm"
                  onClick={() => {
                    setOpen(false);
                    router.push('/menu');
                  }}
                >
                  Voir le menu
                </Button>
              }
            />
          ) : (
            items.map((it) => (
              <div key={it.id} className="flex gap-3.5 border-b border-sand-200 py-3.5">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-sand-100">
                  {it.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-2">
                    <span className="font-body text-sm font-semibold leading-tight">
                      {it.name}
                    </span>
                    <button
                      onClick={() => remove(it.id)}
                      aria-label="Retirer"
                      className="shrink-0 text-sand-500 hover:text-error"
                    >
                      <Icons.Trash size={15} />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center overflow-hidden rounded-full border border-sand-300 bg-white">
                      <button
                        onClick={() => dec(it.id)}
                        aria-label="Diminuer"
                        className="grid h-[30px] w-[30px] place-items-center text-sand-600 hover:bg-sand-100"
                      >
                        <Icons.Minus size={14} />
                      </button>
                      <span className="w-[26px] text-center font-accent text-sm font-semibold">
                        {it.qty}
                      </span>
                      <button
                        onClick={() => inc(it.id)}
                        aria-label="Augmenter"
                        className="grid h-[30px] w-[30px] place-items-center text-sand-600 hover:bg-sand-100"
                      >
                        <Icons.Plus size={14} />
                      </button>
                    </div>
                    <PriceDisplay amount={it.price * it.qty} currency="XOF" size="sm" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-sand-200 bg-white px-5 py-4.5">
            <div className="mb-3 flex items-baseline justify-between">
              <span className="font-heading text-lg font-bold">Sous-total</span>
              <PriceDisplay amount={subtotal} currency="XOF" size="md" />
            </div>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={goCheckout}
              rightIcon={<Icons.Arrow size={18} />}
            >
              Commander
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}
