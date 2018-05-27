export interface DataSet {
  label: string;
  data: number;
  fill: boolean;
  borderColor?: string;
}

export interface ChartData {
  labels: string[];
  datasets: DataSet[];
}
