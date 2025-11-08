import { useState, useCallback, useMemo } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { MapMarker } from '../../types/dashboard';

interface CustomerMapCardProps {
  markers: MapMarker[];
  apiKey: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: -14.235,
  lng: -51.9253,
};

const defaultZoom = 4;

const createMarkerIcon = (type: string, count: number) => {
  const baseSize = 40 + count * 2;
  const color =
    type === 'blue' ? '#06b6d4' : type === 'orange' ? '#f97316' : '#10b981';

  return {
    path: window.google?.maps?.SymbolPath?.CIRCLE || 0,
    fillColor: color,
    fillOpacity: 0.8,
    strokeColor: '#ffffff',
    strokeWeight: 2,
    scale: Math.min(baseSize / 10, 8),
  };
};

export function CustomerMapCard({ markers, apiKey }: CustomerMapCardProps) {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    setIsMapLoaded(true);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
    setIsMapLoaded(false);
  }, []);

  const getMarkerIcon = useCallback(
    (type: string, count: number) => {
      if (!isMapLoaded) return undefined;

      const baseSize = 40 + count * 2;
      const color =
        type === 'blue' ? '#06b6d4' : type === 'orange' ? '#f97316' : '#10b981';

      return {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: color,
        fillOpacity: 0.8,
        strokeColor: '#ffffff',
        strokeWeight: 2,
        scale: Math.min(baseSize / 10, 8),
      };
    },
    [isMapLoaded],
  );

  const fitMapToMarkers = useCallback(() => {
    if (map && markers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach((marker) => {
        bounds.extend(new window.google.maps.LatLng(marker.lat, marker.lng));
      });
      map.fitBounds(bounds);

      const currentZoom = map.getZoom() || defaultZoom;
      if (currentZoom > 12) {
        map.setZoom(12);
      }
    }
  }, [map, markers]);

  useState(() => {
    if (markers.length > 0 && isMapLoaded) {
      setTimeout(fitMapToMarkers, 100);
    }
  });

  const mapOptions = useMemo(
    () => ({
      styles: [
        {
          featureType: 'all',
          elementType: 'geometry',
          stylers: [{ color: '#1e293b' }],
        },
        {
          featureType: 'all',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#94a3b8' }],
        },
        {
          featureType: 'all',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#1e293b' }],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#0f172a' }],
        },
      ],
      disableDefaultUI: false,
      zoomControl: true,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: true,
    }),
    [],
  );

  if (!apiKey) {
    return (
      <div className="relative h-60 lg:h-72 bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700/30 flex items-center justify-center">
        <div className="text-slate-400 text-center p-4">
          <p>Google Maps API key não configurada</p>
          <p className="text-sm mt-2">
            Configure a chave da API para exibir o mapa
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-60 lg:h-72 bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700/30">
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={defaultZoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions}
        >
          {isMapLoaded &&
            markers.map((marker, index) => (
              <Marker
                key={marker.id || index}
                position={{ lat: marker.lat, lng: marker.lng }}
                icon={getMarkerIcon(marker.type, marker.count)}
                onClick={() => setSelectedMarker(marker)}
              />
            ))}

          {selectedMarker && isMapLoaded && (
            <InfoWindow
              position={{
                lat: selectedMarker.lat,
                lng: selectedMarker.lng,
              }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="bg-slate-900 text-white p-2 rounded-lg min-w-32">
                <h3 className="font-semibold text-sm">
                  {selectedMarker.region}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {selectedMarker.customerType}: {selectedMarker.count} clientes
                </p>
                <div
                  className={`w-3 h-3 rounded-full mt-1 ${
                    selectedMarker.type === 'blue'
                      ? 'bg-cyan-500'
                      : selectedMarker.type === 'orange'
                        ? 'bg-orange-500'
                        : 'bg-emerald-500'
                  }`}
                ></div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      <div className="absolute bottom-3 left-3 lg:bottom-4 lg:left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-2 lg:p-3 border border-slate-700/50">
        <div className="flex flex-wrap gap-2 lg:gap-4 text-xs">
          <div className="flex items-center gap-1 lg:gap-2">
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-cyan-500"></div>
            <span className="text-xs">Premium</span>
          </div>
          <div className="flex items-center gap-1 lg:gap-2">
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-orange-500"></div>
            <span className="text-xs">Standard</span>
          </div>
          <div className="flex items-center gap-1 lg:gap-2">
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-emerald-500"></div>
            <span className="text-xs">Basic</span>
          </div>
        </div>
      </div>
    </div>
  );
}
