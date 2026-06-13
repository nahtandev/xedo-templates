import Link from 'next/link';
import { StoreLogo } from '@xedo/ui';
import { config } from '@/xedo.config';

export function Footer() {
  return (
    <footer className="mt-10 bg-sand-900 text-sand-100">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-8 px-6 pb-8 pt-12 sm:grid-cols-[1.7fr_1fr_1fr]">
        <div>
          <StoreLogo name={config.storeName} size="md" color="var(--color-xedo-400)" />
          <p className="mt-3.5 max-w-[280px] font-body text-sm leading-relaxed text-sand-400">
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

        <div>
          <div className="mb-3 font-heading text-sm font-bold text-white">
            Navigation
          </div>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            <li>
              <Link href="/menu" className="font-body text-sm text-sand-400 hover:text-sand-200">
                Menu
              </Link>
            </li>
            <li>
              <Link href="/contact" className="font-body text-sm text-sand-400 hover:text-sand-200">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="mb-3 font-heading text-sm font-bold text-white">
            Nous trouver
          </div>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0 font-body text-sm text-sand-400">
            <li>{config.address}</li>
            <li>{config.phone}</li>
            <li>{config.openingHours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sand-800 px-6 py-4.5 text-center font-body text-xs text-sand-500">
        © 2026 {config.storeName} · Template t04 par{' '}
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
