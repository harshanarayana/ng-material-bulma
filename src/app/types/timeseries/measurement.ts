import { APIMeta } from './meta';

interface Date {
  utc?: string;
  local?: string;
}

interface Coordinate {
  latitude?: number;
  longitude?: number;
}

interface Measurement {
  location: string;
  parameter: string;
  date: Date;
  value: number;
  unit: string;
  coordinates: Coordinate;
  country: string;
  city: string;
}

export interface Measurements {
  meta: APIMeta;
  results: Measurement[];
}
