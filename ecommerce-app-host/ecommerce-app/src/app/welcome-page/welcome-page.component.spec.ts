import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomePageComponent } from './welcome-page.component';
import { DialogModule } from 'primeng/dialog';
import { CarouselModule } from 'primeng/carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('WelcomePageComponent', () => {
  let component: WelcomePageComponent;
  let fixture: ComponentFixture<WelcomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomePageComponent],
      imports: [
        DialogModule,
        BrowserAnimationsModule,
        CarouselModule
      ]
    });
    fixture = TestBed.createComponent(WelcomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
