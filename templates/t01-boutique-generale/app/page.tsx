import { SectionHeading, CollectionBadge } from "@xedo/ui";

import { ProductGrid } from "@/components/ProductGrid";
import { NavButton } from "@/components/NavButton";
import { Icons } from "@/components/icons";
import { getProducts } from "@/lib/catalog";

const TRUST = [
  {
    Icon: Icons.Truck,
    title: "Livraison rapide",
    sub: "Selon votre zone de livraison",
  },
  {
    Icon: Icons.Shield,
    title: "Paiement sécurisé",
    sub: "Mobile money / carte en ligne",
  },
  {
    Icon: Icons.Leaf,
    title: "Artisanat local",
    sub: "Producteurs sélectionnés",
  },
];

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const products = await getProducts({ perPage: 8 });

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-content px-6 pb-2 pt-7">
        <div
          className="relative flex min-h-[340px] items-center overflow-hidden rounded-xl bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(33,30,23,0.78) 0%, rgba(33,30,23,0.30) 60%, rgba(33,30,23,0.05) 100%), url(https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=80&auto=format&fit=crop)",
          }}
        >
          <div className="max-w-[560px] px-6 sm:px-12">
            <CollectionBadge variant="onImage">Collection 2026</CollectionBadge>
            <h1 className="mb-3 mt-4 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Livré chez vous,
              <br />
              sans détour
            </h1>
            <p className="mb-6 max-w-[420px] font-body text-base leading-relaxed text-white/90 sm:text-lg">
              Le meilleur de l&apos;artisanat local — mode, beauté et épicerie —
              sélectionné avec soin.
            </p>
            <div className="flex gap-3">
              <NavButton
                href="/catalogue"
                variant="primary"
                size="lg"
                fullWidth
                className="sm:w-auto"
                rightIcon={<Icons.Arrow size={18} />}
              >
                Découvrir le catalogue
              </NavButton>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="mx-auto max-w-content px-6 py-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {TRUST.map(({ Icon, title, sub }) => (
            <div
              key={title}
              className="flex items-center gap-3.5 rounded-lg border border-sand-200 bg-white px-5 py-4"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-xedo-50 text-primary">
                <Icon size={22} />
              </span>
              <div>
                <div className="font-heading text-base font-bold">{title}</div>
                <div className="text-sm text-sand-600">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Catalogue */}
      <section className="mx-auto max-w-content px-6 pb-16 pt-6">
        <SectionHeading
          className="mb-6"
          eyebrow="Catalogue"
          title="Nos produits"
          subtitle="Une sélection renouvelée chaque semaine."
          action={
            <NavButton
              href="/catalogue"
              variant="ghost"
              rightIcon={<Icons.Arrow size={16} />}
            >
              Voir tout
            </NavButton>
          }
        />
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
