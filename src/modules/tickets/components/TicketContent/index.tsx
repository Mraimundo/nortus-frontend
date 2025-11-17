'use client';

import { TicketStats } from '../TicketStats';
import { TicketTable } from '../TicketTable';

export function TicketContent() {
  return (
    <div className="lg:ml-20 lg:mt-32 pt-24 lg:pt-8 lg:p-8 p-4">
      <TicketStats />
      <TicketTable />
    </div>
  );
}
