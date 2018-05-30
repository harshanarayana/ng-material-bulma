import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cities } from './../../types/timeseries/cities';
import { Parameters } from './../../types/timeseries/parameter';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Measurements } from './../../types/timeseries/measurement';
import { Locations } from '../../types/timeseries/location';

@Injectable({
  providedIn: 'root'
})
export class OpenaqService {
  API_BASE_URL: string = environment.timeSeriesAPIBase;

  constructor(private _auth: AuthService, private _http: HttpClient) {}

  /**
   * Fetch a set of possible measurement units from the API that can be used to
   * populate the initial Dropdown for the measurement selector.
   *
   * @returns {Observable<Parameters>} Observable to subscribe to.
   * @memberof OpenaqService API Service Provider
   */
  public getMeasurementParameters(): Observable<Parameters> {
    if (this._auth.isAuthenticated()) {
      return this._http.get<Parameters>(this.API_BASE_URL + '/parameters');
    }
  }

  public getCitiesInIndia(): Observable<Cities> {
    if (this._auth.isAuthenticated()) {
      return this._http.get<Cities>(this.API_BASE_URL + '/cities?country=IN');
    }
  }

  public getLocationsForSelectedCity(city: string): Observable<Locations> {
    console.log(this.API_BASE_URL + `/locations?country=IN&city=${city}`);
    return this._http.get<Locations>(
      this.API_BASE_URL + `/locations?country=IN&city=${city}`
    );
  }

  public getMeasurementsForSelectedItems(
    parameter: string,
    city: string
  ): Observable<Measurements> {
    return this._http.get<Measurements>(
      this.API_BASE_URL +
        `/measurements?country=IN&city=${city}&parameter=${parameter}`
    );
  }

  public getAllMeasurementsForSelectedCity(
    city: string
  ): Observable<Measurements> {
    console.log(this.API_BASE_URL + `/measurements?country=IN&city=${city}`);
    return this._http.get<Measurements>(
      this.API_BASE_URL + `/measurements?country=IN&city=${city}`
    );
  }
}
