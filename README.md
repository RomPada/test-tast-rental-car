# RentalCar

Frontend application for the GoIT RentalCar test task. The project implements a car-rental catalog based on the provided Figma design and Rental Car API.

## Live project

- Repository: https://github.com/RomPada/test-tast-rental-car
- Deployment: Vercel or Netlify (provide the deployed URL with the final submission)
- Author: RomPada.corp

## Stack

- Next.js + TypeScript + App Router
- TanStack Query (`useInfiniteQuery`)
- Axios
- CSS Modules
- React Icons
- React Hot Toast

## Features

- `/` hero page with **View Catalog** CTA
- `/catalog` with backend filtering by brand, price, and mileage
- filter state stored in URL search params
- server prefetch + TanStack Query hydration for the first catalog page
- **Load more** pagination through `useInfiniteQuery`
- loading, empty, and error states
- `/catalog/[carId]` details page opened from cards in a new browser tab
- rental booking form with validation and POST to `/cars/:carId/booking-requests`
- success/error notifications
- page metadata, canonical URLs, and Open Graph data
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

## Installation and local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Environment

Environment variables are optional for local development because the application contains fallbacks for the task API and localhost.

To configure them explicitly, copy `.env.example` to `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://car-rental-api.goit.study
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For Vercel or Netlify, set `NEXT_PUBLIC_SITE_URL` to the deployed project URL.

## Production checks

Before submission, run:

```bash
npm run format:check
npm run lint
npx tsc --noEmit
npm run build
```

All commands should complete without errors.

## Routes

- `/` — home page
- `/catalog` — catalog, filters, and Load More pagination
- `/catalog/[carId]` — car details and rental booking form

## Project structure

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

Each component has a single implementation in its own folder; legacy duplicate component copies are not included in the final project archive.
