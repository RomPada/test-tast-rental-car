import type { Car, CarFilters, CarsPage, RentalPayload } from '@/types/car';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  'https://car-rental-api.goit.global';

const parsePrice = (value: number | string) => {
  if (typeof value === 'number') return value;
  const parsed = Number(String(value).replace(/[^0-9.]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
};

export const getBrand = (car: Car) => car.brand || car.make || '';
export const getPrice = (car: Car) => parsePrice(car.rentalPrice);

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export async function getBrands(): Promise<string[]> {
  const data = await request<unknown>(`${API_URL}/brands`, {
    cache: 'force-cache',
  });

  if (Array.isArray(data)) return data.map(String);
  if (data && typeof data === 'object' && 'brands' in data) {
    const brands = (data as { brands?: unknown }).brands;
    return Array.isArray(brands) ? brands.map(String) : [];
  }
  return [];
}

export async function getCars(
  page: number,
  filters: CarFilters,
  limit = 12,
): Promise<CarsPage> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (filters.brand) params.set('brand', filters.brand);
  if (filters.rentalPrice) params.set('rentalPrice', filters.rentalPrice);
  if (filters.minMileage) params.set('minMileage', filters.minMileage);
  if (filters.maxMileage) params.set('maxMileage', filters.maxMileage);

  const data = await request<unknown>(`${API_URL}/cars?${params.toString()}`, {
    cache: 'no-store',
  });

  // The API used for this task returns an object with cars and pagination data.
  // The array branch keeps the UI resilient if a compatible legacy response is used.
  if (Array.isArray(data)) {
    return {
      cars: data as Car[],
      page,
      limit,
      totalCars: data.length,
      totalPages: data.length < limit ? page : page + 1,
    };
  }

  const result = (data || {}) as Partial<CarsPage> & {
    data?: Car[];
    total?: number;
  };
  const cars = Array.isArray(result.cars)
    ? result.cars
    : Array.isArray(result.data)
      ? result.data
      : [];
  const totalCars = Number(result.totalCars ?? result.total ?? cars.length);
  const totalPages = Number(
    result.totalPages ?? Math.max(1, Math.ceil(totalCars / limit)),
  );

  return {
    cars,
    page: Number(result.page ?? page),
    limit: Number(result.limit ?? limit),
    totalCars,
    totalPages,
  };
}

export async function getCarById(id: string): Promise<Car> {
  return request<Car>(`${API_URL}/cars/${encodeURIComponent(id)}`, {
    cache: 'no-store',
  });
}

export async function createRental(payload: RentalPayload): Promise<void> {
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  // /bookings is the booking endpoint used by the current task API.
  // The 404/405 fallback makes the client compatible with API deployments
  // where the same operation is exposed as /rentals.
  let response = await fetch(`${API_URL}/bookings`, options);
  if (response.status === 404 || response.status === 405) {
    response = await fetch(`${API_URL}/rentals`, options);
  }

  if (!response.ok) {
    throw new Error(`Rental request failed: ${response.status}`);
  }
}
