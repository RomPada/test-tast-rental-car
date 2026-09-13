'use client';

import { useMemo } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import Button from '@/components/Button/Button';
import CarFiltersForm from '@/components/CarFilters/CarFilters';
import CarList from '@/components/CarList/CarList';
import Container from '@/components/Container/Container';
import EmptyState from '@/components/EmptyState/EmptyState';
import Loader from '@/components/Loader/Loader';
import { fetchCarFilters, fetchCars } from '@/lib/api';
import { CARS_PER_PAGE } from '@/lib/constants';
import { carFiltersKey, carsKey } from '@/lib/queryKeys';
import type { CarFilters } from '@/types/car';
import styles from './Catalog.module.css';

export default function CatalogClient({ filters }: { filters: CarFilters }) {
  const metaQuery = useQuery({ queryKey: carFiltersKey, queryFn: fetchCarFilters });
  const carsQuery = useInfiniteQuery({
    queryKey: carsKey(filters),
    queryFn: ({ pageParam }) => fetchCars(pageParam, filters, CARS_PER_PAGE),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const cars = useMemo(
    () => carsQuery.data?.pages.flatMap((page) => page.cars) ?? [],
    [carsQuery.data],
  );

  if (metaQuery.isError || carsQuery.isError) throw metaQuery.error || carsQuery.error;

  return (
    <main className={styles.main}>
      <Container>
        {metaQuery.data && <CarFiltersForm meta={metaQuery.data} filters={filters} />}

        <section className={styles.results} aria-live="polite">
          {cars.length === 0 && !carsQuery.isPending ? (
            <EmptyState />
          ) : (
            <>
              <div className={styles.listWrap}>
                <CarList cars={cars} />
                {carsQuery.isFetchingNextPage && <Loader overlay />}
              </div>
              {carsQuery.hasNextPage && (
                <div className={styles.more}>
                  <Button
                    variant="outline"
                    type="button"
                    disabled={carsQuery.isFetchingNextPage}
                    onClick={() => carsQuery.fetchNextPage()}
                  >
                    Load more
                  </Button>
                </div>
              )}
            </>
          )}
        </section>
      </Container>
    </main>
  );
}
