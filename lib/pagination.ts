import type { CarsResponse } from '@/types/car';

export function getNextCarsPage(lastPage: CarsResponse): number | undefined {
  return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined;
}
