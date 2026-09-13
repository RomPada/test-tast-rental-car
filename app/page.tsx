import type { Metadata } from 'next';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import { OG_IMAGE, ROUTES, SITE_NAME, SITE_URL } from '@/lib/constants';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: {
    absolute: `Home | ${SITE_NAME}`,
  },
  description: 'Find your perfect rental car with RentalCar.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'RentalCar — Find your perfect rental car',
    description: 'Reliable and budget-friendly rentals for any journey.',
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    images: [OG_IMAGE],
  },
};

export default function HomePage() {
  return (
    <main>
      <section className={styles.hero} aria-labelledby="hero-title">
        <Image className={styles.image} src="/images/hero.jpg" alt="" fill priority sizes="100vw" />
        <div className={styles.content}>
          <div>
            <h1 id="hero-title">Find your perfect rental car</h1>
            <p>Reliable and budget-friendly rentals for any journey</p>
          </div>
          <Button className={styles.button} href={ROUTES.catalog}>
            View Catalog
          </Button>
        </div>
      </section>
    </main>
  );
}
