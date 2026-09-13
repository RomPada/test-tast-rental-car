import Image from 'next/image';
import styles from './EmptyState.module.css';

export default function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <section className={styles.empty} aria-labelledby="empty-title">
      <Image src="/no-cars.webp" alt="Car search illustration" width={330} height={330} />
      <h2 id="empty-title">No cars found</h2>
      <p>We couldn&apos;t find any cars that match your current filters. Try changing your search criteria or reset the filters.</p>
      <button type="button" onClick={onReset}>Reset filters</button>
    </section>
  );
}
