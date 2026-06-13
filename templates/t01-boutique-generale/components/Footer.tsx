import Link from 'next/link';
import { StoreLogo } from '@xedo/ui';
import { config } from '@/xedo.config';

const COLUMNS = [
  { h: 'Boutique', items: ['Nouveautés', 'Mode', 'Beauté', 'Épicerie'] },
  { h: 'Aide', items: ['Suivi de commande', 'Livraison', 'Retours', 'Contact'] },
  { h: 'À propos', items: ['Notre histoire', 'Artisans', 'CGV'] },
];

export function Footer() {
  return (
    <footer className="mt-10 bg-sand-900 text-sand-100">
      <div className="mx-auto grid max-w-content grid-cols-2 gap-8 px-6 pb-8 pt-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <StoreLogo name={config.storeName} size="md" color="var(--color-xedo-400)" />
          <p className="mt-3.5 max-w-[260px] font-body text-sm leading-relaxed text-sand-400">
            {config.storeTagline} Propulsé par{' '}
            <a
              href="https://xedoapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sand-300 underline-offset-2 hover:text-sand-100 hover:underline"
            >
              Xedo
            </a>
            .
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.h}>
            <div className="mb-3 font-heading text-sm font-bold text-white">
              {col.h}
            </div>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {col.items.map((it) => (
                <li key={it}>
                  <Link
                    href="#"
                    className="font-body text-sm text-sand-400 hover:text-sand-200"
                  >
                    {it}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-sand-800 px-6 py-4.5 text-center font-body text-xs text-sand-500">
        © 2026 {config.storeName} · Template t01 par{' '}
        <a
          href="https://github.com/nahtandev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sand-400 underline-offset-2 hover:text-sand-200 hover:underline"
        >
          @nahtandev
        </a>
      </div>
    </footer>
  );
}
