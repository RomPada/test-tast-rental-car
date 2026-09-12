import Link from 'next/link';
import { getBrand, getPrice } from '@/lib/api';
import type { Car } from '@/types/car';
import styles from './CarCard.module.css';

function addressParts(address: string) {
  return address
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(-2);
}

export default function CarCard({ car }: { car: Car }) {
  const brand = getBrand(car);
  const [city = '', country = ''] = addressParts(car.address);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        {/* API supplies external image URLs, so a native img avoids hostname coupling. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={car.img} alt={`${brand} ${car.model}`} className={styles.image} />
      </div>
      <div className={styles.titleRow}>
        <h2>{brand} <span>{car.model}</span>, {car.year}</h2>
        <strong>${getPrice(car)}</strong>
      </div>
      <div className={styles.meta}>
        <span>{city}</span><span>{country}</span><span>{car.rentalCompany}</span>
        <span>{car.type}</span><span>{car.mileage.toLocaleString('en-US')} km</span>
      </div>
      <Link
        className={styles.more}
        href={`/catalog/${car.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read more
      </Link>
    </article>
  );
}
