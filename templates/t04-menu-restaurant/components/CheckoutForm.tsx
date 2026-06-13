'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input, PhoneInput, Select, Button, PriceDisplay, EmptyState } from '@xedo/ui';
import type { DeliveryAreaView } from '@/lib/catalog';
import { previewCheckout, createCheckout } from '@/lib/actions';
import { useCart, cartSubtotal } from '@/store/cart';
import { formatFcfa, formatAmount } from '@/lib/format';
import { Icons } from './icons';

// SDK delivery types. "Sur place" and "À emporter" are both PICKUP — the chosen
// label is recorded in additionalDetails so the kitchen knows how to serve it.
type Mode = 'DINE_IN' | 'TAKEAWAY' | 'DELIVERY';

const PICKUP_LABEL: Record<'DINE_IN' | 'TAKEAWAY', string> = {
  DINE_IN: 'Sur place',
  TAKEAWAY: 'À emporter',
};

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
  const inc = useCart((s) => s.inc);
  const dec = useCart((s) => s.dec);
  const remove = useCart((s) => s.remove);
  const setLastOrder = useCart((s) => s.setLastOrder);

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const [mode, setMode] = React.useState<Mode>('DINE_IN');
  const [areaId, setAreaId] = React.useState<number | undefined>(areas[0]?.id);
  const [totals, setTotals] = React.useState<Totals | null>(null);
  const [phone, setPhone] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const isDelivery = mode === 'DELIVERY';
  const deliveryType: 'DELIVERY' | 'PICKUP' = isDelivery ? 'DELIVERY' : 'PICKUP';
  const localSubtotal = cartSubtotal(items);
  const lineItems = items.map((it) => ({ id: it.id, qty: it.qty }));

  const modes: { id: Mode; label: string; sub: string; icon: React.ReactNode }[] = [
    { id: 'DINE_IN', label: 'Sur place', sub: 'Servi à table', icon: <Icons.Store size={20} /> },
    { id: 'TAKEAWAY', label: 'À emporter', sub: 'Retrait au comptoir', icon: <Icons.Bag size={20} /> },
    ...(areas.length
      ? [{ id: 'DELIVERY' as Mode, label: 'Livraison', sub: 'À votre adresse', icon: <Icons.Truck size={20} /> }]
      : []),
  ];

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

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 8) {
      setError('Renseignez un numéro WhatsApp valide.');
      return;
    }

    setSubmitting(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const note = String(fd.get('details') ?? '').trim();
    // Prefix the pickup mode so the kitchen sees "sur place" vs "à emporter".
    const additionalDetails = isDelivery
      ? note || undefined
      : [`[${PICKUP_LABEL[mode as 'DINE_IN' | 'TAKEAWAY']}]`, note].filter(Boolean).join(' ');

    const res = await createCheckout({
      firstName: String(fd.get('firstName') ?? ''),
      lastName: String(fd.get('lastName') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: phone.replace(/\s/g, ''),
      deliveryType,
      deliveryAreaId: isDelivery ? areaId : undefined,
      additionalDetails,
      items: lineItems,
    });

    if ('error' in res) {
      setError(res.error);
      setSubmitting(false);
      return;
    }
    setLastOrder(res.publicId);
    window.location.href = res.checkoutUrl;
  }

  if (mounted && items.length === 0) {
    return (
      <section className="mx-auto max-w-narrow px-6 py-16">
        <EmptyState
          icon={<Icons.Cart size={26} />}
          title="Votre commande est vide"
          description="Ajoutez des plats avant de valider."
          action={
            <Button size="sm" onClick={() => router.push('/menu')}>
              Voir le menu
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
    <div className="mx-auto max-w-narrow px-6 pb-24 pt-5">
      <Link
        href="/menu"
        className="mb-3.5 inline-flex items-center gap-2 py-2 font-body text-sm font-medium text-sand-600 hover:text-sand-900"
      >
        <Icons.Back size={16} /> Retour au menu
      </Link>

      <h1 className="mb-6 font-heading text-3xl font-extrabold tracking-tight">
        Valider ma commande
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Récap commande */}
        <Section title="Votre commande">
          <div className="rounded-lg border border-sand-200 bg-[#f5f0e8] px-[18px] py-1.5">
            {items.map((it, i) => (
              <div
                key={it.id}
                className={`flex items-center gap-3.5 py-3.5 ${
                  i < items.length - 1 ? 'border-b border-sand-200' : ''
                }`}
              >
                <div className="h-[52px] w-[52px] shrink-0 overflow-hidden rounded-md bg-sand-100">
                  {it.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={it.image} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-body text-sm font-semibold leading-tight">{it.name}</div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex items-center overflow-hidden rounded-full border border-sand-300 bg-white">
                      <button
                        type="button"
                        onClick={() => dec(it.id)}
                        aria-label="Diminuer"
                        className="grid h-7 w-7 place-items-center text-sand-600 hover:bg-sand-100"
                      >
                        <Icons.Minus size={13} />
                      </button>
                      <span className="w-6 text-center font-accent text-sm font-semibold">
                        {it.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => inc(it.id)}
                        aria-label="Augmenter"
                        className="grid h-7 w-7 place-items-center text-sand-600 hover:bg-sand-100"
                      >
                        <Icons.Plus size={13} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(it.id)}
                      aria-label="Retirer"
                      className="p-1 text-sand-500 hover:text-error"
                    >
                      <Icons.Trash size={14} />
                    </button>
                  </div>
                </div>
                <PriceDisplay amount={it.price * it.qty} currency="XOF" size="sm" />
              </div>
            ))}
          </div>
        </Section>

        {/* Coordonnées */}
        <Section title="Vos coordonnées">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input name="firstName" label="Prénom" placeholder="Koffi" required />
            <Input name="lastName" label="Nom" placeholder="Aïvodji" required />
            <div className="sm:col-span-2">
              <PhoneInput
                value={phone}
                onChange={setPhone}
                label="Numéro WhatsApp"
                hint="Confirmation et suivi de commande par WhatsApp"
                defaultCountry="bj"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <Input
                name="email"
                label="Email"
                type="email"
                placeholder="vous@exemple.com"
                hint="Pour le suivi de commande"
                required
              />
            </div>
          </div>
        </Section>

        {/* Mode */}
        <Section title="Comment souhaitez-vous être servi ?">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {modes.map((m) => {
              const on = mode === m.id;
              return (
                <label
                  key={m.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-md border bg-white px-[18px] py-4 transition-all ${
                    on
                      ? 'border-primary shadow-[0_0_0_3px_rgba(232,146,42,0.12)]'
                      : 'border-sand-200'
                  }`}
                >
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-full ${
                      on ? 'bg-primary text-white' : 'bg-xedo-50 text-primary'
                    }`}
                  >
                    {m.icon}
                  </span>
                  <span>
                    <span className="block font-heading text-base font-bold">{m.label}</span>
                    <span className="block text-xs text-sand-600">{m.sub}</span>
                  </span>
                  <input
                    type="radio"
                    name="mode"
                    checked={on}
                    onChange={() => setMode(m.id)}
                    className="sr-only"
                  />
                </label>
              );
            })}
          </div>

          {isDelivery && (
            <div className="mt-4">
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
            </div>
          )}

          <div className="mt-4">
            <Input
              name="details"
              label="Instructions (optionnel)"
              placeholder="Allergies, piment doux, repère de livraison…"
            />
          </div>
        </Section>

        {/* Total + confirm */}
        <div className="rounded-lg border border-sand-200 bg-white p-5 shadow-card">
          <SummaryRow label="Sous-total" value={displaySubtotal} />
          {isDelivery && (
            <SummaryRow label="Livraison" value={displayDelivery} free={displayDelivery === 0} />
          )}
          <div className="my-3 h-px bg-sand-200" />
          <div className="mb-4.5 flex items-baseline justify-between">
            <span className="font-heading text-xl font-bold">Total à payer</span>
            {displayTotal != null ? (
              <PriceDisplay amount={displayTotal} currency="XOF" size="lg" />
            ) : (
              <span className="font-accent text-sm text-sand-500">Calcul…</span>
            )}
          </div>

          {error && (
            <p className="mb-3 rounded-md bg-error-bg px-3 py-2 text-sm text-error">{error}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={submitting}
            rightIcon={<Icons.Arrow size={18} />}
          >
            {submitting ? 'Redirection…' : 'Confirmer et payer'}
          </Button>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-sand-500">
            <Icons.Shield size={14} /> Paiement sécurisé via Xedo
            {splitPayment ? ' · acompte possible' : ''}
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
