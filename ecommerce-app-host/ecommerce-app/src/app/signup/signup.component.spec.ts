import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError, Subject } from 'rxjs';

import { SignupComponent } from './signup.component';
import { AuthService } from '../services/auth.service';
import { SIGNUP_CONSTANTS } from '../app.constant';

describe('SignupComponent', () => {

  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {

    authServiceSpy = jasmine.createSpyObj(
      'AuthService',
      ['signup']
    );

    routerSpy = jasmine.createSpyObj(
      'Router',
      ['navigate']
    );

    await TestBed.configureTestingModule({

      imports: [
        FormsModule
      ],

      declarations: [
        SignupComponent
      ],

      providers: [
        {
          provide: AuthService,
          useValue: authServiceSpy
        },
        {
          provide: Router,
          useValue: routerSpy
        }
      ]

    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });


  // ==================================================
  // Component
  // ==================================================

  it('should create', () => {

    expect(component).toBeTruthy();

  });


  // ==================================================
  // Initial signup data
  // ==================================================

  it('should initialize signupData correctly', () => {

    expect(component.signupData).toEqual({
      fullName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      terms: false
    });

  });


  // ==================================================
  // Initial password visibility
  // ==================================================

  it('should hide password initially', () => {

    expect(component.showPassword).toBeFalse();

  });


  // ==================================================
  // Initial confirm password visibility
  // ==================================================

  it('should hide confirm password initially', () => {

    expect(component.showConfirmPassword).toBeFalse();

  });


  // ==================================================
  // Password visibility
  // ==================================================

  it('should toggle password visibility', () => {

    expect(component.showPassword).toBeFalse();

    component.showPassword = true;

    expect(component.showPassword).toBeTrue();

    component.showPassword = false;

    expect(component.showPassword).toBeFalse();

  });


  // ==================================================
  // Confirm password visibility
  // ==================================================

  it('should toggle confirm password visibility', () => {

    expect(component.showConfirmPassword).toBeFalse();

    component.showConfirmPassword = true;

    expect(component.showConfirmPassword).toBeTrue();

    component.showConfirmPassword = false;

    expect(component.showConfirmPassword).toBeFalse();

  });


  // ==================================================
  // Constants
  // ==================================================

  it('should return SIGNUP_CONSTANTS', () => {

    expect(component.revampFallback())
      .toBe(SIGNUP_CONSTANTS);

  });


  // ==================================================
  // Password mismatch
  // ==================================================

  it('should show alert when passwords do not match', () => {

    spyOn(window, 'alert');

    component.signupData.password = 'password123';
    component.signupData.confirmPassword = 'password456';

    component.onSignup();

    expect(window.alert)
      .toHaveBeenCalledWith(
        SIGNUP_CONSTANTS.PASSWORD_NOT_MATCH
      );

    expect(authServiceSpy.signup)
      .not.toHaveBeenCalled();

  });


  // ==================================================
  // Successful signup
  // ==================================================

  it('should call AuthService.signup with correct payload', () => {

    authServiceSpy.signup.and.returnValue(
      of({
        message: 'Signup successful'
      })
    );

    component.signupData.fullName = 'Prasad Khairnar';
    component.signupData.username = 'prasad';
    component.signupData.email = 'prasad@gmail.com';
    component.signupData.password = 'password123';
    component.signupData.confirmPassword = 'password123';
    component.signupData.terms = true;

    component.onSignup();

    expect(authServiceSpy.signup)
      .toHaveBeenCalledWith({
        name: 'Prasad Khairnar',
        username: 'prasad',
        email: 'prasad@gmail.com',
        password: 'password123'
      });

  });


  // ==================================================
  // Successful signup navigation
  // ==================================================

  it('should navigate to login page after successful signup', () => {

    authServiceSpy.signup.and.returnValue(
      of({
        message: 'Signup successful'
      })
    );

    component.signupData.fullName = 'Prasad Khairnar';
    component.signupData.username = 'prasad';
    component.signupData.email = 'prasad@gmail.com';
    component.signupData.password = 'password123';
    component.signupData.confirmPassword = 'password123';
    component.signupData.terms = true;

    component.onSignup();

    expect(routerSpy.navigate)
      .toHaveBeenCalledWith(['/login']);

  });


  // ==================================================
  // Signup error
  // ==================================================

  it('should show alert when signup API fails', () => {

    spyOn(window, 'alert');
    spyOn(console, 'error');

    authServiceSpy.signup.and.returnValue(
      throwError(() => new Error('Signup failed'))
    );

    component.signupData.fullName = 'Prasad Khairnar';
    component.signupData.username = 'prasad';
    component.signupData.email = 'prasad@gmail.com';
    component.signupData.password = 'password123';
    component.signupData.confirmPassword = 'password123';
    component.signupData.terms = true;

    component.onSignup();

    expect(window.alert)
      .toHaveBeenCalledWith('Signup Failed!');

  });


  // ==================================================
  // Signup error should not navigate
  // ==================================================

  it('should not navigate when signup API fails', () => {

    spyOn(window, 'alert');
    spyOn(console, 'error');

    authServiceSpy.signup.and.returnValue(
      throwError(() => new Error('Signup failed'))
    );

    component.signupData.fullName = 'Prasad Khairnar';
    component.signupData.username = 'prasad';
    component.signupData.email = 'prasad@gmail.com';
    component.signupData.password = 'password123';
    component.signupData.confirmPassword = 'password123';
    component.signupData.terms = true;

    component.onSignup();

    expect(routerSpy.navigate)
      .not.toHaveBeenCalled();

  });


  // ==================================================
  // exhaustMap
  // ==================================================

  it('should ignore additional signup clicks while request is running', () => {

    const signupResponse$ =
      new Subject<{ message: string }>();

    authServiceSpy.signup.and.returnValue(
      signupResponse$
    );

    component.signupData.fullName = 'Prasad Khairnar';
    component.signupData.username = 'prasad';
    component.signupData.email = 'prasad@gmail.com';
    component.signupData.password = 'password123';
    component.signupData.confirmPassword = 'password123';
    component.signupData.terms = true;


    // First click starts the request
    component.onSignup();


    // These clicks happen while request is still running
    component.onSignup();
    component.onSignup();


    // Only first request should be sent
    expect(authServiceSpy.signup)
      .toHaveBeenCalledTimes(1);


    // Complete first request
    signupResponse$.next({
      message: 'Signup successful'
    });

    signupResponse$.complete();

  });


  // ==================================================
  // Signup should work when passwords match
  // ==================================================

  it('should call signup when passwords match', () => {

    authServiceSpy.signup.and.returnValue(
      of({
        message: 'Signup successful'
      })
    );

    component.signupData.password = 'password123';
    component.signupData.confirmPassword = 'password123';

    component.onSignup();

    expect(authServiceSpy.signup)
      .toHaveBeenCalled();

  });


  // ==================================================
  // Password mismatch should not call signup
  // ==================================================

  it('should not call signup when passwords do not match', () => {

    spyOn(window, 'alert');

    component.signupData.password = 'password123';
    component.signupData.confirmPassword = 'differentPassword';

    component.onSignup();

    expect(authServiceSpy.signup)
      .not.toHaveBeenCalled();

  });


  // ==================================================
  // Request payload should not contain confirmPassword
  // ==================================================

  it('should not send confirmPassword in signup payload', () => {

    authServiceSpy.signup.and.returnValue(
      of({
        message: 'Signup successful'
      })
    );

    component.signupData.fullName = 'Prasad';
    component.signupData.username = 'prasad';
    component.signupData.email = 'prasad@gmail.com';
    component.signupData.password = 'password123';
    component.signupData.confirmPassword = 'password123';

    component.onSignup();

    const payload =
      authServiceSpy.signup.calls.mostRecent().args[0];

    expect(payload).toEqual({
      name: 'Prasad',
      username: 'prasad',
      email: 'prasad@gmail.com',
      password: 'password123'
    });

    // Jasmine-compatible check
    expect(payload.confirmPassword)
      .toBeUndefined();

  });

});