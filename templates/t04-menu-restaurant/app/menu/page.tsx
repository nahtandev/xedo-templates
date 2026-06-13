import { getCollections, getProducts } from '@/lib/catalog';
import { MenuBrowser } from '@/components/MenuBrowser';

export const dynamic = 'force-dynamic';

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const [collections, products] = await Promise.all([
    getCollections(),
    getProducts(),
  ]);

  return (
    <div>
      <div className="mx-auto max-w-content px-6 pb-1 pt-7">
        <h1 className="mb-1.5 font-heading text-4xl font-extrabold tracking-tight">
          Notre menu
        </h1>
        <p className="m-0 font-body text-lg text-sand-600">
          Composez votre commande — ajoutez vos plats, validez en un clic.
        </p>
      </div>
      <MenuBrowser collections={collections} products={products} initialCategory={cat} />
    </div>
  );
}
