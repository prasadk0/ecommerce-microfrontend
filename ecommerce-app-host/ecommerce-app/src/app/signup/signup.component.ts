import { Component, DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  EMPTY,
  Subject,
  catchError,
  exhaustMap,
  tap
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { SIGNUP_CONSTANTS } from '../app.constant';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  private readonly destroyRef = inject(DestroyRef);

  private readonly signupSubject = new Subject<void>();

  signupData = {
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    terms: false
  };

  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {

    this.signupSubject
      .pipe(

        // Prevent multiple signup API calls
        exhaustMap(() => this.signupUser()),

        // Automatically unsubscribe when component is destroyed
        takeUntilDestroyed(this.destroyRef)

      )
      .subscribe();
  }

  onSignup(): void {
    this.signupSubject.next();
  }

  private signupUser() {

    if (
      this.signupData.password !==
      this.signupData.confirmPassword
    ) {
      alert(
        this.revampFallback().PASSWORD_NOT_MATCH
      );

      return EMPTY;
    }

    const requestPayload = {
      name: this.signupData.fullName,
      username: this.signupData.username,
      email: this.signupData.email,
      password: this.signupData.password
    };

    return this.authService.signup(requestPayload).pipe(

      tap((response) => {

        console.log('Signup successful:', response);

        this.router.navigate(['/login']);

      }),

      catchError((error) => {

        console.error('Signup failed:', error);

        alert(
          "Signup Failed!"
        );

        return EMPTY;
      })
    );
  }

  revampFallback() {
    return SIGNUP_CONSTANTS;
  }
}