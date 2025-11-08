import { TrendingUp, TrendingDown } from 'lucide-react';
import { KPI } from '../../types/dashboard';

interface KPICardProps {
  data: KPI;
}

export function KPICard({ data }: KPICardProps) {
  return (
    <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-4 lg:p-5 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-105">
      <div className="flex items-start flex-col justify-between space-y-7">
        <p className="text-xs lg:text-sm text-white font-normal">
          {data.label}
        </p>

        <p className="text-xl lg:text-2xl text-white font-bold mb-2 lg:mb-3">
          {data.value}
        </p>
        <p
          className={`text-xs lg:text-sm font-normal ${
            data.trend === 'up' ? 'text-[#00DC04]' : 'text-[#DC3300]'
          }`}
        >
          {data.change} no período
        </p>
      </div>
      <div className="flex justify-end">
        {data.trend === 'up' ? (
          <TrendingUp className="text-[#00DC04]" size={40} />
        ) : (
          <TrendingDown className="text-[#DC3300]" size={40} />
        )}
      </div>
    </div>
  );
}
