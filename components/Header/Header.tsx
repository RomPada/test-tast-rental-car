'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Container from '@/components/Container/Container';
import { ROUTES } from '@/lib/constants';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link className={styles.logo} href={ROUTES.home} aria-label="RentalCar home">
          <Image src="/images/logo.svg" alt="RentalCar" width={104} height={16} priority />
        </Link>
        <nav aria-label="Main navigation">
          <ul className={styles.navList}>
            <li>
              <Link className={pathname === ROUTES.home ? styles.active : ''} href={ROUTES.home}>
                Home
              </Link>
            </li>
            <li>
              <Link
                className={pathname.startsWith(ROUTES.catalog) ? styles.active : ''}
                href={ROUTES.catalog}
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
