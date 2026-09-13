import { FILTER_PARAMS, PRICE_STEP, ROUTES } from '@/lib/constants';
import type { CarFilters, CarFiltersMeta } from '@/types/car';

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function readNumber(value: string | string[] | undefined): number | undefined {
  const raw = first(value)?.trim();
  if (!raw || !/^\d+$/.test(raw)) return undefined;
  const parsed = Number(raw);
  return Number.isSafeInteger(parsed) ? parsed : undefined;
}

export function parseCarFilters(params: SearchParams): CarFilters {
  const brand = first(params[FILTER_PARAMS.brand])?.trim();
  const price = readNumber(params[FILTER_PARAMS.price]);
  const minMileage = readNumber(params[FILTER_PARAMS.minMileage]);
  const maxMileage = readNumber(params[FILTER_PARAMS.maxMileage]);

  return {
    ...(brand ? { brand } : {}),
    ...(price !== undefined ? { price } : {}),
    ...(minMileage !== undefined ? { minMileage } : {}),
    ...(maxMileage !== undefined ? { maxMileage } : {}),
  };
}

export function buildCatalogHref(filters: CarFilters): string {
  const params = new URLSearchParams();
  if (filters.brand) params.set(FILTER_PARAMS.brand, filters.brand);
  if (filters.price !== undefined) params.set(FILTER_PARAMS.price, String(filters.price));
  if (filters.minMileage !== undefined)
    params.set(FILTER_PARAMS.minMileage, String(filters.minMileage));
  if (filters.maxMileage !== undefined)
    params.set(FILTER_PARAMS.maxMileage, String(filters.maxMileage));

  const query = params.toString();
  return query ? `${ROUTES.catalog}?${query}` : ROUTES.catalog;
}

export function isMileageRangeValid(filters: CarFilters): boolean {
  if (filters.minMileage === undefined || filters.maxMileage === undefined) return true;
  return filters.minMileage <= filters.maxMileage;
}

export function getPriceOptions(meta: CarFiltersMeta): number[] {
  const start = Math.ceil(meta.price.min / PRICE_STEP) * PRICE_STEP;
  const end = Math.floor(meta.price.max / PRICE_STEP) * PRICE_STEP;
  const options: number[] = [];
  for (let price = start; price <= end; price += PRICE_STEP) options.push(price);
  return options;
}
