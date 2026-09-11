import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError, Subject } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { LOGIN_CONSTANTS } from '../app.constant';

describe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let authServiceSpy: {
    login: jest.Mock;
    saveToken: jest.Mock;
  };

  let routerSpy: {
    navigate: jest.Mock;
  };

  beforeEach(async () => {

    authServiceSpy = {
      login: jest.fn(),
      saveToken: jest.fn()
    };

    routerSpy = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({

      imports: [
        FormsModule
      ],

      declarations: [
        LoginComponent
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

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });


  // --------------------------------------------------
  // Component creation
  // --------------------------------------------------

  it('should create the component', () => {

    expect(component).toBeTruthy();

  });


  // --------------------------------------------------
  // Initial login data
  // --------------------------------------------------

  it('should initialize loginData correctly', () => {

    expect(component.loginData).toEqual({
      email: '',
      password: '',
      rememberMe: false
    });

  });


  // --------------------------------------------------
  // Initial password visibility
  // --------------------------------------------------

  it('should hide password initially', () => {

    expect(component.showPassword).toBe(false);

  });


  // --------------------------------------------------
  // Password visibility
  // --------------------------------------------------

  it('should toggle password visibility', () => {

    expect(component.showPassword).toBe(false);

    component.showPassword = true;

    expect(component.showPassword).toBe(true);

    component.showPassword = false;

    expect(component.showPassword).toBe(false);

  });


  // --------------------------------------------------
  // Login service call
  // --------------------------------------------------

  it('should call AuthService.login when onLogin is called', () => {

    authServiceSpy.login.mockReturnValue(
      of({
        token: 'test-token'
      })
    );

    component.loginData.email = 'test@gmail.com';
    component.loginData.password = 'password123';

    component.onLogin();

    expect(authServiceSpy.login)
      .toHaveBeenCalled();

  });


  // --------------------------------------------------
  // Login credentials
  // --------------------------------------------------

  it('should send correct username and password to login service', () => {

    authServiceSpy.login.mockReturnValue(
      of({
        token: 'test-token'
      })
    );

    component.loginData.email = 'test@gmail.com';
    component.loginData.password = 'password123';

    component.onLogin();

    expect(authServiceSpy.login)
      .toHaveBeenCalledWith({
        username: 'test@gmail.com',
        password: 'password123'
      });

  });


  // --------------------------------------------------
  // Save token
  // --------------------------------------------------

  it('should save token after successful login', () => {

    authServiceSpy.login.mockReturnValue(
      of({
        token: 'test-token'
      })
    );

    component.loginData.email = 'test@gmail.com';
    component.loginData.password = 'password123';

    component.onLogin();

    expect(authServiceSpy.saveToken)
      .toHaveBeenCalledWith('test-token');

  });


  // --------------------------------------------------
  // Navigation
  // --------------------------------------------------

  it('should navigate to welcome page after successful login', () => {

    authServiceSpy.login.mockReturnValue(
      of({
        token: 'test-token'
      })
    );

    component.loginData.email = 'test@gmail.com';
    component.loginData.password = 'password123';

    component.onLogin();

    expect(routerSpy.navigate)
      .toHaveBeenCalledWith(['/welcome']);

  });


  // --------------------------------------------------
  // Login failure
  // --------------------------------------------------

  it('should not navigate when login fails', () => {

    jest.spyOn(console, 'error')
      .mockImplementation(() => {});

    authServiceSpy.login.mockReturnValue(
      throwError(() => new Error('Invalid credentials'))
    );

    component.loginData.email = 'test@gmail.com';
    component.loginData.password = 'wrong-password';

    component.onLogin();

    expect(routerSpy.navigate)
      .not.toHaveBeenCalled();

    expect(authServiceSpy.saveToken)
      .not.toHaveBeenCalled();

    jest.restoreAllMocks();

  });


  // --------------------------------------------------
  // Constants
  // --------------------------------------------------

  it('should return LOGIN_CONSTANTS', () => {

    expect(component.revampFallback())
      .toBe(LOGIN_CONSTANTS);

  });


  // --------------------------------------------------
  // exhaustMap
  // --------------------------------------------------

  it('should ignore additional login clicks while request is running', () => {

    // Create an Observable that does NOT complete immediately.
    const loginResponse$ = new Subject<{ token: string }>();

    authServiceSpy.login.mockReturnValue(
      loginResponse$
    );

    component.loginData.email = 'test@gmail.com';
    component.loginData.password = 'password123';


    // First click starts the login request.
    component.onLogin();


    // These clicks happen while the first request is still running.
    component.onLogin();
    component.onLogin();


    // exhaustMap should ignore the second and third clicks.
    expect(authServiceSpy.login)
      .toHaveBeenCalledTimes(1);


    // Now complete the first request.
    loginResponse$.next({
      token: 'test-token'
    });

    loginResponse$.complete();

  });

});

