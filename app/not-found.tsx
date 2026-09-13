import Button from '@/components/Button/Button';
import { ROUTES } from '@/lib/constants';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: 'calc(100vh - 68px)',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        padding: 32,
      }}
    >
      <div>
        <h1>Page not found</h1>
        <p style={{ margin: '12px 0 24px' }}>The page or car you requested does not exist.</p>
        <Button href={ROUTES.catalog}>Back to catalog</Button>
      </div>
    </main>
  );
}
