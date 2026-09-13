import styles from './Loader.module.css';

export default function Loader({ compact = false }: { compact?: boolean }) {
  if (compact) return <span className={styles.compact} aria-label="Loading" />;

  return (
    <div className={styles.overlay} role="status" aria-live="polite">
      <div className={styles.box}>
        <span className={styles.spinner} />
        <strong>Loading cars...</strong>
        <p>Please wait while we fetch the best<br />cars for you</p>
      </div>
    </div>
  );
}
