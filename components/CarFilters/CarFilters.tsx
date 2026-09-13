'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import { buildCatalogHref, getPriceOptions, isMileageRangeValid } from '@/lib/filters';
import type { CarFilters, CarFiltersMeta } from '@/types/car';
import styles from './CarFilters.module.css';

type Draft = { brand: string; price: string; minMileage: string; maxMileage: string };

const toDraft = (filters: CarFilters): Draft => ({
  brand: filters.brand ?? '',
  price: filters.price?.toString() ?? '',
  minMileage: filters.minMileage?.toString() ?? '',
  maxMileage: filters.maxMileage?.toString() ?? '',
});

export default function CarFiltersForm({
  meta,
  filters,
}: {
  meta: CarFiltersMeta;
  filters: CarFilters;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft>(() => toDraft(filters));
  const [rangeError, setRangeError] = useState('');
  const prices = useMemo(() => getPriceOptions(meta), [meta]);

  const apply = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: CarFilters = {
      ...(draft.brand ? { brand: draft.brand } : {}),
      ...(draft.price ? { price: Number(draft.price) } : {}),
      ...(draft.minMileage ? { minMileage: Number(draft.minMileage) } : {}),
      ...(draft.maxMileage ? { maxMileage: Number(draft.maxMileage) } : {}),
    };

    if (!isMileageRangeValid(next)) {
      setRangeError('From mileage cannot be greater than To mileage.');
      return;
    }

    setRangeError('');
    router.push(buildCatalogHref(next));
  };

  const reset = () => {
    setDraft(toDraft({}));
    setRangeError('');
    router.push('/catalog');
  };

  return (
    <form className={styles.form} onSubmit={apply}>
      <label className={styles.field}>
        <span>Car brand</span>
        <select
          value={draft.brand}
          onChange={(e) => setDraft((s) => ({ ...s, brand: e.target.value }))}
        >
          <option value="">Choose a brand</option>
          {meta.brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span>Price/ 1 hour</span>
        <select
          value={draft.price}
          onChange={(e) => setDraft((s) => ({ ...s, price: e.target.value }))}
        >
          <option value="">Choose a price</option>
          {prices.map((price) => (
            <option key={price} value={price}>
              To ${price}
            </option>
          ))}
        </select>
      </label>

      <fieldset className={styles.mileage}>
        <legend>Car mileage / km</legend>
        <div className={styles.range}>
          <input
            aria-label="Mileage from"
            inputMode="numeric"
            min="0"
            placeholder="From"
            type="number"
            value={draft.minMileage}
            onChange={(e) => setDraft((s) => ({ ...s, minMileage: e.target.value }))}
          />
          <input
            aria-label="Mileage to"
            inputMode="numeric"
            min="0"
            placeholder="To"
            type="number"
            value={draft.maxMileage}
            onChange={(e) => setDraft((s) => ({ ...s, maxMileage: e.target.value }))}
          />
        </div>
        {rangeError && <small className={styles.error}>{rangeError}</small>}
      </fieldset>

      <div className={styles.actions}>
        <Button type="submit">Search</Button>
        <button className={styles.reset} type="button" onClick={reset}>
          Clear filters
        </button>
      </div>
    </form>
  );
}
