import { APIMeta } from './meta';
interface Coordinate {
  latitude: number;
  longitude: number;
}

interface Location {
  location: string;
  city: string;
  country: string;
  count: number;
  sourceNames: string[];
  lastUpdated: string;
  firstUpdated: string;
  parameters: string[];
  distance: number;
  sourceName: string;
  coordinates: Coordinate;
}

export interface Locations {
  meta: APIMeta;
  results: Location[];
}
