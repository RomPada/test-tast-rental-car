'use client';

import ErrorView from '@/components/ErrorView/ErrorView';

export default function CarError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorView
      title="Unable to load this car"
      message={error.message || 'Please try again.'}
      retry={reset}
    />
  );
}
