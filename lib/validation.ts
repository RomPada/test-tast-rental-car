import type { BookingRequest } from '@/types/car';

export type BookingErrors = Partial<Record<keyof BookingRequest, string>>;

const namePattern = /^[\p{L}][\p{L}\s'-]*$/u;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateBooking(values: BookingRequest): BookingErrors {
  const errors: BookingErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const comment = values.comment.trim();

  if (name.length < 2 || !namePattern.test(name)) {
    errors.name = 'Please enter your full name.';
  }
  if (!emailPattern.test(email)) {
    errors.email = 'Please enter a valid email.';
  }
  if (!comment) {
    errors.comment = 'Comment is required';
  }

  return errors;
}

export function normalizeBooking(values: BookingRequest): BookingRequest {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    comment: values.comment.trim(),
  };
}
