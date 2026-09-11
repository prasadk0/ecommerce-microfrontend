import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  ReactiveFormsModule
} from '@angular/forms';

import {
  RouterTestingModule
} from '@angular/router/testing';

import {
  Router
} from '@angular/router';

import {
  of,
  throwError
} from 'rxjs';

import { SignupComponent } from './signup.component';
import { AuthService } from '../services/auth.service';

describe('SignupComponent', () => {

  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {

    const authServiceSpy =
      jasmine.createSpyObj<AuthService>(
        'AuthService',
        ['signup']
      );

    await TestBed.configureTestingModule({
      declarations: [
        SignupComponent
      ],

      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],

      providers: [
        {
          provide: AuthService,
          useValue: authServiceSpy
        }
      ]
    }).compileComponents();

    fixture =
      TestBed.createComponent(SignupComponent);

    component =
      fixture.componentInstance;

    authService =
      TestBed.inject(
        AuthService
      ) as jasmine.SpyObj<AuthService>;

    router =
      TestBed.inject(Router);

    fixture.detectChanges();
  });


  // ============================================================
  // HELPER
  // ============================================================

  function setValidSignupForm(): void {

    component.signupForm.patchValue({
      fullName: 'John Doe',
      username: 'john123',
      email: 'john@test.com',
      password: 'Password@123',
      confirmPassword: 'Password@123',
      terms: true
    });

    component.signupForm.updateValueAndValidity();
  }


  // ============================================================
  // COMPONENT
  // ============================================================

  it('should create', () => {

    expect(component)
      .toBeTruthy();

  });


  // ============================================================
  // INITIAL FORM
  // ============================================================

  it('should initialize signup form', () => {

    expect(component.signupForm)
      .toBeTruthy();

    expect(component.signupForm.contains('fullName'))
      .toBeTrue();

    expect(component.signupForm.contains('username'))
      .toBeTrue();

    expect(component.signupForm.contains('email'))
      .toBeTrue();

    expect(component.signupForm.contains('password'))
      .toBeTrue();

    expect(component.signupForm.contains('confirmPassword'))
      .toBeTrue();

    expect(component.signupForm.contains('terms'))
      .toBeTrue();

  });


  it('should initialize form as invalid', () => {

    expect(component.signupForm.invalid)
      .toBeTrue();

  });


  // ============================================================
  // FULL NAME
  // ============================================================

  it('should make fullName required', () => {

    const control =
      component.signupForm.get('fullName');

    control?.setValue('');

    expect(control?.hasError('required'))
      .toBeTrue();

  });


  it('should reject fullName shorter than 3 characters', () => {

    const control =
      component.signupForm.get('fullName');

    control?.setValue('Jo');

    expect(control?.hasError('minlength'))
      .toBeTrue();

  });


  it('should reject fullName longer than 50 characters', () => {

    const control =
      component.signupForm.get('fullName');

    control?.setValue('A'.repeat(51));

    expect(control?.hasError('maxlength'))
      .toBeTrue();

  });


  it('should reject fullName containing numbers', () => {

    const control =
      component.signupForm.get('fullName');

    control?.setValue('John123');

    expect(control?.hasError('pattern'))
      .toBeTrue();

  });


  it('should accept valid fullName', () => {

    const control =
      component.signupForm.get('fullName');

    control?.setValue('John Doe');

    expect(control?.valid)
      .toBeTrue();

  });


  // ============================================================
  // USERNAME
  // ============================================================

  it('should make username required', () => {

    const control =
      component.signupForm.get('username');

    control?.setValue('');

    expect(control?.hasError('required'))
      .toBeTrue();

  });


  it('should reject username shorter than 3 characters', () => {

    const control =
      component.signupForm.get('username');

    control?.setValue('ab');

    expect(control?.hasError('minlength'))
      .toBeTrue();

  });


  it('should reject username longer than 20 characters', () => {

    const control =
      component.signupForm.get('username');

    control?.setValue('a'.repeat(21));

    expect(control?.hasError('maxlength'))
      .toBeTrue();

  });


  it('should reject username containing special characters', () => {

    const control =
      component.signupForm.get('username');

    control?.setValue('john@test');

    expect(control?.hasError('pattern'))
      .toBeTrue();

  });


  it('should accept valid username', () => {

    const control =
      component.signupForm.get('username');

    control?.setValue('john_123');

    expect(control?.valid)
      .toBeTrue();

  });


  // ============================================================
  // EMAIL
  // ============================================================

  it('should make email required', () => {

    const control =
      component.signupForm.get('email');

    control?.setValue('');

    expect(control?.hasError('required'))
      .toBeTrue();

  });


  it('should reject invalid email', () => {

    const control =
      component.signupForm.get('email');

    control?.setValue('invalid-email');

    expect(control?.hasError('email'))
      .toBeTrue();

  });


  it('should accept valid email', () => {

    const control =
      component.signupForm.get('email');

    control?.setValue('john@test.com');

    expect(control?.valid)
      .toBeTrue();

  });


  // ============================================================
  // PASSWORD
  // ============================================================

  it('should make password required', () => {

    const control =
      component.signupForm.get('password');

    control?.setValue('');

    expect(control?.hasError('required'))
      .toBeTrue();

  });


  it('should reject password shorter than 8 characters', () => {

    const control =
      component.signupForm.get('password');

    control?.setValue('Pass@1');

    expect(control?.hasError('minlength'))
      .toBeTrue();

  });


  it('should reject password longer than 30 characters', () => {

    const control =
      component.signupForm.get('password');

    control?.setValue(
      'Password@123456789012345678901234'
    );

    expect(control?.hasError('maxlength'))
      .toBeTrue();

  });


  it('should reject password without lowercase character', () => {

    const control =
      component.signupForm.get('password');

    control?.setValue('PASSWORD@123');

    expect(control?.hasError('pattern'))
      .toBeTrue();

  });


  it('should reject password without uppercase character', () => {

    const control =
      component.signupForm.get('password');

    control?.setValue('password@123');

    expect(control?.hasError('pattern'))
      .toBeTrue();

  });


  it('should reject password without number', () => {

    const control =
      component.signupForm.get('password');

    control?.setValue('Password@abc');

    expect(control?.hasError('pattern'))
      .toBeTrue();

  });


  it('should reject password without special character', () => {

    const control =
      component.signupForm.get('password');

    control?.setValue('Password123');

    expect(control?.hasError('pattern'))
      .toBeTrue();

  });


  it('should accept valid password', () => {

    const control =
      component.signupForm.get('password');

    control?.setValue('Password@123');

    expect(control?.valid)
      .toBeTrue();

  });


  // ============================================================
  // CONFIRM PASSWORD
  // ============================================================

  it('should make confirmPassword required', () => {

    const control =
      component.signupForm.get('confirmPassword');

    control?.setValue('');

    expect(control?.hasError('required'))
      .toBeTrue();

  });


  it('should detect password mismatch', () => {

    component.signupForm.patchValue({
      password: 'Password@123',
      confirmPassword: 'Password@456'
    });

    component.signupForm.updateValueAndValidity();

    expect(
      component.signupForm.hasError('passwordMismatch')
    ).toBeTrue();

  });


  it('should accept matching passwords', () => {

    component.signupForm.patchValue({
      password: 'Password@123',
      confirmPassword: 'Password@123'
    });

    component.signupForm.updateValueAndValidity();

    expect(
      component.signupForm.hasError('passwordMismatch')
    ).toBeFalse();

  });


  // ============================================================
  // TERMS
  // ============================================================

  it('should require terms to be accepted', () => {

    const control =
      component.signupForm.get('terms');

    control?.setValue(false);

    expect(control?.hasError('required'))
      .toBeTrue();

  });


  it('should accept terms when checked', () => {

    const control =
      component.signupForm.get('terms');

    control?.setValue(true);

    expect(control?.valid)
      .toBeTrue();

  });


  // ============================================================
  // isFieldInvalid
  // ============================================================

  it('should return false when field is valid and untouched', () => {

    component.signupForm
      .get('email')
      ?.setValue('john@test.com');

    expect(
      component.isFieldInvalid('email')
    ).toBeFalse();

  });


  it('should return true when field is invalid and touched', () => {

    const control =
      component.signupForm.get('email');

    control?.setValue('');
    control?.markAsTouched();

    expect(
      component.isFieldInvalid('email')
    ).toBeTrue();

  });


  it('should return true when field is invalid after submit', () => {

    component.submitted = true;

    component.signupForm
      .get('email')
      ?.setValue('');

    expect(
      component.isFieldInvalid('email')
    ).toBeTrue();

  });


  // ============================================================
  // hasError
  // ============================================================

  it('should detect field error', () => {

    const control =
      component.signupForm.get('email');

    control?.setValue('');
    control?.markAsTouched();

    expect(
      component.hasError('email', 'required')
    ).toBeTrue();

  });


  it('should return false when requested error does not exist', () => {

    const control =
      component.signupForm.get('email');

    control?.setValue('john@test.com');
    control?.markAsTouched();

    expect(
      component.hasError('email', 'required')
    ).toBeFalse();

  });


  // ============================================================
  // PASSWORD MISMATCH
  // ============================================================

  it('should return false when confirm password is empty', () => {

    component.signupForm.patchValue({
      password: 'Password@123',
      confirmPassword: ''
    });

    expect(
      component.hasPasswordMismatch()
    ).toBeFalse();

  });


  it('should return true when passwords do not match', () => {

    const confirmPassword =
      component.signupForm.get('confirmPassword');

    component.signupForm.patchValue({
      password: 'Password@123',
      confirmPassword: 'Password@456'
    });

    confirmPassword?.markAsTouched();

    component.signupForm.updateValueAndValidity();

    expect(
      component.hasPasswordMismatch()
    ).toBeTrue();

  });


  it('should return false when passwords match', () => {

    const confirmPassword =
      component.signupForm.get('confirmPassword');

    component.signupForm.patchValue({
      password: 'Password@123',
      confirmPassword: 'Password@123'
    });

    confirmPassword?.markAsTouched();

    component.signupForm.updateValueAndValidity();

    expect(
      component.hasPasswordMismatch()
    ).toBeFalse();

  });


  // ============================================================
  // PASSWORD TOGGLE
  // ============================================================

  it('should toggle password visibility', () => {

    expect(component.showPassword)
      .toBeFalse();

    component.togglePassword();

    expect(component.showPassword)
      .toBeTrue();

    component.togglePassword();

    expect(component.showPassword)
      .toBeFalse();

  });


  it('should toggle confirm password visibility', () => {

    expect(component.showConfirmPassword)
      .toBeFalse();

    component.toggleConfirmPassword();

    expect(component.showConfirmPassword)
      .toBeTrue();

    component.toggleConfirmPassword();

    expect(component.showConfirmPassword)
      .toBeFalse();

  });


  // ============================================================
  // onSignup - INVALID
  // ============================================================

  it('should mark form as submitted when signup is called', () => {

    component.onSignup();

    expect(component.submitted)
      .toBeTrue();

  });


  it('should mark all fields as touched when form is invalid', () => {

    const markAllAsTouchedSpy =
      spyOn(
        component.signupForm,
        'markAllAsTouched'
      ).and.callThrough();

    component.onSignup();

    expect(
      markAllAsTouchedSpy
    ).toHaveBeenCalled();

  });


  it('should not call signup API when form is invalid', () => {

    component.onSignup();

    expect(
      authService.signup
    ).not.toHaveBeenCalled();

  });


  // ============================================================
  // onSignup - VALID
  // ============================================================

  it('should call signup API when form is valid', () => {

    setValidSignupForm();

    authService.signup.and.returnValue(
      of({
        message: 'Signup successful'
      })
    );

    component.onSignup();

    expect(
      authService.signup
    ).toHaveBeenCalledWith({
      name: 'John Doe',
      username: 'john123',
      email: 'john@test.com',
      password: 'Password@123'
    });

  });


  it('should trim fullName before sending signup request', () => {

    component.signupForm.patchValue({
      fullName: '  John Doe  ',
      username: 'john123',
      email: 'john@test.com',
      password: 'Password@123',
      confirmPassword: 'Password@123',
      terms: true
    });

    authService.signup.and.returnValue(
      of({
        message: 'Signup successful'
      })
    );

    component.onSignup();

    expect(
      authService.signup
    ).toHaveBeenCalledWith({
      name: 'John Doe',
      username: 'john123',
      email: 'john@test.com',
      password: 'Password@123'
    });

  });


  it('should trim username before sending signup request', () => {

    component.signupForm.patchValue({
      fullName: 'John Doe',
      username: '  john123  ',
      email: 'john@test.com',
      password: 'Password@123',
      confirmPassword: 'Password@123',
      terms: true
    });

    authService.signup.and.returnValue(
      of({
        message: 'Signup successful'
      })
    );

    component.onSignup();

    expect(
      authService.signup
    ).toHaveBeenCalledWith({
      name: 'John Doe',
      username: 'john123',
      email: 'john@test.com',
      password: 'Password@123'
    });

  });


  // ============================================================
  // SIGNUP SUCCESS
  // ============================================================

  it('should navigate to login after successful signup', () => {

    setValidSignupForm();

    authService.signup.and.returnValue(
      of({
        message: 'Signup successful'
      })
    );

    const navigateSpy =
      spyOn(router, 'navigate')
        .and.returnValue(
          Promise.resolve(true)
        );

    component.onSignup();

    expect(
      navigateSpy
    ).toHaveBeenCalledWith(['/login']);

  });


  // ============================================================
  // SIGNUP ERROR
  // ============================================================

  it('should handle signup error without throwing', () => {

    setValidSignupForm();

    authService.signup.and.returnValue(
      throwError(() => ({
        status: 500,
        message: 'Signup failed'
      }))
    );

    expect(() => {
      component.onSignup();
    }).not.toThrow();

    expect(
      authService.signup
    ).toHaveBeenCalled();

  });


  // ============================================================
  // FALLBACK
  // ============================================================

  it('should return fallback constants', () => {

    const fallback =
      component.revampFallback();

    expect(fallback)
      .toBeTruthy();

    expect(fallback.PAGE_TITLE)
      .toBeTruthy();

    expect(fallback.PAGE_SUBTITLE)
      .toBeTruthy();

  });


  // ============================================================
  // TEMPLATE
  // ============================================================

  it('should render signup page', () => {

    const element =
      fixture.nativeElement as HTMLElement;

    expect(
      element.querySelector('.signup-page')
    ).toBeTruthy();

  });


  it('should render signup form', () => {

    const element =
      fixture.nativeElement as HTMLElement;

    expect(
      element.querySelector('form.signup-form')
    ).toBeTruthy();

  });


  it('should render full name input', () => {

    const element =
      fixture.nativeElement as HTMLElement;

    expect(
      element.querySelector('#fullName')
    ).toBeTruthy();

  });


  it('should render username input', () => {

    const element =
      fixture.nativeElement as HTMLElement;

    expect(
      element.querySelector('#username')
    ).toBeTruthy();

  });


  it('should render email input', () => {

    const element =
      fixture.nativeElement as HTMLElement;

    expect(
      element.querySelector('#email')
    ).toBeTruthy();

  });


  it('should render password input', () => {

    const element =
      fixture.nativeElement as HTMLElement;

    expect(
      element.querySelector('#password')
    ).toBeTruthy();

  });


  it('should render confirm password input', () => {

    const element =
      fixture.nativeElement as HTMLElement;

    expect(
      element.querySelector('#confirmPassword')
    ).toBeTruthy();

  });


  it('should render terms checkbox', () => {

    const element =
      fixture.nativeElement as HTMLElement;

    expect(
      element.querySelector('#terms')
    ).toBeTruthy();

  });


  it('should disable signup button when form is invalid', () => {

    const element =
      fixture.nativeElement as HTMLElement;

    const button =
      element.querySelector(
        '.signup-btn'
      ) as HTMLButtonElement;

    expect(button.disabled)
      .toBeTrue();

  });


  it('should enable signup button when form is valid', () => {

    setValidSignupForm();

    fixture.detectChanges();

    const element =
      fixture.nativeElement as HTMLElement;

    const button =
      element.querySelector(
        '.signup-btn'
      ) as HTMLButtonElement;

    expect(button.disabled)
      .toBeFalse();

  });

});