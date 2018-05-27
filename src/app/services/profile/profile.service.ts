import { UserDetails } from './../../types/auth.result';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor() {}

  public getUserProfile(): UserDetails {
    return this.getProfileFromStorage();
  }

  private getProfileFromStorage(): UserDetails {
    return JSON.parse(localStorage.getItem('profile'));
  }
}
