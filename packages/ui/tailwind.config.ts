import type { Config } from 'tailwindcss';
import { colors } from './src/tokens/colors';

const config: Config = {
  content: [],
  theme: {
    extend: {
      colors,
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        accent: ['var(--font-accent)', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(33,30,23,0.08), 0 1px 2px rgba(33,30,23,0.04)',
        hover: '0 4px 12px rgba(33,30,23,0.12)',
        modal: '0 20px 40px rgba(33,30,23,0.16)',
      },
      maxWidth: {
        content: '1200px',
        narrow: '720px',
      },
    },
  },
  plugins: [],
};

export default config;
