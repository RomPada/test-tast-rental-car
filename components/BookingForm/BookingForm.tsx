'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { LuCircleAlert } from 'react-icons/lu';
import Button from '@/components/Button/Button';
import { createBooking } from '@/lib/api';
import { normalizeBooking, validateBooking, type BookingErrors } from '@/lib/validation';
import type { BookingRequest } from '@/types/car';
import styles from './BookingForm.module.css';

const initialValues: BookingRequest = { name: '', email: '', comment: '' };

export default function BookingForm({ carId }: { carId: string }) {
  const [values, setValues] = useState<BookingRequest>(initialValues);
  const [errors, setErrors] = useState<BookingErrors>({});

  const booking = useMutation({
    mutationFn: (payload: BookingRequest) => createBooking(carId, payload),
    onSuccess: (response) => {
      toast.success(response.message || 'Your car rental request was sent successfully!');
      setValues(initialValues);
      setErrors({});
    },
    onError: () => toast.error('Could not send your booking request. Please try again.'),
  });

  const change = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateBooking(values);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    booking.mutate(normalizeBooking(values));
  };

  const field = (name: keyof BookingRequest, placeholder: string, type = 'text') => {
    const errorId = `${name}-error`;
    const hasError = Boolean(errors[name]);

    return (
      <label className={styles.field}>
        <span className="visually-hidden">{placeholder}</span>
        <input
          aria-describedby={hasError ? errorId : undefined}
          aria-invalid={hasError}
          className={hasError ? styles.invalid : ''}
          name={name}
          type={type}
          value={values[name]}
          placeholder={placeholder}
          onChange={change}
          autoComplete={name === 'name' ? 'name' : name === 'email' ? 'email' : undefined}
        />
        {errors[name] && (
          <>
            <LuCircleAlert className={styles.icon} aria-hidden="true" />
            <small id={errorId}>{errors[name]}</small>
          </>
        )}
      </label>
    );
  };

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <div>
        <h2>Book your car now</h2>
        <p>Stay connected! We are always ready to help you.</p>
      </div>

      <div className={styles.fields}>
        {field('name', 'Name*')}
        {field('email', 'Email*', 'email')}
        <label className={styles.field}>
          <span className="visually-hidden">Comment*</span>
          <textarea
            aria-describedby={errors.comment ? 'comment-error' : undefined}
            aria-invalid={Boolean(errors.comment)}
            className={errors.comment ? styles.invalid : ''}
            name="comment"
            value={values.comment}
            placeholder="Comment*"
            rows={3}
            onChange={change}
          />
          {errors.comment && (
            <>
              <LuCircleAlert className={styles.icon} aria-hidden="true" />
              <small id="comment-error">{errors.comment}</small>
            </>
          )}
        </label>
      </div>

      <Button type="submit" disabled={booking.isPending}>
        {booking.isPending ? 'Sending...' : 'Send'}
      </Button>
    </form>
  );
}
