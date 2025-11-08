import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface LineChartProps {
  options: any;
  series: any[];
  height?: number;
}

export function LineChart({ options, series, height = 300 }: LineChartProps) {
  return (
    <div className="relative">
      <Chart options={options} series={series} type="area" height={height} />
    </div>
  );
}

export default LineChart;
