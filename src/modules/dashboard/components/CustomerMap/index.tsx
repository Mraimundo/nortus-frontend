import { useState, useMemo } from 'react';
import { mapMarkers } from '../../config/dashboardData';
import { MapMarker } from '../../types/dashboard';
import { CustomerMapCard } from '../CustomerMapCard';
import { env } from '@/src/env';

interface CustomerMapProps {
  markers?: MapMarker[];
}

export function CustomerMap({ markers = mapMarkers }: CustomerMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const googleMapsApiKey = env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  const filteredMarkers = useMemo(() => {
    return markers.filter((marker) => {
      const regionMatch =
        selectedRegion === 'all' || marker.region === selectedRegion;
      const typeMatch =
        selectedType === 'all' || marker.customerType === selectedType;
      return regionMatch && typeMatch;
    });
  }, [markers, selectedRegion, selectedType]);

  const regions = useMemo(() => {
    const uniqueRegions = Array.from(
      new Set(markers.map((marker) => marker.region)),
    );
    return uniqueRegions;
  }, [markers]);

  const customerTypes = useMemo(() => {
    const uniqueTypes = Array.from(
      new Set(markers.map((marker) => marker.customerType)),
    );
    return uniqueTypes;
  }, [markers]);

  return (
    <div className="lg:col-span-2 xl:col-span-2 bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-4 lg:p-6 shadow-2xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 lg:mb-6 gap-3">
        <h2 className="text-lg lg:text-xl font-semibold">
          Mapa de clientes por região
        </h2>
        <div className="flex gap-2">
          <select
            className="bg-slate-700/50 border border-slate-600/50 rounded-3xl px-3 py-1.5 text-xs lg:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="all">Todos os locais</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <select
            className="bg-slate-700/50 border border-slate-600/50 rounded-3xl px-3 py-1.5 text-xs lg:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">Todos os tipos</option>
            {customerTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      <CustomerMapCard markers={filteredMarkers} apiKey={googleMapsApiKey} />

      <div className="mt-4 flex gap-4 text-xs text-slate-400">
        <div>
          <span className="font-medium text-slate-300">
            {filteredMarkers.length}
          </span>{' '}
          regiões
        </div>
        <div>
          <span className="font-medium text-slate-300">
            {filteredMarkers.reduce((sum, marker) => sum + marker.count, 0)}
          </span>{' '}
          clientes
        </div>
      </div>
    </div>
  );
}
