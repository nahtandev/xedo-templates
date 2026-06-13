import { getDeliveryAreas, getMarketplace } from '@/lib/catalog';
import { CheckoutForm } from '@/components/CheckoutForm';

export const dynamic = 'force-dynamic';

export default async function CommandePage() {
  const [areas, marketplace] = await Promise.all([
    getDeliveryAreas(),
    getMarketplace(),
  ]);

  return (
    <CheckoutForm areas={areas} splitPayment={marketplace.enableSplitPayment} />
  );
}
