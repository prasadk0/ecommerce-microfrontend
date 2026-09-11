import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  const mockConstantsJson = {
    FORGOT_PASSWORD_CONSTANTS: {
      PAGE: {
        TITLE: 'Forgot Password',
        DESCRIPTION: 'Enter your email to reset your password'
      },
      FORM: {
        EMAIL_LABEL: 'Email',
        EMAIL_PLACEHOLDER: 'Enter your email',
        SUBMIT: 'Send Reset Link',
        BACK_TO_LOGIN: 'Back to Login'
      },
      VALIDATION: {
        EMAIL_REQUIRED: 'Email is required.',
        EMAIL_INVALID: 'Please enter a valid email address.'
      },
      SUCCESS: {
        TITLE: 'Reset Link Sent',
        MESSAGE: 'A password reset link has been sent to your email.'
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent]
    });

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
