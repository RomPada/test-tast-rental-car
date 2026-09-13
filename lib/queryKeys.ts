import type { CarFilters } from '@/types/car';

export const carFiltersKey = ['carFilters'] as const;

export const carsKey = (filters: CarFilters) =>
  [
    'cars',
    filters.brand ?? null,
    filters.price ?? null,
    filters.minMileage ?? null,
    filters.maxMileage ?? null,
  ] as const;
