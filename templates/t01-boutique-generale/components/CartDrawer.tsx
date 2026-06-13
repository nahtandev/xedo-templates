'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, PriceDisplay, EmptyState, IconButton } from '@xedo/ui';
import { useCart, cartCount, cartSubtotal } from '@/store/cart';
import { Icons } from './icons';

export function CartDrawer() {
  const router = useRouter();
  const { items, open, setOpen, inc, dec, remove } = useCart();

  const subtotal = cartSubtotal(items);
  const count = cartCount(items);

  function goCheckout() {
    setOpen(false);
    router.push('/checkout');
  }

  return (
    <>
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
            Panier{' '}
            <span className="font-accent text-sand-500">({count})</span>
          </h2>
          <IconButton label="Fermer le panier" variant="ghost" onClick={() => setOpen(false)}>
            <Icons.Close />
          </IconButton>
        </div>

        <div className={`flex-1 overflow-y-auto ${items.length ? 'px-5 py-3' : ''}`}>
          {items.length === 0 ? (
            <EmptyState
              icon={<Icons.Cart size={26} />}
              title="Votre panier est vide"
              description="Parcourez le catalogue pour ajouter des articles."
              action={
                <Button size="sm" onClick={() => setOpen(false)}>
                  Voir le catalogue
                </Button>
              }
            />
          ) : (
            items.map((it) => (
              <div
                key={it.id}
                className="flex gap-3.5 border-b border-sand-200 py-3.5"
              >
                <div className="h-[76px] w-[76px] shrink-0 overflow-hidden rounded-md bg-sand-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={it.image}
                    alt={it.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-2">
                    <span className="font-heading text-sm font-semibold leading-tight">
                      {it.name}
                    </span>
                    <button
                      onClick={() => remove(it.id)}
                      aria-label="Retirer"
                      className="shrink-0 text-sand-500 hover:text-error"
                    >
                      <Icons.Trash size={16} />
                    </button>
                  </div>
                  <div className="mb-2 mt-0.5 text-xs text-sand-500">
                    {it.collection}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center overflow-hidden rounded-full border border-sand-300">
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
            <p className="mb-4 text-xs text-sand-500">
              Livraison calculée à l&apos;étape suivante selon votre zone.
            </p>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={goCheckout}
              rightIcon={<Icons.Arrow size={18} />}
            >
              Passer la commande
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}
