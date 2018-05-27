import { APIMeta } from './meta';

interface Parameter {
  id: string;
  name: string;
  description: string;
  preferredUnit: string;
}

export interface Parameters {
  meta: APIMeta;
  results: Parameter[];
}
