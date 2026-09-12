'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import CarCard from './CarCard';
import Filters from './Filters';
import { getCars } from '@/lib/api';
import type { CarFilters } from '@/types/car';
import styles from './Catalog.module.css';

const EMPTY_FILTERS: CarFilters = { brand: '', rentalPrice: '', minMileage: '', maxMileage: '' };

export default function Catalog() {
  const [filters, setFilters] = useState<CarFilters>(EMPTY_FILTERS);
  const query = useQuery({
    queryKey: ['cars', filters],
    queryFn: () => getCars(1, filters, 12),
  });

  return (
    <main className={styles.main}>
      <Filters value={filters} onApply={setFilters} />
      {query.isLoading && <p>Loading cars...</p>}
      {query.isError && <p>Unable to load cars.</p>}
      {query.data && (
        <section className={styles.grid} aria-label="Available rental cars">
          {query.data.cars.map((car) => <CarCard key={car.id} car={car} />)}
        </section>
      )}
    </main>
  );
}
