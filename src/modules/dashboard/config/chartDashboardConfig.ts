export const lineChartOptions = {
  chart: {
    type: 'area',
    height: 350,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
    },
  },
  colors: ['#06b6d4'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.05,
      stops: [0, 90, 100],
    },
  },
  grid: {
    borderColor: '#334155',
    strokeDashArray: 4,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  xaxis: {
    categories: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
    axisBorder: {
      color: '#334155',
    },
    axisTicks: {
      color: '#334155',
    },
    labels: {
      style: {
        colors: '#94a3b8',
        fontSize: '12px',
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: '#94a3b8',
        fontSize: '12px',
      },
      formatter: (value: number) => `R$ ${value}`,
    },
  },
  tooltip: {
    theme: 'dark',
    x: {
      format: 'MMM',
    },
  },
};

export const lineChartSeries = [
  {
    name: 'ARPU',
    data: [285, 292, 278, 295, 310, 305, 318, 345, 338, 355, 368, 380],
  },
];

export const pieChartOptions = {
  chart: {
    type: 'donut',
    height: 300,
  },
  colors: ['#006eff', '#53a9fd', '#00449e', '#75dfff', '#0782a7'],
  labels: [
    'Automóvel',
    'Residencial',
    'Viagem',
    'Combo resi + auto',
    'Profissional',
  ],
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Total',
            color: '#94a3b8',
            formatter: () => '100%',
          },
        },
      },
    },
  },
  stroke: {
    width: 0,
  },
  states: {
    hover: {
      filter: {
        type: 'darken',
        value: 0.1,
      },
    },
  },
};

export const pieChartSeries = [35, 28, 20, 10, 7];
