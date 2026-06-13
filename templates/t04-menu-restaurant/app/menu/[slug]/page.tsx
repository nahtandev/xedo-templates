import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/catalog';
import { DishDetail } from '@/components/DishDetail';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dish = await getProductBySlug(slug);
  if (!dish) return { title: 'Plat introuvable' };
  return {
    title: `${dish.name} | Menu`,
    description: dish.descriptionText || dish.name,
  };
}

export default async function DishPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dish = await getProductBySlug(slug);
  if (!dish) notFound();

  // Suggestions from the same category, excluding the current dish.
  const sameCategory = await getProducts({ collection: dish.collectionSlug, perPage: 4 });
  const related = sameCategory.filter((d) => d.id !== dish.id).slice(0, 3);

  return <DishDetail dish={dish} related={related} />;
}
