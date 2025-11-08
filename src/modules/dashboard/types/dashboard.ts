export interface KPI {
  value: string;
  change: string;
  trend: 'up' | 'down';
  label: string;
}

export interface Segment {
  name: string;
  value: number;
  color: string;
}

export interface MapMarker {
  id?: number;
  lat: number;
  lng: number;
  region?: string;
  customerType?: string;
  type: 'blue' | 'orange' | 'green' | 'emerald';
  count: number;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}
