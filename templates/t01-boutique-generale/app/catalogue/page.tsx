import { SectionHeading } from '@xedo/ui';
import { getProducts, getCollections } from '@/lib/catalog';
import { ProductGrid } from '@/components/ProductGrid';

export const dynamic = 'force-dynamic';

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: Promise<{ collection?: string; q?: string }>;
}) {
  const { collection, q } = await searchParams;

  const [products, collections] = await Promise.all([
    getProducts({ collection, search: q }),
    getCollections(),
  ]);

  const collectionName = collection
    ? collections.find((c) => c.slug === collection)?.name ?? collection
    : null;

  const title = q
    ? `Résultats pour « ${q} »`
    : collectionName ?? 'Tout le catalogue';
  const subtitle = q
    ? `${products.length} article(s)`
    : 'Notre sélection de produits.';

  return (
    <section className="mx-auto max-w-content px-6 pb-16 pt-6">
      <SectionHeading
        className="mb-6"
        eyebrow="Catalogue"
        title={title}
        subtitle={subtitle}
      />
      <ProductGrid products={products} />
    </section>
  );
}
