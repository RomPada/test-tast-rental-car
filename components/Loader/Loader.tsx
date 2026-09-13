import styles from './Loader.module.css';

export default function Loader({ overlay = false }: { overlay?: boolean }) {
  const card = (
    <div className={styles.card} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <div>
        <strong>Loading cars...</strong>
        <p>Please wait while we fetch the best cars for you</p>
      </div>
    </div>
  );
  return overlay ? <div className={styles.overlay}>{card}</div> : card;
}
