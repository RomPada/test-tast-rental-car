'use client';

import ErrorView from '@/components/ErrorView/ErrorView';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function CatalogError({ reset }: Props) {
  return (
    <ErrorView
      title="Unable to load cars"
      message="Something went wrong. Please try again."
      retry={reset}
    />
  );
}
