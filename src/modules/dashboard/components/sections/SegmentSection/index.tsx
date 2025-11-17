import { SegmentImpact } from '../../SegmentImpact';
import {
  pieChartOptions,
  pieChartSeries,
} from '../../../config/chartDashboardConfig';
import { segments } from '../../../config/dashboardData';

export function SegmentSection() {
  return (
    <SegmentImpact
      segments={segments}
      pieChartOptions={pieChartOptions}
      pieChartSeries={pieChartSeries}
    />
  );
}
