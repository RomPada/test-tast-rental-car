# RentalCar

Фронтенд для сервісу оренди автомобілів, створений на основі наданого макета Figma та API GoIT Rental Car.

## Можливості

- Next.js + TypeScript з App Router
- головна сторінка з hero-секцією та CTA-переходом до `/catalog`
- фільтрація автомобілів на бекенді за брендом, ціною за годину та діапазоном пробігу
- пагінація каталогу за допомогою TanStack Query `useInfiniteQuery` та кнопки **Load more**
- сторінка деталей автомобіля `/catalog/[carId]`, що відкривається з картки в новій вкладці
- форма оренди з валідацією, POST-запитом та повідомленнями про успіх або помилку
- стани завантаження, порожнього результату та помилки запиту
- метадані сторінок і семантична розмітка

## Стек технологій

Next.js, React, TypeScript, TanStack Query, CSS Modules, React Icons.

## Початок роботи

```bash
npm install
cp .env.example .env.local
npm run dev
```

Відкрийте `http://localhost:3000`.

## Змінні середовища

```env
NEXT_PUBLIC_API_URL=https://car-rental-api.goit.global
```

## Перевірка production-збірки

```bash
npm run build
npm start
```

Розгорніть репозиторій на Vercel або Netlify та переконайтеся, що `NEXT_PUBLIC_API_URL` налаштовано у змінних середовища під час деплою.

## Маршрути

- `/` — головна сторінка
- `/catalog` — каталог і фільтри
- `/catalog/[carId]` — деталі автомобіля та форма оренди

## Автор

Студентський проєкт. RomPada.corp
