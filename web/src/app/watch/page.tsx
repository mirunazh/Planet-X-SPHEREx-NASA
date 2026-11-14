import { Suspense } from 'react';
import { WatchPage } from '@/components/WatchPage';

export default function Watch() {
  return (
    <Suspense>
      <WatchPage />
    </Suspense>
  );
}
