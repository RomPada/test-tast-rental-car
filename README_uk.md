# RentalCar

Фронтенд-застосунок для тестового завдання GoIT RentalCar. Проєкт реалізує каталог оренди автомобілів на основі наданого макета Figma та Rental Car API.

## Живий проєкт

- Репозиторій: https://github.com/RomPada/test-tast-rental-car
- Деплой: Vercel або Netlify (додайте URL розгорнутого проєкту перед фінальною здачею)
- Автор: RomPada.corp

## Стек технологій

- Next.js + TypeScript + App Router
- TanStack Query (`useInfiniteQuery`)
- Axios
- CSS Modules
- React Icons
- React Hot Toast

## Можливості

- `/` — головна сторінка з hero-секцією та CTA-кнопкою **View Catalog**
- `/catalog` — каталог з бекенд-фільтрацією за брендом, ціною та пробігом
- стан фільтрів зберігається в URL search params
- server prefetch + hydration TanStack Query для першої сторінки каталогу
- пагінація через кнопку **Load more** з використанням `useInfiniteQuery`
- стани завантаження, порожнього результату та помилки
- `/catalog/[carId]` — сторінка деталей автомобіля, що відкривається з картки в новій вкладці
- форма бронювання оренди з валідацією та POST-запитом на `/cars/:carId/booking-requests`
- повідомлення про успішний або невдалий запит
- метадані сторінок, canonical URL та Open Graph дані
- адаптивна верстка на додачу до обов’язкової desktop-версії

## API

API за замовчуванням:

```text
https://car-rental-api.goit.study
```

Використані endpoints:

```text
GET  /cars?page=1&perPage=12
GET  /cars/filters
GET  /cars/:id
POST /cars/:id/booking-requests
```

За потреби URL API можна перевизначити через `NEXT_PUBLIC_API_URL`.

## Встановлення та локальний запуск

```bash
npm ci
npm run dev
```

Відкрийте `http://localhost:3000`.

## Змінні середовища

Для локальної розробки змінні середовища необов’язкові, оскільки застосунок містить fallback-значення для API тестового завдання та localhost.

Щоб налаштувати їх явно, скопіюйте `.env.example` у `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://car-rental-api.goit.study
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Для Vercel або Netlify встановіть `NEXT_PUBLIC_SITE_URL` відповідно до URL розгорнутого проєкту.

## Перевірки перед production-збіркою

Перед фінальною здачею виконайте:

```bash
npm run format:check
npm run lint
npx tsc --noEmit
npm run build
```

Усі команди мають завершитися без помилок.

## Маршрути

- `/` — головна сторінка
- `/catalog` — каталог, фільтри та пагінація через **Load more**
- `/catalog/[carId]` — деталі автомобіля та форма бронювання оренди

## Структура проєкту

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

Кожен компонент має одну реалізацію у власній папці; застарілі дублікати компонентів не включені у фінальний архів проєкту.

## Автор

[RomPad.Corp](https://github.com/RomPada/test-tast-rental-car)

## P.S.

🥚