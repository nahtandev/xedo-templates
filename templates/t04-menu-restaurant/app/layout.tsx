import type { Metadata } from 'next';
import { fontHeading, fontBody, fontAccent } from '@xedo/ui';
import { config } from '@/xedo.config';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartFab } from '@/components/CartFab';
import './globals.css';

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${fontHeading.variable} ${fontBody.variable} ${fontAccent.variable}`}
    >
      <body className="flex min-h-screen flex-col font-body">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartFab />
      </body>
    </html>
  );
}
