import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Manrope } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import 'modern-normalize/modern-normalize.css';
import './globals.css';
import Header from '@/components/Header/Header';
import EasterEgg from '@/components/EasterEgg/EasterEgg';
import QueryProvider from '@/components/QueryProvider/QueryProvider';
import { OG_IMAGE, SITE_NAME, SITE_URL, TOAST_DURATION } from '@/lib/constants';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: 'Browse, filter and book rental cars with RentalCar.',
  openGraph: {
    title: SITE_NAME,
    description: 'Browse, filter and book rental cars with RentalCar.',
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    images: [OG_IMAGE],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable} data-scroll-behavior="smooth">
      <body>
        <EasterEgg />
        <QueryProvider>
          <Header />
          {children}
          <Toaster position="top-right" toastOptions={{ duration: TOAST_DURATION }} />
        </QueryProvider>
      </body>
    </html>
  );
}
