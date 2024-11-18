import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  private loginEndpoint = 'http://localhost:8081/marvel/login';
  private tokenKey: string = 'tokenKey';

  login(name: string, password: string): Observable<any> {
    return this.httpClient
      .post<any>(this.loginEndpoint, {
        name,
        password,
      })
      .pipe(
        tap((response) => {
          if (response.token) {
            console.log(response.token);
            this.setToken(response.token);
          }
        })
      );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const patyload = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = patyload.exp * 1000;
    return Date.now() < expirationDate;
  }

  logOut(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
