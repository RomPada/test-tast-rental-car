export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'https://car-rental-api.goit.study';

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000')
).replace(/\/$/, '');

export const SITE_NAME = 'RentalCar';
export const CARS_PER_PAGE = 12;
export const PRICE_STEP = 10;
export const TOAST_DURATION = 4000;

export const ROUTES = {
  home: '/',
  catalog: '/catalog',
  car: (id: string) => `/catalog/${id}`,
} as const;

export const FILTER_PARAMS = {
  brand: 'brand',
  price: 'price',
  minMileage: 'minMileage',
  maxMileage: 'maxMileage',
} as const;

export const OG_IMAGE = {
  url: '/images/hero.jpg',
  width: 1440,
  height: 700,
  alt: 'RentalCar — find your perfect rental car',
};
