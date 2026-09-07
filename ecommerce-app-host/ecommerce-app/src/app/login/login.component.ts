import { Component, DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { exhaustMap, EMPTY, catchError, tap, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LOGIN_CONSTANTS } from '../app.constant';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private readonly destroyRef = inject(DestroyRef);



  loginData = {
    email: '',
    password: '',
    rememberMe: false
  };

  showPassword = false;

  /**
   * Emits when login button is clicked.
   */
  private readonly loginSubject = new Subject<void>();

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.loginSubject.pipe(

      // Ignore additional clicks while login request is running
      exhaustMap(() => {

        const userData = {
          username: this.loginData.email,
          password: this.loginData.password
        };

        return this.authService.login(userData).pipe(

          tap((response) => {

            console.log('Login successful');

            // localStorage.setItem(
            //   'token',
            //   response.token
            // );

            this.authService.saveToken(response.token)
            this.router.navigate(['/welcome']);

          }),

          catchError((error) => {

            console.error('Login failed:', error);

            return EMPTY;
          })
        );
      }),

      // Automatically unsubscribe when component is destroyed
      takeUntilDestroyed(this.destroyRef)

    ).subscribe();
  }

  onLogin(): void {
    this.loginSubject.next();
  }

  revampFallback() {
    return LOGIN_CONSTANTS;
  }
}