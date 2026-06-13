'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input, PhoneInput, Select, Button, PriceDisplay, EmptyState } from '@xedo/ui';
import type { DeliveryAreaView } from '@/lib/catalog';
import { previewCheckout, createCheckout } from '@/lib/actions';
import { useCart, cartSubtotal } from '@/store/cart';
import { formatFcfa } from '@/lib/format';
import { Icons } from './icons';

type DeliveryType = 'DELIVERY' | 'PICKUP';

interface Totals {
  subtotal: number;
  deliveryCost: number;
  total: number;
}

export function CheckoutForm({
  areas,
  splitPayment,
}: {
  areas: DeliveryAreaView[];
  splitPayment: boolean;
}) {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const setLastOrder = useCart((s) => s.setLastOrder);

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const [deliveryType, setDeliveryType] = React.useState<DeliveryType>(
    areas.length ? 'DELIVERY' : 'PICKUP',
  );
  const [areaId, setAreaId] = React.useState<number | undefined>(areas[0]?.id);
  const [totals, setTotals] = React.useState<Totals | null>(null);
  const [phone, setPhone] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const localSubtotal = cartSubtotal(items);
  const lineItems = items.map((it) => ({ id: it.id, qty: it.qty }));

  // Live totals from the Xedo preview endpoint (no persistence).
  React.useEffect(() => {
    if (!mounted || items.length === 0) return;
    let active = true;
    previewCheckout({ deliveryType, deliveryAreaId: areaId, items: lineItems }).then(
      (res) => {
        if (!active) return;
        if ('error' in res) setTotals(null);
        else setTotals(res);
      },
    );
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, deliveryType, areaId, JSON.stringify(lineItems)]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (items.length === 0) return;

    // PhoneInput is controlled (no native required); enforce a local number.
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 8) {
      setError('Renseignez un numéro WhatsApp valide.');
      return;
    }

    setSubmitting(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const res = await createCheckout({
      firstName: String(fd.get('firstName') ?? ''),
      lastName: String(fd.get('lastName') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: phone.replace(/\s/g, ''),
      deliveryType,
      deliveryAreaId: deliveryType === 'DELIVERY' ? areaId : undefined,
      additionalDetails: String(fd.get('details') ?? '') || undefined,
      items: lineItems,
    });

    if ('error' in res) {
      setError(res.error);
      setSubmitting(false);
      return;
    }
    // Persist the cart id for /confirmation, then hand off to hosted payment.
    setLastOrder(res.publicId);
    window.location.href = res.checkoutUrl;
  }

  if (mounted && items.length === 0) {
    return (
      <section className="mx-auto max-w-narrow px-6 py-16">
        <EmptyState
          icon={<Icons.Cart size={26} />}
          title="Votre panier est vide"
          description="Ajoutez des articles avant de passer commande."
          action={
            <Button size="sm" onClick={() => router.push('/catalogue')}>
              Voir le catalogue
            </Button>
          }
        />
      </section>
    );
  }

  const displaySubtotal = totals?.subtotal ?? localSubtotal;
  const displayDelivery = totals?.deliveryCost;
  const displayTotal = totals?.total;

  return (
    <div className="mx-auto max-w-content px-6 pb-16 pt-5">
      <Link
        href="/catalogue"
        className="mb-3.5 inline-flex items-center gap-2 py-2 font-body text-sm font-medium text-sand-600 hover:text-sand-900"
      >
        <Icons.Back size={16} /> Continuer mes achats
      </Link>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_380px]"
      >
        {/* Form */}
        <div>
          <h1 className="mb-6 font-heading text-3xl font-extrabold tracking-tight">
            Finaliser la commande
          </h1>

          <Section title="Vos coordonnées">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input name="firstName" label="Prénom" required />
              <Input name="lastName" label="Nom" required />
              <PhoneInput
                value={phone}
                onChange={setPhone}
                label="Numéro WhatsApp"
                hint="Pour vous joindre au sujet de la commande"
                defaultCountry="bj"
                required
              />
              <Input
                name="email"
                label="Email"
                type="email"
                placeholder="vous@exemple.com"
                hint="Pour le suivi de commande"
                required
              />
            </div>
          </Section>

          <Section title="Livraison">
            <div className="mb-4 flex flex-col gap-2.5">
              {(['DELIVERY', 'PICKUP'] as DeliveryType[])
                .filter((t) => (t === 'DELIVERY' ? areas.length > 0 : true))
                .map((t) => {
                  const activeOpt = deliveryType === t;
                  return (
                    <label
                      key={t}
                      className={`flex cursor-pointer items-center gap-3 rounded-md border bg-white px-4 py-3.5 transition-all ${
                        activeOpt
                          ? 'border-primary shadow-[0_0_0_3px_rgba(232,146,42,0.12)]'
                          : 'border-sand-200'
                      }`}
                    >
                      <span
                        className={`grid h-5 w-5 place-items-center rounded-full border-2 ${
                          activeOpt ? 'border-primary' : 'border-sand-300'
                        }`}
                      >
                        {activeOpt && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
                      </span>
                      <input
                        type="radio"
                        name="deliveryType"
                        checked={activeOpt}
                        onChange={() => setDeliveryType(t)}
                        className="sr-only"
                      />
                      <span className="font-heading text-base font-semibold">
                        {t === 'DELIVERY' ? 'Livraison à domicile' : 'Retrait en boutique'}
                      </span>
                    </label>
                  );
                })}
            </div>

            {deliveryType === 'DELIVERY' && (
              <Select
                label="Zone de livraison"
                required
                value={areaId}
                onChange={(e) => setAreaId(Number(e.target.value))}
                options={areas.map((a) => ({
                  value: String(a.id),
                  label: `${a.name} — ${formatFcfa(a.deliveryCost)}`,
                }))}
              />
            )}

            <div className="mt-4">
              <Input name="details" label="Précisions (optionnel)" placeholder="Repère, instructions…" />
            </div>
          </Section>

          <Section title="Paiement">
            <div className="flex items-center gap-2.5 rounded-md border border-sand-200 bg-white px-4 py-3.5 text-sand-700">
              <Icons.Shield size={18} />
              <span className="text-sm font-medium">
                Paiement sécurisé en ligne (mobile money / carte)
                {splitPayment ? ' · acompte possible' : ''}. Vous serez redirigé vers
                la page de paiement.
              </span>
            </div>
          </Section>
        </div>

        {/* Summary */}
        <div className="rounded-lg border border-sand-200 bg-white p-5 shadow-card lg:sticky lg:top-[84px]">
          <h2 className="mb-3.5 font-heading text-lg font-bold">Votre commande</h2>
          <div className="mb-3.5 flex max-h-60 flex-col gap-3 overflow-y-auto">
            {items.map((it) => (
              <div key={it.id} className="flex items-center gap-3">
                <div className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-md bg-sand-100">
                  {it.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={it.image} alt="" className="h-full w-full object-cover" />
                  )}
                  <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-sand-900 font-accent text-[11px] font-bold text-white">
                    {it.qty}
                  </span>
                </div>
                <span className="flex-1 text-sm font-medium leading-tight">{it.name}</span>
                <PriceDisplay amount={it.price * it.qty} currency="XOF" size="sm" />
              </div>
            ))}
          </div>
          <div className="my-3 h-px bg-sand-200" />
          <SummaryRow label="Sous-total" value={displaySubtotal} />
          <SummaryRow
            label="Livraison"
            value={displayDelivery}
            free={displayDelivery === 0}
          />
          <div className="my-3 h-px bg-sand-200" />
          <div className="mb-4.5 flex items-baseline justify-between">
            <span className="font-heading text-xl font-bold">Total</span>
            {displayTotal != null ? (
              <PriceDisplay amount={displayTotal} currency="XOF" size="lg" />
            ) : (
              <span className="font-accent text-sm text-sand-500">Calcul…</span>
            )}
          </div>

          {error && (
            <p className="mb-3 rounded-md bg-error-bg px-3 py-2 text-sm text-error">
              {error}
            </p>
          )}

          <Button type="submit" variant="primary" size="lg" fullWidth disabled={submitting}>
            {submitting ? 'Redirection…' : 'Payer'}
          </Button>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-sand-500">
            <Icons.Shield size={14} /> Paiement sécurisé · Données protégées
          </div>
        </div>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <h2 className="mb-3.5 font-heading text-lg font-bold">{title}</h2>
      {children}
    </div>
  );
}

function SummaryRow({
  label,
  value,
  free,
}: {
  label: string;
  value?: number;
  free?: boolean;
}) {
  return (
    <div className="mb-2 flex items-baseline justify-between">
      <span className="text-sm text-sand-600">{label}</span>
      {value == null ? (
        <span className="text-sm text-sand-400">—</span>
      ) : free ? (
        <span className="font-accent text-sm font-semibold text-success">Offerte</span>
      ) : (
        <PriceDisplay amount={value} currency="XOF" size="sm" />
      )}
    </div>
  );
}
