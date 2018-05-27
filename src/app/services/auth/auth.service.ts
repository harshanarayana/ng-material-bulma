import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { AuthResult } from '../../types/auth.result';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = new auth0.WebAuth({
    clientID: environment.authClientId,
    domain: environment.authDomain,
    responseType: environment.authResponseType,
    audience: environment.authAudience,
    redirectUri: environment.authRedirectURL,
    scope: environment.authScope
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth.authorize();
  }

  public handleAuthentication(): void {
    this.auth.parseHash((err, authResult: AuthResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult: AuthResult): void {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('profile', JSON.stringify(authResult.idTokenPayload));
  }

  public logout(): void {
    this.cleanLocalStorageForUserInfo();
    this.router.navigate(['/']);
  }

  private cleanLocalStorageForUserInfo(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    if (new Date().getTime() > expiresAt) {
      this.cleanLocalStorageForUserInfo();
    }
    return new Date().getTime() < expiresAt;
  }
}
