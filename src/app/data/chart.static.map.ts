import {
  ChartColorMap,
  ChartColorData
} from './../types/timeseries/chart.color.data';

export class ChartColors {
  static TimeSeries: ChartColorMap<ChartColorData> = {
    bc: {
      color: '#64b5f6',
      id: 'bc',
      name: 'Black Carbon',
      preferredUnit: 'µg/m³'
    },
    co: {
      color: '#ba68c8',
      id: 'co',
      name: 'Carbon Monoxide',
      preferredUnit: 'ppm'
    },
    n02: {
      color: '#4db6ac',
      id: 'no2',
      name: 'Nitrogen Dioxide',
      preferredUnit: 'ppm'
    },
    o3: { color: '#4db6ac', id: '03', name: 'Ozone', preferredUnit: 'ppm' },
    pm10: {
      color: '#f50057',
      id: 'pm10',
      name: 'Particulate < 10 micrometers',
      preferredUnit: 'µg/m³'
    },
    pm25: {
      color: '#ffe082',
      id: 'pm25',
      name: 'Particulate < 25 micrometers',
      preferredUnit: 'µg/m³'
    },
    so2: {
      color: '#8d6e63',
      id: 'so2',
      name: 'Sulfur Dioxide',
      preferredUnit: 'ppm'
    }
  };
}
