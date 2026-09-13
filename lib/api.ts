import { cache } from 'react';
import axios from 'axios';
import { API_URL, CARS_PER_PAGE } from '@/lib/constants';
import type {
  BookingRequest,
  BookingResponse,
  Car,
  CarFilters,
  CarFiltersMeta,
  CarsResponse,
} from '@/types/car';

const api = axios.create({ baseURL: API_URL });

export async function fetchCars(
  page = 1,
  filters: CarFilters = {},
  perPage = CARS_PER_PAGE,
): Promise<CarsResponse> {
  const params: Record<string, string | number> = { page, perPage };

  if (filters.brand) params.brand = filters.brand;
  if (filters.price !== undefined) params.price = filters.price;
  if (filters.minMileage !== undefined) params.minMileage = filters.minMileage;
  if (filters.maxMileage !== undefined) params.maxMileage = filters.maxMileage;

  const { data } = await api.get<CarsResponse>('/cars', { params });
  return data;
}

export async function fetchCarFilters(): Promise<CarFiltersMeta> {
  const { data } = await api.get<CarFiltersMeta>('/cars/filters');
  return data;
}

async function fetchCarById(id: string): Promise<Car> {
  const { data } = await api.get<Car>(`/cars/${encodeURIComponent(id)}`);
  return data;
}

export const getCarById = cache(fetchCarById);

export function isNotFoundError(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 404;
}

export async function createBooking(
  carId: string,
  booking: BookingRequest,
): Promise<BookingResponse> {
  const { data } = await api.post<BookingResponse>(
    `/cars/${encodeURIComponent(carId)}/booking-requests`,
    booking,
  );
  return data;
}
