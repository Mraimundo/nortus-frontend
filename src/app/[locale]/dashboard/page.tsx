import { Suspense } from 'react';

import { DashboardSection } from '@/src/modules/dashboard/components/DashboardSection';
import { LoadingSpinner } from '@/src/shared/components/LoadingSpinner';

export default function Dashboard() {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <DashboardSection />;
      </Suspense>
    </div>
  );
}
