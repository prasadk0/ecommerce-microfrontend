import {
  Component,
  DestroyRef,
  inject
} from '@angular/core';

import { Router } from '@angular/router';

import {
  exhaustMap,
  EMPTY,
  catchError,
  tap,
  Subject
} from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LOGIN_CONSTANTS } from '../app.constant';
import constantsJson from '../../assets/app-fallback.json';

import { deepMerge } from 'src/app/utils/deep-merge';

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private readonly destroyRef =
    inject(DestroyRef);


  readonly constants = deepMerge(
    LOGIN_CONSTANTS,
    constantsJson.LOGIN_CONSTANTS
  );


  loginData = {
    email: '',
    password: '',
    rememberMe: false
  };


  showPassword = false;


  private readonly loginSubject =
    new Subject<void>();


  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {

    this.loginSubject
      .pipe(

        exhaustMap(() => {

          const userData = {
            username: this.loginData.email,
            password: this.loginData.password
          };

          return this.authService
            .login(userData)
            .pipe(

              tap((response) => {

                console.log(
                  'Login successful'
                );

                this.authService.saveToken(
                  response.token
                );

                this.router.navigate([
                  '/welcome'
                ]);

              }),

              catchError((error) => {

                console.error(
                  'Login failed:',
                  error
                );

                return EMPTY;
              })
            );
        }),

        takeUntilDestroyed(
          this.destroyRef
        )

      )
      .subscribe();
  }


  onLogin(): void {
    this.loginSubject.next();
  }


  revampFallback() {
    return this.constants;
  }

}