'use client';

import { useEffect, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import { MapMarker } from '@/src/modules/dashboard/types/dashboard';

interface CustomerMapCardProps {
  markers: MapMarker[];
}

const defaultCenter: [number, number] = [-14.235, -51.9253];
const defaultZoom = 4;

function FitBounds({ markers }: { markers: MapMarker[] }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !markers?.length) {
      map?.setView(defaultCenter, defaultZoom);
      return;
    }
    const bounds = L.latLngBounds(
      markers.map((m) => [m.lat, m.lng] as [number, number]),
    );
    map.fitBounds(bounds, { padding: [40, 40] });

    const currentZoom = map.getZoom() ?? defaultZoom;
    if (currentZoom > 12) map.setZoom(12);
  }, [map, markers]);

  return null;
}

export function CustomerMapCard({ markers }: CustomerMapCardProps) {
  const getColor = (type: string) => {
    if (type === 'blue') return '#06b6d4';
    if (type === 'orange') return '#f97316';
    return '#10b981';
  };

  const getRadius = (count: number) => Math.min(8 + Math.sqrt(count) * 3, 30);

  const prepared = useMemo(() => markers || [], [markers]);

  return (
    <div className="relative h-60 lg:h-80 bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700/30">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <FitBounds markers={prepared} />

        {prepared.map((marker) => (
          <CircleMarker
            key={marker.id ?? `${marker.lat}-${marker.lng}`}
            center={[marker.lat, marker.lng]}
            pathOptions={{
              color: '#ffffff',
              weight: 1.5,
              fillColor: getColor(marker.type),
              fillOpacity: 0.85,
            }}
            radius={getRadius(marker.count)}
          >
            <Popup>
              <div className="bg-slate-900 text-white p-2 rounded-lg min-w-32">
                <h3 className="font-semibold text-sm">{marker.region}</h3>
                <p className="text-xs text-slate-300 mt-1">
                  {marker.customerType}: {marker.count} clientes
                </p>
                <div
                  className="mt-2 w-3 h-3 rounded-full"
                  style={{ background: getColor(marker.type) }}
                />
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      <div className="absolute bottom-3 left-3 lg:bottom-4 lg:left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-2 lg:p-3 border border-slate-700/50">
        <div className="flex flex-wrap gap-2 lg:gap-4 text-xs">
          <div className="flex items-center gap-1 lg:gap-2">
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-cyan-500" />
            <span>Premium</span>
          </div>
          <div className="flex items-center gap-1 lg:gap-2">
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-orange-500" />
            <span>Standard</span>
          </div>
          <div className="flex items-center gap-1 lg:gap-2">
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-emerald-500" />
            <span>Basic</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerMapCard;
