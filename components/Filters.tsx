'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, type FormEvent } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { getBrands } from '@/lib/api';
import type { CarFilters } from '@/types/car';
import styles from './Filters.module.css';

const PRICES = ['30', '40', '50', '60', '70', '80'];
const EMPTY_FILTERS: CarFilters = {
  brand: '',
  rentalPrice: '',
  minMileage: '',
  maxMileage: '',
};

interface Props {
  value: CarFilters;
  onApply: (filters: CarFilters) => void;
}

export default function Filters({ value, onApply }: Props) {
  const [draft, setDraft] = useState<CarFilters>(value);
  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
  });

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onApply(draft);
  };

  const clear = () => {
    setDraft(EMPTY_FILTERS);
    onApply(EMPTY_FILTERS);
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      <label className={styles.field}>
        <span>Car brand</span>
        <span className={styles.selectWrap}>
          <select
            value={draft.brand}
            onChange={(e) => setDraft((s) => ({ ...s, brand: e.target.value }))}
          >
            <option value="">Choose a brand</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
          <FiChevronDown aria-hidden="true" />
        </span>
      </label>

      <label className={styles.field}>
        <span>Price/ 1 hour</span>
        <span className={styles.selectWrap}>
          <select
            value={draft.rentalPrice}
            onChange={(e) => setDraft((s) => ({ ...s, rentalPrice: e.target.value }))}
          >
            <option value="">Choose a price</option>
            {PRICES.map((price) => (
              <option key={price} value={price}>To ${price}</option>
            ))}
          </select>
          <FiChevronDown aria-hidden="true" />
        </span>
      </label>

      <fieldset className={styles.mileage}>
        <legend>Car mileage / km</legend>
        <div>
          <label>
            <span className="sr-only">Mileage from</span>
            <input
              inputMode="numeric"
              min="0"
              placeholder="From"
              type="number"
              value={draft.minMileage}
              onChange={(e) => setDraft((s) => ({ ...s, minMileage: e.target.value }))}
            />
          </label>
          <label>
            <span className="sr-only">Mileage to</span>
            <input
              inputMode="numeric"
              min="0"
              placeholder="To"
              type="number"
              value={draft.maxMileage}
              onChange={(e) => setDraft((s) => ({ ...s, maxMileage: e.target.value }))}
            />
          </label>
        </div>
      </fieldset>

      <div className={styles.actions}>
        <button className={styles.search} type="submit">Search</button>
        <button className={styles.clear} type="button" onClick={clear}>Clear filters</button>
      </div>
    </form>
  );
}
