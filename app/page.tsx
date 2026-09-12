import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Find your perfect rental car with RentalCar.',
};

export default function HomePage() {
  return (
    <main className={styles.hero}>
      <Image
        src="/hero.webp"
        alt="White sports car driving on the highway"
        fill
        priority
        sizes="100vw"
        className={styles.image}
      />
      <div className={styles.overlay} />
      <section className={styles.content} aria-labelledby="hero-title">
        <h1 id="hero-title">Find your perfect rental car</h1>
        <p>Reliable and budget-friendly rentals for any journey</p>
        <Link className={styles.cta} href="/catalog">
          View Catalog
        </Link>
      </section>
    </main>
  );
}
