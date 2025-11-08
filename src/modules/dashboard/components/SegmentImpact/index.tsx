import dynamic from 'next/dynamic';
import { Segment } from '../../types/dashboard';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface SegmentImpactProps {
  segments: Segment[];
  pieChartOptions: any;
  pieChartSeries: number[];
}

export function SegmentImpact({
  segments,
  pieChartOptions,
  pieChartSeries,
}: SegmentImpactProps) {
  return (
    <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-4 lg:p-6 shadow-2xl">
      <h2 className="text-lg lg:text-xl font-bold mb-4 lg:mb-6 text-white">
        Mapa de impacto por segmento
      </h2>

      <div className="flex justify-center mb-6 lg:mb-8">
        <div className="w-48 h-48 lg:w-56 lg:h-56">
          <Chart
            options={pieChartOptions}
            series={pieChartSeries}
            type="donut"
            height="100%"
          />
        </div>
      </div>

      <div className="space-y-1.5 mb-6 lg:mb-8">
        <div className="flex flex-wrap gap-3">
          {segments.map((segment, i) => (
            <div
              key={i}
              className="py-3 px-2 bg-[#24283a] rounded-3xl transition-all cursor-pointer hover:bg-[#2a2e42] border border-slate-700/30"
            >
              <div className="flex items-center gap-2">
                <p
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: segment.color }}
                ></p>
                <span className="text-xs font-medium text-white">
                  {segment.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button className="bg-[#1876D2] text-white font-semibold py-2 px-6 rounded-3xl transition-all hover:bg-[#1565c0] text-sm">
          Analisar segmentos
        </button>
      </div>
    </div>
  );
}
