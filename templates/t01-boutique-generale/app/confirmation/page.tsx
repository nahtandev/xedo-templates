'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@xedo/ui';
import { useCart } from '@/store/cart';
import { getOrder, type OrderView } from '@/lib/actions';
import { formatFcfa } from '@/lib/format';
import { Icons } from '@/components/icons';

const STATUS_LABEL: Record<string, string> = {
  PAYMENT_COMPLETED: 'Paiement confirmé',
  PENDING_PAYMENT: 'Paiement en attente',
  PAYMENT_FAILED: 'Paiement échoué',
  ABANDONED: 'Commande abandonnée',
  DRAFT: 'Brouillon',
};

export default function ConfirmationPage() {
  const router = useRouter();
  const lastOrderId = useCart((s) => s.lastOrderId);
  const clear = useCart((s) => s.clear);

  const [order, setOrder] = React.useState<OrderView | null>(null);
  const [state, setState] = React.useState<'loading' | 'ok' | 'missing'>('loading');

  // The cart is persisted in localStorage and only rehydrates after mount.
  // Wait for that before reading lastOrderId — otherwise the first render sees
  // null and wrongly bounces to the home page (flash then redirect).
  const [hydrated, setHydrated] = React.useState(() => useCart.persist.hasHydrated());
  React.useEffect(() => {
    const unsub = useCart.persist.onFinishHydration(() => setHydrated(true));
    setHydrated(useCart.persist.hasHydrated());
    return unsub;
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    if (!lastOrderId) {
      setState('missing');
      return;
    }
    let active = true;
    getOrder(lastOrderId).then((res) => {
      if (!active) return;
      if ('error' in res) {
        setState('missing');
      } else {
        setOrder(res);
        setState('ok');
        clear();
      }
    });
    return () => {
      active = false;
    };
  }, [hydrated, lastOrderId, clear]);

  // Once hydrated, send users here without an order back to the store.
  React.useEffect(() => {
    if (hydrated && state === 'missing') router.replace('/');
  }, [hydrated, state, router]);

  if (state !== 'ok' || !order) {
    return (
      <section className="grid min-h-[60vh] place-items-center px-6">
        <span className="font-accent text-sand-500">Chargement…</span>
      </section>
    );
  }

  const paid = order.status === 'PAYMENT_COMPLETED';

  return (
    <section className="grid min-h-[60vh] place-items-center px-6 py-12">
      <div className="w-full max-w-narrow text-center">
        <div
          className={`mx-auto mb-6 grid h-[76px] w-[76px] place-items-center rounded-full text-white ${
            paid ? 'bg-success' : 'bg-warning'
          }`}
        >
          <Icons.Check size={38} />
        </div>
        <h1 className="mb-3 font-heading text-4xl font-extrabold tracking-tight">
          {paid ? 'Merci pour votre commande !' : 'Commande enregistrée'}
        </h1>
        <p className="mb-7 font-body text-lg leading-relaxed text-sand-600">
          {paid
            ? `Votre commande de ${order.itemsCount} article(s) est confirmée. Un SMS de suivi vous a été envoyé.`
            : 'Votre commande est enregistrée. Le paiement est en cours de confirmation.'}
        </p>
        <div className="mb-7 inline-flex flex-wrap justify-center gap-9 rounded-lg border border-sand-200 bg-white px-8 py-5 shadow-card">
          <Field label="N° de commande" value={order.publicId} />
          <Field label="Total" value={formatFcfa(order.total)} />
          <Field label="Statut" value={STATUS_LABEL[order.status] ?? order.status} />
        </div>
        <div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push('/')}
            rightIcon={<Icons.Arrow size={18} />}
          >
            Retour à la boutique
          </Button>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-1 text-xs uppercase tracking-wide text-sand-500">{label}</div>
      <div className="font-accent text-lg font-bold text-sand-900">{value}</div>
    </div>
  );
}
