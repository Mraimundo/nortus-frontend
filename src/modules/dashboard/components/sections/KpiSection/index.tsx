import { KPIGrid } from '../../KPIGrid';
import { kpiData } from '../../../config/dashboardData';

export function KpiSection() {
  return <KPIGrid kpiData={kpiData} />;
}
