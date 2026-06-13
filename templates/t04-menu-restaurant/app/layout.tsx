import type { Metadata } from 'next';
import { fontHeading, fontBody, fontAccent } from '@xedo/ui';
import { config } from '@/xedo.config';
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
      <body className="font-body">{children}</body>
    </html>
  );
}
