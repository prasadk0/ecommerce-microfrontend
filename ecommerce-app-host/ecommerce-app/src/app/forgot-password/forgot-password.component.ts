import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import constantsJson from '../../assets/app-fallback.json';



import {
  deepMerge
} from '../utils/deep-merge';
import { FORGOT_PASSWORD_CONSTANTS } from '../app.constant';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent {

  readonly constants = deepMerge(
    FORGOT_PASSWORD_CONSTANTS,
    constantsJson.FORGOT_PASSWORD_CONSTANTS
  );

  forgotPasswordForm: FormGroup;

  submitted = false;
  emailSent = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {

    this.forgotPasswordForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ]
  });
  }

  revampFallback() {
    return this.constants;
  }

  getControl(controlName: string) {
    return this.forgotPasswordForm.get(controlName);
  }

  isInvalid(controlName: string): boolean {

    const control = this.getControl(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }

  sendResetLink(): void {

    this.submitted = true;

    if (this.forgotPasswordForm.invalid) {
      this.cdr.markForCheck();
      return;
    }
    this.emailSent = true;

    this.cdr.markForCheck();
  }

  backToLogin(): void {

    this.router.navigate(['/login']);
  }
}