export interface ChartColorData {
  name: string;
  id: string;
  preferredUnit: string;
  color: string;
}

export interface ChartColorMap<T> {
  [key: string]: T;
}
