import { KPI } from '../../types/dashboard';
import { KPICard } from '../KPICard';

interface KPIGridProps {
  kpiData: Record<string, KPI>;
}

export function KPIGrid({ kpiData }: KPIGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(kpiData).map(([key, data]) => (
        <KPICard key={key} data={data} />
      ))}
    </div>
  );
}
