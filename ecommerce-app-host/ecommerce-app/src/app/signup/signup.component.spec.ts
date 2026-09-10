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

  let authServiceSpy: {
    signup: jest.Mock;
  };

  let routerSpy: {
    navigate: jest.Mock;
  };


  beforeEach(async () => {

    authServiceSpy = {
      signup: jest.fn()
    };

    routerSpy = {
      navigate: jest.fn()
    };


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

    expect(component.showPassword)
      .toBe(false);

  });


  // ==================================================
  // Initial confirm password visibility
  // ==================================================

  it('should hide confirm password initially', () => {

    expect(component.showConfirmPassword)
      .toBe(false);

  });


  // ==================================================
  // Password visibility
  // ==================================================

  it('should toggle password visibility', () => {

    expect(component.showPassword)
      .toBe(false);

    component.showPassword = true;

    expect(component.showPassword)
      .toBe(true);

    component.showPassword = false;

    expect(component.showPassword)
      .toBe(false);

  });


  // ==================================================
  // Confirm password visibility
  // ==================================================

  it('should toggle confirm password visibility', () => {

    expect(component.showConfirmPassword)
      .toBe(false);

    component.showConfirmPassword = true;

    expect(component.showConfirmPassword)
      .toBe(true);

    component.showConfirmPassword = false;

    expect(component.showConfirmPassword)
      .toBe(false);

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

    const alertSpy = jest
      .spyOn(window, 'alert')
      .mockImplementation(() => {});


    component.signupData.password =
      'password123';

    component.signupData.confirmPassword =
      'password456';


    component.onSignup();


    expect(alertSpy)
      .toHaveBeenCalledWith(
        SIGNUP_CONSTANTS.PASSWORD_NOT_MATCH
      );


    expect(authServiceSpy.signup)
      .not.toHaveBeenCalled();


    alertSpy.mockRestore();

  });


  // ==================================================
  // Successful signup
  // ==================================================

  it('should call AuthService.signup with correct payload', () => {

    authServiceSpy.signup.mockReturnValue(
      of({
        message: 'Signup successful'
      })
    );


    component.signupData.fullName =
      'Prasad Khairnar';

    component.signupData.username =
      'prasad';

    component.signupData.email =
      'prasad@gmail.com';

    component.signupData.password =
      'password123';

    component.signupData.confirmPassword =
      'password123';

    component.signupData.terms =
      true;


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

    authServiceSpy.signup.mockReturnValue(
      of({
        message: 'Signup successful'
      })
    );


    component.signupData.fullName =
      'Prasad Khairnar';

    component.signupData.username =
      'prasad';

    component.signupData.email =
      'prasad@gmail.com';

    component.signupData.password =
      'password123';

    component.signupData.confirmPassword =
      'password123';

    component.signupData.terms =
      true;


    component.onSignup();


    expect(routerSpy.navigate)
      .toHaveBeenCalledWith([
        '/login'
      ]);

  });


  // ==================================================
  // Signup error
  // ==================================================

  it('should show alert when signup API fails', () => {

    const alertSpy = jest
      .spyOn(window, 'alert')
      .mockImplementation(() => {});


    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});


    authServiceSpy.signup.mockReturnValue(
      throwError(() =>
        new Error('Signup failed')
      )
    );


    component.signupData.fullName =
      'Prasad Khairnar';

    component.signupData.username =
      'prasad';

    component.signupData.email =
      'prasad@gmail.com';

    component.signupData.password =
      'password123';

    component.signupData.confirmPassword =
      'password123';

    component.signupData.terms =
      true;


    component.onSignup();


    expect(alertSpy)
      .toHaveBeenCalledWith(
        'Signup Failed!'
      );


    alertSpy.mockRestore();
    consoleSpy.mockRestore();

  });


  // ==================================================
  // Signup error should not navigate
  // ==================================================

  it('should not navigate when signup API fails', () => {

    const alertSpy = jest
      .spyOn(window, 'alert')
      .mockImplementation(() => {});


    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});


    authServiceSpy.signup.mockReturnValue(
      throwError(() =>
        new Error('Signup failed')
      )
    );


    component.signupData.fullName =
      'Prasad Khairnar';

    component.signupData.username =
      'prasad';

    component.signupData.email =
      'prasad@gmail.com';

    component.signupData.password =
      'password123';

    component.signupData.confirmPassword =
      'password123';

    component.signupData.terms =
      true;


    component.onSignup();


    expect(routerSpy.navigate)
      .not.toHaveBeenCalled();


    alertSpy.mockRestore();
    consoleSpy.mockRestore();

  });


  // ==================================================
  // exhaustMap
  // ==================================================

  it('should ignore additional signup clicks while request is running', () => {

    const signupResponse$ =
      new Subject<{ message: string }>();


    authServiceSpy.signup.mockReturnValue(
      signupResponse$
    );


    component.signupData.fullName =
      'Prasad Khairnar';

    component.signupData.username =
      'prasad';

    component.signupData.email =
      'prasad@gmail.com';

    component.signupData.password =
      'password123';

    component.signupData.confirmPassword =
      'password123';

    component.signupData.terms =
      true;


    // First click starts the request
    component.onSignup();


    // These clicks happen while request
    // is still running
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

    authServiceSpy.signup.mockReturnValue(
      of({
        message: 'Signup successful'
      })
    );


    component.signupData.password =
      'password123';

    component.signupData.confirmPassword =
      'password123';


    component.onSignup();


    expect(authServiceSpy.signup)
      .toHaveBeenCalled();

  });


  // ==================================================
  // Password mismatch should not call signup
  // ==================================================

  it('should not call signup when passwords do not match', () => {

    const alertSpy = jest
      .spyOn(window, 'alert')
      .mockImplementation(() => {});


    component.signupData.password =
      'password123';

    component.signupData.confirmPassword =
      'differentPassword';


    component.onSignup();


    expect(authServiceSpy.signup)
      .not.toHaveBeenCalled();


    alertSpy.mockRestore();

  });


  // ==================================================
  // Request payload should not contain confirmPassword
  // ==================================================

  it('should not send confirmPassword in signup payload', () => {

    authServiceSpy.signup.mockReturnValue(
      of({
        message: 'Signup successful'
      })
    );


    component.signupData.fullName =
      'Prasad';

    component.signupData.username =
      'prasad';

    component.signupData.email =
      'prasad@gmail.com';

    component.signupData.password =
      'password123';

    component.signupData.confirmPassword =
      'password123';


    component.onSignup();


    const payload =
      authServiceSpy.signup.mock.calls[0][0];


    expect(payload).toEqual({

      name: 'Prasad',
      username: 'prasad',
      email: 'prasad@gmail.com',
      password: 'password123'

    });


    expect(payload.confirmPassword)
      .toBeUndefined();

  });

});