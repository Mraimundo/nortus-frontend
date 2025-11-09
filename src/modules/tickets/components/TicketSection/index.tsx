'use client';

import { useState } from 'react';
import { MobileHeader } from '@/src/shared/components/MobileHeader';
import { TicketTable } from '../TicketTable';
import { MobileMenu } from '@/src/shared/components/MobileMenu';
import { Sidebar } from '@/src/shared/components/Sidebar';
import { TicketDesktopHeader } from '../TicketDesktopHeader';
import { TicketStats } from '../TicketStats';

export function TicketSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <section>
      <MobileHeader
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <Sidebar />
      <TicketDesktopHeader />

      <div className="lg:ml-20 lg:mt-32 pt-24 lg:pt-8 lg:p-8 p-4">
        <TicketStats />
        <TicketTable />
      </div>
    </section>
  );
}
