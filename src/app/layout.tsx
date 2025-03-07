import './globals.css';
import Header from '@/components/Header/Header';
import './fonts';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata = {
  title: 'Rezotattoo',
  description: 'Oficiální stránka pro tatéra Dí Rezo Daňka. Tetování Znojmo & Brno.',
  keywords: 'tatér, tetování, Znojmo, Brno, Rezotattoo',
  author: 'Rezotattoo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="cs">
        <head>
          <link rel="icon" href="/img/logoW.png" />
          <meta name="theme-color" content="#000000" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          {/* <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&family=Splash&display=swap" rel="stylesheet" /> */}
        </head>
        <body>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}