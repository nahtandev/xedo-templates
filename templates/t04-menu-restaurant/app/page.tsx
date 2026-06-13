import Link from 'next/link';
import { SectionHeading } from '@xedo/ui';
import { config } from '@/xedo.config';
import { getFeaturedProducts, getCollections } from '@/lib/catalog';
import { NavButton } from '@/components/NavButton';
import { FeatureCard } from '@/components/FeatureCard';
import { categoryIcon } from '@/components/categoryIcon';
import { Icons } from '@/components/icons';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [featured, collections] = await Promise.all([
    getFeaturedProducts(3),
    getCollections(),
  ]);

  const infos = [
    { Icon: Icons.Clock, title: 'Horaires', lines: config.openingHours.split(' · ') },
    { Icon: Icons.Pin, title: 'Adresse', lines: [config.address] },
    { Icon: Icons.Phone, title: 'Commande & réservation', lines: [config.phone, 'Sur place · À emporter'] },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-content px-4 pb-3 pt-7 sm:px-6">
        <div
          className="relative flex min-h-[420px] items-end overflow-hidden rounded-xl bg-cover bg-center sm:min-h-[460px]"
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(33,30,23,0.86) 0%, rgba(33,30,23,0.34) 48%, rgba(33,30,23,0.18) 100%), url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80&auto=format&fit=crop)',
          }}
        >
          <div className="max-w-[620px] p-7 sm:p-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 font-heading text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-[4px]">
              <Icons.Flame size={14} /> Maquis · feu de bois
            </span>
            <h1 className="mb-3 mt-4 font-heading text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-5xl">
              {config.storeName}
            </h1>
            <p className="mb-6 max-w-[460px] font-body text-base leading-relaxed text-white/90 sm:text-lg">
              {config.storeTagline} Plats préparés minute, à emporter ou sur place.
            </p>
            <div className="flex flex-wrap gap-3">
              <NavButton
                href="/menu"
                variant="primary"
                size="lg"
                fullWidth
                className="sm:w-auto"
                rightIcon={<Icons.Arrow size={18} />}
              >
                Voir le menu
              </NavButton>
            </div>
          </div>
        </div>
      </section>

      {/* À la une */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-content px-6 pb-2 pt-9">
          <SectionHeading
            className="mb-5"
            eyebrow="À la une"
            title="Les plats du moment"
            subtitle="Nos préparations les plus demandées, prêtes à commander."
            action={
              <NavButton href="/menu" variant="ghost" rightIcon={<Icons.Arrow size={16} />}>
                Tout le menu
              </NavButton>
            }
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((d) => (
              <FeatureCard key={d.id} dish={d} />
            ))}
          </div>
        </section>
      )}

      {/* Parcourir le menu */}
      {collections.length > 0 && (
        <section className="mx-auto max-w-content px-6 pb-2 pt-9">
          <SectionHeading className="mb-[18px]" eyebrow="Catégories" title="Parcourir le menu" />
          <div className="flex gap-3 overflow-x-auto pb-1.5">
            {collections.map((c) => {
              const Ico = categoryIcon(c.slug);
              return (
                <Link
                  key={c.slug}
                  href={`/menu?cat=${encodeURIComponent(c.slug)}`}
                  className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-sand-200 bg-white py-3 pl-3.5 pr-5 transition-colors hover:border-primary"
                >
                  <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-xedo-50 text-primary">
                    <Ico size={16} />
                  </span>
                  <span className="font-heading text-sm font-semibold">{c.name}</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Infos pratiques */}
      <section className="mx-auto max-w-content px-6 pb-4 pt-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {infos.map(({ Icon, title, lines }) => (
            <div
              key={title}
              className="flex gap-4 rounded-lg border border-sand-200 bg-white px-6 py-5"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-xedo-50 text-primary">
                <Icon size={22} />
              </span>
              <div>
                <div className="mb-1 font-heading text-base font-bold">{title}</div>
                {lines.map((l, j) => (
                  <div key={j} className="text-sm leading-relaxed text-sand-600">
                    {l}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
