import { EmptyState } from '@xedo/ui';
import type { Product } from '@/lib/types';
import { ProductCardConnected } from './ProductCardConnected';
import { Icons } from './icons';

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <EmptyState
        icon={<Icons.Search size={26} />}
        title="Aucun produit trouvé"
        description="Essayez un autre mot-clé ou parcourez une autre collection."
      />
    );
  }
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCardConnected key={p.id} product={p} />
      ))}
    </div>
  );
}
