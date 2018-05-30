import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { UserDetails } from './../../types/auth.result';
import { Injectable } from '@angular/core';
import CreateUserRequest from '../../types/profile/create.profile';
import { Profile } from '../../types/profile/profile.details';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  API_BASE_URL: string = environment.profileAPIBase;

  constructor(private _http: HttpClient) {}

  public getUserProfile(): UserDetails {
    return this.getProfileFromStorage();
  }

  public getAllUsers(): Observable<Array<Profile>> {
    return this._http.get<Array<Profile>>(this.API_BASE_URL + '/users');
  }

  public checkIfUserExists(): Observable<Array<Profile>> {
    const user: UserDetails = this.getProfileFromStorage();
    return this._http.get<Array<Profile>>(
      this.API_BASE_URL + `/users/email/${user.nickname}@gmail.com`
    );
  }

  public getAPIData(): Observable<{ message: string }> {
    return this._http.get<{ message: string }>(this.API_BASE_URL);
  }

  private getProfileFromStorage(): UserDetails {
    return JSON.parse(localStorage.getItem('profile'));
  }

  public createProfile(request: CreateUserRequest): Observable<Profile> {
    return this._http.post<Profile>(this.API_BASE_URL + '/users', request);
  }
}
