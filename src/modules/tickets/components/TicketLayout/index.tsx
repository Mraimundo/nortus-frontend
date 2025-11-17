'use client';

import { Suspense, useState } from 'react';
import { MobileHeader } from '@/src/shared/components/MobileHeader';
import { MobileMenu } from '@/src/shared/components/MobileMenu';
import { Sidebar } from '@/src/shared/components/Sidebar';
import { TicketDesktopHeader } from '../TicketDesktopHeader';
import { LoadingSpinner } from '@/src/shared/components/LoadingSpinner';

export function TicketLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <section className="container mx-auto py-8 px-4">
      <MobileHeader
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <Sidebar />
      <TicketDesktopHeader />

      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
    </section>
  );
}
