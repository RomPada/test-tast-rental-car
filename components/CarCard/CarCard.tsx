'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Button from '@/components/Button/Button';
import { ROUTES } from '@/lib/constants';
import { formatMileage, formatPrice } from '@/lib/format';
import type { Car } from '@/types/car';
import styles from './CarCard.module.css';

interface MarqueeState {
  enabled: boolean;
  offset: number;
  duration: number;
}

function RentalCompany({ company }: { company: string }) {
  const viewportRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [marquee, setMarquee] = useState<MarqueeState>({
    enabled: false,
    offset: 0,
    duration: 2.8,
  });

  useEffect(() => {
    const viewport = viewportRef.current;
    const text = textRef.current;
    if (!viewport || !text) return;

    const measure = () => {
      const overflow = Math.max(0, text.scrollWidth - viewport.clientWidth);
      setMarquee({
        enabled: overflow > 1,
        offset: overflow,
        duration: Math.max(2.8, overflow / 24),
      });
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(text);

    return () => observer.disconnect();
  }, [company]);

  const marqueeStyle = {
    '--marquee-offset': `-${marquee.offset}px`,
    '--marquee-duration': `${marquee.duration}s`,
  } as CSSProperties;

  return (
    <span ref={viewportRef} className={`${styles.metaItem} ${styles.companyViewport}`}>
      <span
        ref={textRef}
        className={`${styles.companyText} ${marquee.enabled ? styles.companyTextOverflow : ''}`}
        style={marqueeStyle}
        title={company}
      >
        {company}
      </span>
    </span>
  );
}

export default function CarCard({ car, priority = false }: { car: Car; priority?: boolean }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          className={styles.image}
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={276}
          height={268}
          sizes="(min-width: 1280px) 276px, (min-width: 768px) 45vw, 90vw"
          priority={priority}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.heading}>
          <h2 className={styles.title} title={`${car.brand} ${car.model}, ${car.year}`}>
            {car.brand} <span>{car.model}</span>, {car.year}
          </h2>
          <data className={styles.price} value={car.rentalPrice}>
            {formatPrice(car.rentalPrice)}
          </data>
        </div>

        <div className={styles.badges}>
          <div className={styles.badgeRow}>
            <span className={styles.metaItem}>{car.location.city}</span>
            <span className={styles.metaItem}>{car.location.country}</span>
            <RentalCompany company={car.rentalCompany} />
          </div>
          <div className={styles.badgeRow}>
            <span className={styles.metaItem}>{car.type}</span>
            <span className={styles.metaItem}>{formatMileage(car.mileage)}</span>
          </div>
        </div>
      </div>

      <Button className={styles.button} href={ROUTES.car(car.id)} target="_blank">
        Read more
      </Button>
    </article>
  );
}
