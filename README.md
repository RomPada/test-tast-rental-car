# RentalCar

Clean final implementation of the GoIT RentalCar task.

## Stack

- Next.js + TypeScript + App Router
- TanStack Query (`useInfiniteQuery`)
- Axios
- CSS Modules
- React Icons
- React Hot Toast

## Features

- `/` hero page with **View Catalog** CTA
- `/catalog` with backend filtering by brand, price and mileage
- filter state stored in URL search params
- server prefetch + TanStack Query hydration for the first catalog page
- **Load more** pagination through `useInfiniteQuery`
- loading, empty and error states
- `/catalog/[carId]` details page opened from cards in a new tab
- rental booking form with validation and POST to `/cars/:carId/booking-requests`
- success/error notifications
- metadata, canonical URLs and Open Graph
- responsive layout in addition to the required desktop version

## API

Default API:

```text
https://car-rental-api.goit.study
```

Endpoints used:

```text
GET  /cars?page=1&perPage=12
GET  /cars/filters
GET  /cars/:id
POST /cars/:id/booking-requests
```

The API URL can optionally be overridden with `NEXT_PUBLIC_API_URL`.

## Start

```bash
npm install
npm run dev
```

Production check:

```bash
npm run lint
npm run build
```

## Environment

`.env` is optional because the task API has a code fallback. If you want explicit environment values, copy `.env.example` to `.env`:

```env
NEXT_PUBLIC_API_URL=https://car-rental-api.goit.study
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For Vercel set `NEXT_PUBLIC_SITE_URL` to your deployed project URL.

## Structure

```text
app/
components/
  BookingForm/
  Button/
  CarCard/
  CarFilters/
  CarInfo/
  CarList/
  Container/
  EmptyState/
  ErrorView/
  Header/
  Loader/
  QueryProvider/
lib/
types/
public/images/
```

There are no duplicate root-level component copies: each component has a single implementation in its own folder.
