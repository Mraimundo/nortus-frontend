import { KPI, Segment, MapMarker } from '../types/dashboard';

export const kpiData: Record<string, KPI> = {
  arpu: {
    value: 'R$ 320,50',
    change: '+12%',
    trend: 'up',
    label: 'ARPU',
  },
  conversao: {
    value: '68,5%',
    change: '+8,2%',
    trend: 'up',
    label: 'Conversão IA',
  },
  retencao: {
    value: '85%',
    change: '+2,5%',
    trend: 'up',
    label: 'Retenção',
  },
  churn: {
    value: '3,2%',
    change: '-1,5%',
    trend: 'down',
    label: 'Taxa de Churn',
  },
};

export const segments: Segment[] = [
  { name: 'Automóvel', value: 35, color: '#006eff' },
  { name: 'Residencial', value: 28, color: '#53a9fd' },
  { name: 'Viagem', value: 20, color: '#00449e' },
  { name: 'Combo resi + auto', value: 10, color: '#75dfff' },
  { name: 'Profissional', value: 7, color: '#0782a7' },
];

// export const mapMarkers: MapMarker[] = [
//   { lat: -23.5505, lng: -46.6333, type: 'blue', count: 3 },
//   { lat: -23.5, lng: -46.7, type: 'orange', count: 2 },
//   { lat: -23.6, lng: -46.6, type: 'green', count: 1 },
//   { lat: -23.55, lng: -46.55, type: 'blue', count: 4 },
//   { lat: -23.52, lng: -46.68, type: 'orange', count: 3 },
// ];

export const mapMarkers: MapMarker[] = [
  {
    id: 1,
    count: 15,
    type: 'blue',
    lat: -23.5505,
    lng: -46.6333,
    region: 'São Paulo',
    customerType: 'Premium',
  },
  {
    id: 2,
    count: 8,
    type: 'orange',
    lat: -22.9068,
    lng: -43.1729,
    region: 'Rio de Janeiro',
    customerType: 'Standard',
  },
  {
    id: 3,
    count: 12,
    type: 'emerald',
    lat: -19.9167,
    lng: -43.9345,
    region: 'Belo Horizonte',
    customerType: 'Basic',
  },
  {
    id: 4,
    count: 6,
    type: 'blue',
    lat: -30.0346,
    lng: -51.2177,
    region: 'Porto Alegre',
    customerType: 'Premium',
  },
  {
    id: 5,
    count: 20,
    type: 'orange',
    lat: -12.9714,
    lng: -38.5014,
    region: 'Salvador',
    customerType: 'Standard',
  },
  {
    id: 6,
    count: 4,
    type: 'emerald',
    lat: -3.7172,
    lng: -38.5434,
    region: 'Fortaleza',
    customerType: 'Basic',
  },
];
