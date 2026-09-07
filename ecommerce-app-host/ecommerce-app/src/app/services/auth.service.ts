import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/api/users';
  private readonly tokenKey = 'token';

  constructor(
    private readonly http: HttpClient
  ) { }

  signup(userData: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl,
      userData
    );
  }

  login(userData: any): Observable<any> {
    return this.http.post<any>(
      ` http://localhost:8080/api/auth/login`,
      userData
    );
  }

  saveToken(token: string): void {
    localStorage.setItem(
      this.tokenKey,
      token
    );
  }

  getToken(): string | null {
    return localStorage.getItem(
      this.tokenKey
    );
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(
      this.tokenKey
    );
  }
}
