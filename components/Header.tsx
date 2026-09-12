'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const catalogActive = pathname.startsWith('/catalog');

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logo} href="/" aria-label="RentalCar home">
          Rental<span>Car</span>
        </Link>
        <nav className={styles.nav} aria-label="Main navigation">
          <Link className={!catalogActive ? styles.active : ''} href="/">
            Home
          </Link>
          <Link className={catalogActive ? styles.active : ''} href="/catalog">
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
