import type {
  Product as SdkProduct,
  Collection as SdkCollection,
} from '@xedo/sdk';
import { xedo } from './xedo';
import { config } from '@/xedo.config';
import type { Product, Collection } from './types';

// Server-side data layer. These run only in Server Components / Server Actions
// (lib/xedo.ts reads XEDO_API_KEY at module load). The view-models expose only
// fields the Xedo API actually returns — no demo data, no fabricated fields.

/** Strip HTML tags for plain-text contexts (meta descriptions, alt text, cards). */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function toProduct(p: SdkProduct): Product {
  const gallery = (p.galleryMedias ?? [])
    .filter((m) => m.type === 'image')
    .map((m) => m.publicUrl);
  const image = p.coverUrl ?? gallery[0];
  const inStock = !p.trackStock || p.allowBackorder || p.stockQuantity > 0;
  const description = p.description ?? '';
  return {
    id: p.publicId,
    slug: p.slug,
    name: p.name,
    collection: p.collection.name,
    collectionSlug: p.collection.slug,
    price: p.price,
    image: image ?? undefined,
    gallery: image ? [image, ...gallery.filter((g) => g !== image)] : gallery,
    description,
    descriptionText: stripHtml(description),
    productSheet: p.productSheet || undefined,
    stockQuantity: p.stockQuantity,
    inStock,
  };
}

function toCollection(c: SdkCollection | SdkProduct['collection']): Collection {
  return { name: c.name, slug: c.slug };
}

/** Menu listing, newest first. Optionally filtered by collection (category) slug. */
export async function getProducts(opts?: {
  collection?: string;
  search?: string;
  perPage?: number;
}): Promise<Product[]> {
  const { data } = await xedo.products.list({
    perPage: opts?.perPage ?? 100,
    sort: 'createdAt',
    order: 'desc',
    collection: opts?.collection,
    // The API requires search terms of 3+ characters.
    search: opts?.search && opts.search.length >= 3 ? opts.search : undefined,
  });
  return data.map(toProduct);
}

/**
 * Dishes for the home "À la une" section. Pulls from the configured
 * featuredCollection; if that yields nothing (collection absent/empty), falls
 * back to the most recent dishes so the section is never empty.
 */
export async function getFeaturedProducts(limit = 3): Promise<Product[]> {
  const featured = await getProducts({
    collection: config.featuredCollection,
    perPage: limit,
  });
  if (featured.length > 0) return featured.slice(0, limit);
  const recent = await getProducts({ perPage: limit });
  return recent.slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const p = await xedo.products.retrieveBySlug(slug);
    return toProduct(p);
  } catch {
    return null;
  }
}

export async function getCollections(): Promise<Collection[]> {
  const { data } = await xedo.collections.list({ perPage: 100, sort: 'name' });
  return data.map(toCollection);
}

export interface DeliveryAreaView {
  id: number;
  name: string;
  deliveryCost: number;
}

/** Delivery areas configured by the merchant (enables the "Livraison" option). */
export async function getDeliveryAreas(): Promise<DeliveryAreaView[]> {
  const areas = await xedo.deliveryAreas.list();
  return areas.map((a) => ({ id: a.id, name: a.name, deliveryCost: a.deliveryCost }));
}

export interface PaymentConfig {
  enableSplitPayment: boolean;
}

/** Marketplace payment configuration (which checkout options to surface). */
export async function getMarketplace(): Promise<PaymentConfig> {
  const m = await xedo.marketplace.retrieve();
  return { enableSplitPayment: m.enableSplitPayment };
}
