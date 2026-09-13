import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BookingForm from '@/components/BookingForm/BookingForm';
import CarInfo from '@/components/CarInfo/CarInfo';
import Container from '@/components/Container/Container';
import { getCarById, isNotFoundError } from '@/lib/api';
import { ROUTES, SITE_NAME, SITE_URL } from '@/lib/constants';
import { formatCarTitle } from '@/lib/format';
import styles from './CarPage.module.css';

type Props = { params: Promise<{ carId: string }> };

async function loadCar(carId: string) {
  try {
    return await getCarById(carId);
  } catch (error) {
    if (isNotFoundError(error)) notFound();
    throw error;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { carId } = await params;
  const car = await loadCar(carId);
  const carTitle = formatCarTitle(car.brand, car.model, car.year);
  const url = `${SITE_URL}${ROUTES.car(car.id)}`;
  return {
    title: carTitle,
    description: car.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${carTitle} | ${SITE_NAME}`,
      description: car.description,
      url,
      images: [{ url: car.img, alt: carTitle }],
    },
  };
}

export default async function CarPage({ params }: Props) {
  const { carId } = await params;
  const car = await loadCar(carId);
  return (
    <main className={styles.main}>
      <Container className={styles.layout}>
        <Image
          className={styles.image}
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={640}
          height={512}
          priority
        />
        <div className={styles.info}>
          <CarInfo car={car} />
        </div>
        <div className={styles.form}>
          <BookingForm carId={car.id} />
        </div>
      </Container>
    </main>
  );
}
