import { CustomerMap } from '../../CustomerMap';
import { mapMarkers } from '../../../config/dashboardData';

export function MapSection() {
  return <CustomerMap markers={mapMarkers} />;
}
