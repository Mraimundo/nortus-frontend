'use client';

import { Suspense, useState } from 'react';
import { MobileHeader } from '@/src/shared/components/MobileHeader';
import { MobileMenu } from '@/src/shared/components/MobileMenu';
import { Sidebar } from '@/src/shared/components/Sidebar';
import { DesktopHeader } from '@/src/shared/components/DesktopHeader';
import { LoadingSpinner } from '@/src/shared/components/LoadingSpinner';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen text-white">
      <MobileHeader
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <Sidebar />
      <DesktopHeader />

      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
    </div>
  );
}
