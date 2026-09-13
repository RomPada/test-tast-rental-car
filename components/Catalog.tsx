'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import CarCard from './CarCard';
import EmptyState from './EmptyState';
import Filters from './Filters';
import Loader from './Loader';
import { getCars } from '@/lib/api';
import type { CarFilters } from '@/types/car';
import styles from './Catalog.module.css';

const EMPTY_FILTERS: CarFilters = {
  brand: '',
  rentalPrice: '',
  minMileage: '',
  maxMileage: '',
};

export default function Catalog() {
  const [filters, setFilters] = useState<CarFilters>(EMPTY_FILTERS);

  const query = useInfiniteQuery({
    queryKey: ['cars', filters],
    queryFn: ({ pageParam }) => getCars(pageParam, filters, 12),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const cars = useMemo(
    () => query.data?.pages.flatMap((page) => page.cars) ?? [],
    [query.data],
  );

  const reset = () => setFilters(EMPTY_FILTERS);

  return (
    <main className={styles.main}>
      <Filters value={filters} onApply={setFilters} />

      {query.isLoading && <Loader />}

      {query.isError && (
        <section className={styles.error} role="alert">
          <h2>Unable to load cars</h2>
          <p>{query.error instanceof Error ? query.error.message : 'Please try again.'}</p>
          <button type="button" onClick={() => query.refetch()}>Try again</button>
        </section>
      )}

      {!query.isLoading && !query.isError && cars.length === 0 && (
        <EmptyState onReset={reset} />
      )}

      {cars.length > 0 && (
        <>
          <section className={styles.grid} aria-label="Available rental cars">
            {cars.map((car) => <CarCard key={car.id} car={car} />)}
          </section>

          {query.hasNextPage && (
            <div className={styles.loadWrap}>
              <button
                className={styles.load}
                type="button"
                disabled={query.isFetchingNextPage}
                onClick={() => query.fetchNextPage()}
              >
                {query.isFetchingNextPage ? 'Loading...' : 'Load more'}
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
