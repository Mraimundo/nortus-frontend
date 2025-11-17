'use client';

import { ChartSection } from '../sections/ChartSection';
import { KpiSection } from '../sections/KpiSection';
import { MapSection } from '../sections/MapSection';
import { SegmentSection } from '../sections/SegmentSection';

export function DashboardContent() {
  return (
    <div className="lg:ml-20 lg:mt-32 pt-24 lg:pt-8 lg:p-8 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        <ChartSection />
        <KpiSection />
        <MapSection />
        <SegmentSection />
      </div>
    </div>
  );
}
