import Image from 'next/image';
import Button from '@/components/Button/Button';
import { ROUTES } from '@/lib/constants';
import styles from './EmptyState.module.css';

export default function EmptyState() {
  return (
    <section className={styles.wrapper}>
      <Image src="/images/not-found.png" alt="No cars found" width={413} height={413} />
      <div className={styles.content}>
        <h2>No cars found</h2>
        <p>
          We couldn&apos;t find any cars that match your current filters. Try changing your search
          criteria or reset the filters.
        </p>
      </div>
      <Button variant="outline" href={ROUTES.catalog}>
        Reset filters
      </Button>
    </section>
  );
}
