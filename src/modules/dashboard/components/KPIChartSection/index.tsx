import { useState } from 'react';
import LineChart from '../LineChart';
import { lineChartOptions } from '../../config/chartDashboardConfig';

interface KpiData {
  name: string;
  data: number[];
  color: string;
  formatter: (value: number) => string;
}

interface KpiChartData {
  [key: string]: KpiData;
}

export const kpiData: KpiChartData = {
  ARPU: {
    name: 'ARPU',
    data: [285, 292, 278, 295, 310, 305, 318, 345, 338, 355, 368, 380],
    color: '#06b6d4',
    formatter: (value: number) => `R$ ${value}`,
  },
  Retenção: {
    name: 'Retenção',
    data: [85, 82, 88, 84, 86, 89, 87, 90, 92, 91, 93, 95],
    color: '#10b981',
    formatter: (value: number) => `${value}%`,
  },
  Conversão: {
    name: 'Conversão',
    data: [12, 15, 18, 14, 16, 20, 22, 25, 23, 27, 30, 32],
    color: '#8b5cf6',
    formatter: (value: number) => `${value}%`,
  },
  Churn: {
    name: 'Churn',
    data: [8, 6, 5, 7, 6, 4, 5, 3, 4, 3, 2, 2],
    color: '#ef4444',
    formatter: (value: number) => `${value}%`,
  },
};

export function KpiChartSection() {
  const [activeTab, setActiveTab] = useState<keyof typeof kpiData>('ARPU');

  const getChartOptions = (
    kpi: keyof typeof kpiData,
  ): ApexCharts.ApexOptions => {
    const currentKpi = kpiData[kpi];

    return {
      ...lineChartOptions,
      chart: {
        ...(lineChartOptions.chart || {}),
        type: 'line' as const,
      },
      colors: [currentKpi.color],
      yaxis: {
        ...lineChartOptions.yaxis,
        labels: {
          ...lineChartOptions.yaxis?.labels,
          formatter: currentKpi.formatter,
        },
      },
      tooltip: {
        ...lineChartOptions.tooltip,
        y: {
          formatter: currentKpi.formatter,
        },
      },
    } as ApexCharts.ApexOptions;
  };

  const getChartSeries = (kpi: keyof typeof kpiData): ApexAxisChartSeries => {
    const currentKpi = kpiData[kpi];

    return [
      {
        name: currentKpi.name,
        data: currentKpi.data,
      },
    ];
  };

  return (
    <div className="lg:col-span-2 xl:col-span-2 rounded-2xl border border-slate-700/50 p-4 lg:p-6 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 lg:mb-6 gap-3">
        <h2 className="text-lg lg:text-xl font-semibold">Evolução dos KPI's</h2>
        <div className="flex gap-1 lg:gap-2 overflow-x-auto pb-2">
          {(Object.keys(kpiData) as Array<keyof typeof kpiData>).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded-3xl text-xs lg:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-[#38b5cb] shadow-lg shadow-cyan-500/30'
                  : 'bg-slate-700/30 hover:bg-slate-700/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <LineChart
        options={getChartOptions(activeTab)}
        series={getChartSeries(activeTab)}
        height={300}
      />
    </div>
  );
}
