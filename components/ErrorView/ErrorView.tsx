'use client';

import Button from '@/components/Button/Button';
import styles from './ErrorView.module.css';

export default function ErrorView({
  title = 'Something went wrong',
  message,
  retry,
}: {
  title?: string;
  message: string;
  retry: () => void;
}) {
  return (
    <section className={styles.wrapper} role="alert">
      <h1>{title}</h1>
      <p>{message}</p>
      <Button type="button" onClick={retry}>
        Try again
      </Button>
    </section>
  );
}
