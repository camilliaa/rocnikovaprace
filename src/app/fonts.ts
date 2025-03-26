import { Quicksand, Splash } from 'next/font/google';

export const quicksand = Quicksand({
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-quicksand',
  subsets: ['latin', 'latin-ext'],
});

export const splash = Splash({
  weight: ['400'],
  display: 'swap',
  variable: '--font-splash',
  subsets: ['latin', 'latin-ext'],
});
