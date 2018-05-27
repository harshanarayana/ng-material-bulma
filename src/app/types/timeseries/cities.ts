import { APIMeta } from './meta';

interface City {
  city: string;
  country: string;
  location: number;
  count: number;
}

export interface Cities {
  meta: APIMeta;
  results: City[];
}
