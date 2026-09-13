import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import CatalogClient from './CatalogClient';
import { fetchCarFilters, fetchCars } from '@/lib/api';
import { CARS_PER_PAGE, ROUTES, SITE_URL } from '@/lib/constants';
import { parseCarFilters } from '@/lib/filters';
import { getNextCarsPage } from '@/lib/pagination';
import { carFiltersKey, carsKey } from '@/lib/queryKeys';

export const metadata: Metadata = {
  title: 'Catalog',
  description: 'Browse and filter available RentalCar vehicles.',
  alternates: { canonical: `${SITE_URL}${ROUTES.catalog}` },
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function CatalogPage({ searchParams }: Props) {
  const filters = parseCarFilters(await searchParams);
  const client = new QueryClient();

  await Promise.all([
    client.prefetchQuery({ queryKey: carFiltersKey, queryFn: fetchCarFilters }),
    client.prefetchInfiniteQuery({
      queryKey: carsKey(filters),
      queryFn: ({ pageParam }) => fetchCars(pageParam, filters, CARS_PER_PAGE),
      initialPageParam: 1,
      getNextPageParam: getNextCarsPage,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <CatalogClient filters={filters} />
    </HydrationBoundary>
  );
}
