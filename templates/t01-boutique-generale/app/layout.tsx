import type { Metadata } from 'next';
import { Suspense } from 'react';
import { fontHeading, fontBody, fontAccent } from '@xedo/ui';
import { config } from '@/xedo.config';
import { getCollections } from '@/lib/catalog';
import type { Collection } from '@/lib/types';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import './globals.css';

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let collections: Collection[] = [];
  try {
    collections = await getCollections();
  } catch {
    // Keep the chrome usable even if the catalogue API is unreachable.
  }

  return (
    <html
      lang="fr"
      className={`${fontHeading.variable} ${fontBody.variable} ${fontAccent.variable}`}
    >
      <body className="flex min-h-screen flex-col font-body">
        <Suspense fallback={<div className="h-[114px] border-b border-sand-200" />}>
          <Header collections={collections} />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
