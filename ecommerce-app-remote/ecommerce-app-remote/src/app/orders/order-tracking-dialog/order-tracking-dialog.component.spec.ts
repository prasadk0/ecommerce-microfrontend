import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTrackingDialogComponent } from './order-tracking-dialog.component';

describe('OrderTrackingDialogComponent', () => {
  let component: OrderTrackingDialogComponent;
  let fixture: ComponentFixture<OrderTrackingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderTrackingDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderTrackingDialogComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
