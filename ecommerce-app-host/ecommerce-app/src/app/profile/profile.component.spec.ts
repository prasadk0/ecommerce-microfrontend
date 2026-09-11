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

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {

  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [
        ProfileComponent
      ],

      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture =
      TestBed.createComponent(ProfileComponent);

    component =
      fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component)
      .toBeTruthy();

  });

  it('should return fallback constants', () => {

    const fallback =
      component.revampFallback();

    expect(fallback)
      .toBeTruthy();

  });

  it('should render profile component', () => {

    const element =
      fixture.nativeElement as HTMLElement;

    expect(element)
      .toBeTruthy();

  });

});