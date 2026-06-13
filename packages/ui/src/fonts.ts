import { Plus_Jakarta_Sans, Inter, Outfit } from 'next/font/google';

// Variable names are distinct from the Tailwind --font-* theme tokens so the
// @theme layer can reference them without a self-referential cycle.
export const fontHeading = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const fontBody = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const fontAccent = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});
