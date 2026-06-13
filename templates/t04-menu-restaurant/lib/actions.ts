'use server';

import { XedoError } from '@xedo/sdk';
import { xedo } from './xedo';
import { SITE_URL } from './env';
import type { CartItem } from './types';

// Server Actions for the real Xedo checkout flow. The cart itself lives
// client-side (zustand); a Xedo cart is only created at checkout time, and the
// customer is then redirected to the hosted payment page (checkoutUrl).
//
// Note: a restaurant order is fulfilled on-site, so checkout uses deliveryType
// 'PICKUP' by default. The "sur place" / "à emporter" choice (and any kitchen
// note) is passed through additionalDetails. If the merchant has configured
// delivery areas, the form also offers 'DELIVERY' with an areaId.

export interface CheckoutInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  deliveryType: 'DELIVERY' | 'PICKUP';
  deliveryAreaId?: number;
  additionalDetails?: string;
  items: Pick<CartItem, 'id' | 'qty'>[];
}

export interface ActionError {
  error: string;
  /** Stable Xedo error code, when available. */
  code?: string;
}

/** Compute live totals (subtotal + delivery) without persisting anything. */
export async function previewCheckout(input: {
  deliveryType: 'DELIVERY' | 'PICKUP';
  deliveryAreaId?: number;
  items: Pick<CartItem, 'id' | 'qty'>[];
}): Promise<
  | { subtotal: number; deliveryCost: number; total: number }
  | ActionError
> {
  try {
    const res = await xedo.carts.preview({
      items: input.items.map((it) => ({
        publicProductId: it.id,
        quantity: it.qty,
      })),
      delivery:
        input.deliveryType === 'DELIVERY'
          ? { deliveryType: 'DELIVERY', deliveryAreaId: input.deliveryAreaId }
          : { deliveryType: 'PICKUP' },
      paymentMethod: 'external_wallet',
    });
    return {
      subtotal: res.subtotal,
      deliveryCost: res.deliveryCost,
      total: res.total,
    };
  } catch (e) {
    return toActionError(e);
  }
}

/** Create the Xedo cart and return the hosted checkout URL to redirect to. */
export async function createCheckout(
  input: CheckoutInput,
): Promise<{ checkoutUrl: string; publicId: string } | ActionError> {
  try {
    const res = await xedo.carts.createAndPay({
      customer: {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phone: input.phone,
      },
      items: input.items.map((it) => ({
        publicProductId: it.id,
        quantity: it.qty,
      })),
      delivery:
        input.deliveryType === 'DELIVERY'
          ? { deliveryType: 'DELIVERY', deliveryAreaId: input.deliveryAreaId }
          : { deliveryType: 'PICKUP' },
      paymentMethod: 'external_wallet',
      returnUrl: `${SITE_URL}/confirmation`,
      additionalDetails: input.additionalDetails,
    });
    // createAndPay returns either a create or a retry result; both carry
    // checkoutUrl. publicId is only on the create result, so fall back to the
    // payment reference if the retry path was taken.
    const publicId = 'publicId' in res ? res.publicId : res.payment.reference;
    return { checkoutUrl: res.checkoutUrl, publicId };
  } catch (e) {
    return toActionError(e);
  }
}

export interface OrderView {
  publicId: string;
  status: string;
  itemsCount: number;
  total: number;
}

/** Read back a cart/order by publicId for the confirmation screen. */
export async function getOrder(publicId: string): Promise<OrderView | ActionError> {
  try {
    const cart = await xedo.carts.retrieve(publicId);
    return {
      publicId: cart.publicId,
      status: cart.status,
      itemsCount: cart.items.reduce((sum, it) => sum + it.quantity, 0),
      total: cart.totals.total,
    };
  } catch (e) {
    return toActionError(e);
  }
}

function toActionError(e: unknown): ActionError {
  if (e instanceof XedoError) return { error: e.message, code: e.code };
  return { error: 'Une erreur est survenue. Veuillez réessayer.' };
}
