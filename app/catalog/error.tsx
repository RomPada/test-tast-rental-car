'use client';

import ErrorView from '@/components/ErrorView/ErrorView';

export default function CatalogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorView
      title="Unable to load cars"
      message={error.message || 'Please try again.'}
      retry={reset}
    />
  );
}
