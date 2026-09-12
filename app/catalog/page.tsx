import type { Metadata } from 'next';
import Catalog from '@/components/Catalog';

export const metadata: Metadata = { title: 'Catalog | RentalCar' };

export default function CatalogPage() {
  return <Catalog />;
}
