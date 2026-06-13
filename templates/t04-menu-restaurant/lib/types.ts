// View-models for the storefront. Every field is backed by @xedo/sdk —
// see lib/catalog.ts for the mapping from the SDK DTOs. In this template a
// "product" is a dish and a "collection" is a menu category.

export interface Product {
  /** SDK product publicId. */
  id: string;
  slug: string;
  name: string;
  /** Collection (menu category) display name. */
  collection: string;
  /** Collection slug (used for menu filtering). */
  collectionSlug: string;
  price: number;
  image?: string;
  /** Gallery image URLs (cover first), from galleryMedias. */
  gallery: string[];
  /** Short description — TipTap HTML, render with <RichText />. */
  description: string;
  /** Plain-text description (tags stripped) for <meta> / SEO / cards. */
  descriptionText: string;
  /** Detailed product sheet — TipTap HTML, render with <RichText />. */
  productSheet?: string;
  stockQuantity: number;
  inStock: boolean;
}

export interface Collection {
  name: string;
  slug: string;
}

export interface CartItem {
  /** Product publicId — sent as publicProductId at checkout. */
  id: string;
  slug: string;
  name: string;
  collection: string;
  image?: string;
  price: number;
  qty: number;
}
