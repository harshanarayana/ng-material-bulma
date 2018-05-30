import {
  ChartColorMap,
  ChartColorData
} from './../types/timeseries/chart.color.data';
import { ChartColors } from './../data/chart.static.map';

import { ParameterDropdown } from './../types/ui/parameter.dropdown';
import { LocationDropdown } from './../types/ui/location.dropdown';
import { AuthService } from './../services/auth/auth.service';
import { CityDropdown } from './../types/ui/city.dropdown';
import { OpenaqService } from './../services/timeseries/openaq.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, DataSet } from '../types/timeseries/chart.data';
import { UIChart } from 'primeng/chart';

@Component({
  selector: 'app-timeseries',
  templateUrl: './timeseries.component.html',
  styleUrls: ['./timeseries.component.scss']
})
export class TimeseriesComponent implements OnInit {
  @ViewChild('chart') chart: UIChart;
  citiesDropDown: CityDropdown[] = new Array<CityDropdown>();

  locationDropdown: LocationDropdown[] = new Array<LocationDropdown>();

  parameterDropdown: ParameterDropdown[] = new Array<ParameterDropdown>();

  chartData: ChartData = {
    labels: new Array<string>(),
    datasets: new Array<DataSet>()
  };

  chartColorData: ChartColorMap<ChartColorData> = ChartColors.TimeSeries;

  selectedCity: string;
  selectedLocation: string;
  selectedParameter: string;
  chartVisibility = false;

  constructor(private _openAQ: OpenaqService, private _auth: AuthService) {
    console.log('here');
  }

  ngOnInit() {
    if (this._auth.isAuthenticated()) {
      this._openAQ.getCitiesInIndia().subscribe(cities => {
        cities.results.map(city => {
          this.citiesDropDown.push({
            label: city.city,
            value: city.city
          });
        });
      });

      this._openAQ.getMeasurementParameters().subscribe(parameters => {
        parameters.results.map(parameter => {
          this.parameterDropdown.push({
            label: parameter.name,
            value: parameter.id
          });
        });
      });
    }
  }

  public loadLocations() {
    if (this._auth.isAuthenticated()) {
      this.chartVisibility = false;
      if (this.selectedCity) {
        this.locationDropdown = [];
        this._openAQ
          .getLocationsForSelectedCity(this.selectedCity)
          .subscribe(locations => {
            locations.results.map(location => {
              this.locationDropdown.push({
                label: location.location,
                value: location.location
              });
            });
          });
      }
    }
  }

  /**
   * Fetch the Timeseries Chart data using {@link OpenaqService} methods and
   * generate it in a format that is compatible to be used with the charting
   * tool being used with this application.
   *
   * @param {UIChart} chart Chart Component to Refresh for Dynamic Chart refresh.
   * @memberof TimeseriesComponent
   */
  public getChartDataForLocation(chart: UIChart) {
    if (this._auth.isAuthenticated()) {
      this.chartData = {
        labels: new Array<string>(),
        datasets: new Array<DataSet>()
      };
      this._openAQ
        .getAllMeasurementsForSelectedCity(this.selectedCity)
        .subscribe(measurements => {
          const map: Object = {};
          // Filter Data for the Selected location and Selected parameters.
          // This will reduce the data points to be rendered in the chart.
          measurements.results
            .filter(
              measurement => measurement.location === this.selectedLocation
            )
            .filter(
              measurement => measurement.parameter === this.selectedParameter
            )
            .map(measurement => {
              this.chartData.labels.push(measurement.date.local);
              if (!map.hasOwnProperty(measurement.parameter)) {
                map[measurement.parameter] = new Array<number>();
              }
              map[measurement.parameter].push(measurement.value);
            });
          Object.keys(map).map(key => {
            this.chartData.datasets.push({
              label: this.chartColorData[key]
                ? this.chartColorData[key].name +
                  ' - ' +
                  this.chartColorData[key].preferredUnit
                : key,
              data: map[key],
              fill: false,
              borderColor: this.chartColorData[key]
                ? this.chartColorData[key].color
                : '#000'
            });
          });

          if (this.selectedParameter) {
            this.chartVisibility = true;
          }

          if (this.chartData.datasets.length > 0) {
            this.chartVisibility = true;
          } else {
            this.chartVisibility = false;
          }

          if (chart && this.chartVisibility) {
            chart.refresh();
          }
        });
    }
  }

  public isAuthenticated(): boolean {
    return this._auth.isAuthenticated();
  }
}
