import {
  Component,
  DestroyRef,
  inject
} from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

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

  readonly signupForm: FormGroup;

  submitted = false;

  showPassword = false;
  showConfirmPassword = false;


  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {

    this.signupForm = this.fb.group(
      {
        fullName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-Z ]+$/)
          ]
        ],

        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern(/^[a-zA-Z0-9_]+$/)
          ]
        ],

        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/
            )
          ]
        ],

        confirmPassword: [
          '',
          [
            Validators.required
          ]
        ],

        terms: [
          false,
          [
            Validators.requiredTrue
          ]
        ]
      },
      {
        validators: this.passwordMatchValidator()
      }
    );


    this.signupSubject
      .pipe(
        exhaustMap(() => this.signupUser()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }


  onSignup(): void {

    this.submitted = true;

    if (this.signupForm.invalid) {

      this.signupForm.markAllAsTouched();

      return;
    }

    this.signupSubject.next();
  }


  private signupUser() {

    if (this.signupForm.invalid) {
      return EMPTY;
    }

    const formValue = this.signupForm.getRawValue();

    const requestPayload = {
      name: formValue.fullName.trim(),
      username: formValue.username.trim(),
      email: formValue.email.trim(),
      password: formValue.password
    };


    return this.authService.signup(requestPayload).pipe(

      tap((response) => {

        console.log('Signup successful:', response);

        this.router.navigate(['/login']);

      }),

      catchError((error) => {

        console.error('Signup failed:', error);

        return EMPTY;
      })
    );
  }


  private passwordMatchValidator(): ValidatorFn {

    return (
      control: AbstractControl
    ): ValidationErrors | null => {

      const password = control.get('password')?.value;

      const confirmPassword =
        control.get('confirmPassword')?.value;

      if (!password || !confirmPassword) {
        return null;
      }

      return password === confirmPassword
        ? null
        : {
            passwordMismatch: true
          };
    };
  }


  isFieldInvalid(
    fieldName: string
  ): boolean {

    const control =
      this.signupForm.get(fieldName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }


  hasError(
    fieldName: string,
    errorName: string
  ): boolean {

    const control =
      this.signupForm.get(fieldName);

    return !!(
      control &&
      control.hasError(errorName) &&
      (control.touched || this.submitted)
    );
  }


  hasPasswordMismatch(): boolean {

    const confirmPassword =
      this.signupForm.get('confirmPassword');

    return !!(
      confirmPassword &&
      confirmPassword.value &&
      this.signupForm.hasError('passwordMismatch') &&
      (confirmPassword.touched || this.submitted)
    );
  }


  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }


  toggleConfirmPassword(): void {
    this.showConfirmPassword =
      !this.showConfirmPassword;
  }


  revampFallback() {
    return SIGNUP_CONSTANTS;
  }
}