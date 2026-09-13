import {
  LuCalendar,
  LuCar,
  LuCircleCheck,
  LuFuel,
  LuGauge,
  LuMapPin,
  LuSettings,
} from 'react-icons/lu';
import { formatMileage, formatPrice } from '@/lib/format';
import type { Car } from '@/types/car';
import styles from './CarInfo.module.css';

export default function CarInfo({ car }: { car: Car }) {
  const specs = [
    { label: 'Year', value: String(car.year), Icon: LuCalendar },
    { label: 'Type', value: car.type, Icon: LuCar },
    { label: 'Fuel Consumption', value: String(car.fuelConsumption), Icon: LuFuel },
    { label: 'Engine', value: car.engine, Icon: LuSettings },
    { label: 'Mileage', value: formatMileage(car.mileage), Icon: LuGauge },
  ];

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <div className={styles.heading}>
          <h1>
            {car.brand} {car.model}, {car.year}
          </h1>
          <span>Article: {car.stockNumber}</span>
        </div>
        <p className={styles.location}>
          <LuMapPin aria-hidden="true" />
          {car.location.city}, {car.location.country}
        </p>
        <data className={styles.price} value={car.rentalPrice}>
          {formatPrice(car.rentalPrice)}
        </data>
      </header>

      <p className={styles.description}>{car.description}</p>

      <section className={styles.section}>
        <h2>Rental Conditions:</h2>
        <ul>
          {car.rentalConditions.map((item) => (
            <li key={item}>
              <LuCircleCheck aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Car Specifications:</h2>
        <dl>
          {specs.map(({ label, value, Icon }) => (
            <div className={styles.spec} key={label}>
              <dt>
                <Icon aria-hidden="true" />
                {label}:
              </dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.section}>
        <h2>Features</h2>
        <ul>
          {car.features.map((item) => (
            <li key={item}>
              <LuCircleCheck aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
