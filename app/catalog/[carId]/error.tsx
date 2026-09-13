'use client';

import ErrorView from '@/components/ErrorView/ErrorView';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function CarError({ reset }: Props) {
  return (
    <ErrorView
      title="Unable to load this car"
      message="Something went wrong. Please try again."
      retry={reset}
    />
  );
}
