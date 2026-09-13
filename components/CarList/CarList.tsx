import CarCard from '@/components/CarCard/CarCard';
import type { Car } from '@/types/car';
import styles from './CarList.module.css';

export default function CarList({ cars }: { cars: Car[] }) {
  return (
    <ul className={styles.list}>
      {cars.map((car, index) => (
        <li key={car.id} className={styles.item}>
          <CarCard car={car} priority={index < 4} />
        </li>
      ))}
    </ul>
  );
}
