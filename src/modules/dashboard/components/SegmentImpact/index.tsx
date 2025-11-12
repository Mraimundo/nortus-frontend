'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
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
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);

  const handleToggleSegment = (segmentName: string) => {
    setSelectedSegments((prev) =>
      prev.includes(segmentName)
        ? prev.filter((s) => s !== segmentName)
        : [...prev, segmentName],
    );
  };

  const { filteredSeries, filteredOptions } = useMemo(() => {
    if (selectedSegments.length === 0) {
      return {
        filteredSeries: pieChartSeries,
        filteredOptions: {
          ...pieChartOptions,
          labels: segments.map((s) => s.name),
          colors: segments.map((s) => s.color),
        },
      };
    }

    const filtered = segments.filter((s) => selectedSegments.includes(s.name));

    return {
      filteredSeries: filtered.map((s) => s.value),
      filteredOptions: {
        ...pieChartOptions,
        labels: filtered.map((s) => s.name),
        colors: filtered.map((s) => s.color),
      },
    };
  }, [selectedSegments, pieChartSeries, pieChartOptions, segments]);

  const handleAnalyzeSegments = () => {
    if (selectedSegments.length === 0) {
      toast.error('Selecione pelo menos um segmento para analisar.');
      return;
    }

    toast.success(`Analisando segmentos: ${selectedSegments.join(', ')}...`);
  };

  return (
    <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-4 lg:p-6 shadow-2xl">
      <h2 className="text-lg lg:text-xl font-bold mb-4 lg:mb-6 text-white">
        Mapa de impacto por segmento
      </h2>

      <div className="flex justify-center mb-6 lg:mb-8 transition-all">
        <div className="w-48 h-48 lg:w-56 lg:h-56">
          <Chart
            options={filteredOptions}
            series={filteredSeries}
            type="donut"
            height="100%"
          />
        </div>
      </div>

      <div className="space-y-1.5 mb-6 lg:mb-8">
        <div className="flex flex-wrap gap-3">
          {segments.map((segment, i) => {
            const isSelected = selectedSegments.includes(segment.name);

            return (
              <div
                key={i}
                onClick={() => handleToggleSegment(segment.name)}
                className={`py-3 px-3 rounded-3xl border transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#1876D2] border-[#1876D2]'
                    : 'bg-[#24283a] border-slate-700/30 hover:bg-[#2a2e42]'
                }`}
              >
                <p
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: segment.color }}
                ></p>
                <button className="text-xs font-medium text-white focus:outline-none">
                  {segment.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          onClick={handleAnalyzeSegments}
          disabled={selectedSegments.length === 0}
          className={`font-semibold py-2 px-6 rounded-3xl text-sm transition-all ${
            selectedSegments.length > 0
              ? 'bg-[#1876D2] hover:bg-[#1565c0] text-white'
              : 'bg-gray-600 text-gray-300 cursor-not-allowed'
          }`}
        >
          Analisar segmentos
        </button>
      </div>
    </div>
  );
}
