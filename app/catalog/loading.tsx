import Loader from '@/components/Loader/Loader';

export default function CatalogLoading() {
  return (
    <main style={{ minHeight: 'calc(100vh - 68px)', display: 'grid', placeItems: 'center' }}>
      <Loader />
    </main>
  );
}
