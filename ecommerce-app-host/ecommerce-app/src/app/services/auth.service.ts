import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl =
    'http://localhost:8080/api/users';

  private readonly loginUrl =
    'http://localhost:8080/api/auth/login';

  private readonly tokenKey = 'token';

  private readonly loggedInSubject =
    new BehaviorSubject<boolean>(
      !!localStorage.getItem(this.tokenKey)
    );

  readonly isLoggedIn$ =
    this.loggedInSubject.asObservable();

  constructor(
    private readonly http: HttpClient
  ) {}

  signup(userData: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl,
      userData
    );
  }

  login(userData: any): Observable<any> {
    return this.http.post<any>(
      this.loginUrl,
      userData
    );
  }

  saveToken(token: string): void {
    localStorage.setItem(
      this.tokenKey,
      token
    );
    this.loggedInSubject.next(true);
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
    this.loggedInSubject.next(false);
  }
}
