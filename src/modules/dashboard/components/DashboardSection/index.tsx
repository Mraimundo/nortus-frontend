'use client';

import { useState, useEffect } from 'react';
import {
  pieChartOptions,
  pieChartSeries,
} from '../../config/chartDashboardConfig';
import { kpiData, segments, mapMarkers } from '../../config/dashboardData';
import { LoadingSpinner } from '@/src/shared/components/LoadingSpinner';
import { MobileHeader } from '@/src/shared/components/MobileHeader';
import { MobileMenu } from '@/src/shared/components/MobileMenu';
import { Sidebar } from '@/src/shared/components/Sidebar';
import { DesktopHeader } from '@/src/shared/components/DesktopHeader';
import { KPIGrid } from '../KPIGrid';
import { SegmentImpact } from '../SegmentImpact';
import { CustomerMap } from '../CustomerMap';
import { KpiChartSection } from '../KPIChartSection';

export function DashboardSection() {
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

      <div className="lg:ml-20 lg:mt-32 pt-24 lg:pt-8 lg:p-8 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          <KpiChartSection />

          <KPIGrid kpiData={kpiData} />

          <CustomerMap markers={mapMarkers} />

          <SegmentImpact
            segments={segments}
            pieChartOptions={pieChartOptions}
            pieChartSeries={pieChartSeries}
          />
        </div>
      </div>
    </div>
  );
}
