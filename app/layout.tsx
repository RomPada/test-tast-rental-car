import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Header from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'RentalCar',
  description: 'Car rental application.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
