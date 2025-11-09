import { Suspense } from 'react';
import { TicketSection } from '@/src/modules/tickets/components/TicketSection';
import { LoadingSpinner } from '@/src/shared/components/LoadingSpinner';

export default function TicketsManegementPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Suspense fallback={<LoadingSpinner />}>
        <TicketSection />
      </Suspense>
    </div>
  );
}
