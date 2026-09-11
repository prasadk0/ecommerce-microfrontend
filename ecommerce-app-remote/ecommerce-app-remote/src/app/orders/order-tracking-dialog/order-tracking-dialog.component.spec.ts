import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  OrderTrackingDialogComponent
} from './order-tracking-dialog.component';

import { Order } from '../orders/order.model';
import { DialogModule } from 'primeng/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';


/*
 * JSON fallback mock
 */
jest.mock(
  '../../../assets/app-fallback.json',
  () => ({
    __esModule: true,

    default: {
      ORDERS_CONSTANTS: {

        TRACKING: {

          HEADER: 'Order Tracking',

          TIMELINE: {

            ORDER_PLACED: {
              LABEL: 'Order Placed',
              DESCRIPTION: 'Your order has been placed.'
            },

            ORDER_CONFIRMED: {
              LABEL: 'Order Confirmed',
              DESCRIPTION: 'Your order has been confirmed.'
            },

            PACKED: {
              LABEL: 'Packed',
              DESCRIPTION: 'Your order has been packed.'
            },

            SHIPPED: {
              LABEL: 'Shipped',
              DESCRIPTION: 'Your order has been shipped.'
            },

            OUT_FOR_DELIVERY: {
              LABEL: 'Out for Delivery',
              DESCRIPTION: 'Your order is out for delivery.'
            },

            DELIVERED: {
              LABEL: 'Delivered',
              DESCRIPTION: 'Your order has been delivered.'
            }

          }

        }

      }
    }
  })
);


describe(
  'OrderTrackingDialogComponent',
  () => {

    let component:
      OrderTrackingDialogComponent;

    let fixture:
      ComponentFixture<OrderTrackingDialogComponent>;


    beforeEach(async () => {

      await TestBed
        .configureTestingModule({

          declarations: [
            OrderTrackingDialogComponent
          ],
               schemas: [
        NO_ERRORS_SCHEMA
      ]



        })
        .compileComponents();


      fixture =
        TestBed.createComponent(
          OrderTrackingDialogComponent
        );

      component =
        fixture.componentInstance;

      fixture.detectChanges();

    });


    // =====================================================
    // BASIC
    // =====================================================

    it('should create', () => {

      expect(component)
        .toBeTruthy();

    });


    // =====================================================
    // FALLBACK / JSON
    // =====================================================

    it('should return merged fallback constants', () => {

      const fallback =
        component.revampFallback();

      expect(fallback)
        .toBe(component.constants);

      expect(
        fallback.TRACKING
      )
        .toBeTruthy();

      expect(
        fallback.TRACKING.TIMELINE
      )
        .toBeTruthy();

    });


    it('should use JSON values for timeline labels', () => {

      const order =
        createOrder('Pending');

      component.order = order;

      component.ngOnChanges({
        order: {
          currentValue: order,
          previousValue: null,
          firstChange: true,
          isFirstChange: () => true
        }
      });

      expect(
        component.timeline[0].label
      )
        .toBe('Order Placed');

      expect(
        component.timeline[1].label
      )
        .toBe('Order Confirmed');

    });


    // =====================================================
    // INPUT / ngOnChanges
    // =====================================================

    it('should build timeline when order changes', () => {

      const order =
        createOrder('Processing');

      component.order = order;

      component.ngOnChanges({
        order: {
          currentValue: order,
          previousValue: null,
          firstChange: true,
          isFirstChange: () => true
        }
      });

      expect(component.timeline.length)
        .toBe(6);

    });


    it('should not build timeline when order is null', () => {

      component.order = null;

      component.ngOnChanges({
        order: {
          currentValue: null,
          previousValue: null,
          firstChange: true,
          isFirstChange: () => true
        }
      });

      expect(component.timeline)
        .toEqual([]);

    });


    it('should not rebuild timeline when another input changes', () => {

      const order =
        createOrder('Pending');

      component.order = order;

      component.ngOnChanges({
        visible: {
          currentValue: true,
          previousValue: false,
          firstChange: false,
          isFirstChange: () => false
        }
      });

      expect(component.timeline)
        .toEqual([]);

    });


    // =====================================================
    // TIMELINE
    // =====================================================

    it('should create six timeline steps', () => {

      const order =
        createOrder('Pending');

      component.order = order;

      component.ngOnChanges({
        order: {
          currentValue: order,
          previousValue: null,
          firstChange: true,
          isFirstChange: () => true
        }
      });

      expect(component.timeline.length)
        .toBe(6);

    });


    it('should mark Pending as current', () => {

      buildTimelineForStatus(
        component,
        'Pending'
      );

      expect(
        component.timeline[0].current
      )
        .toBe(true);

      expect(
        component.timeline[0].completed
      )
        .toBe(true);

      expect(
        component.timeline[1].current
      )
        .toBe(false);

    });


    it('should mark Processing as current', () => {

      buildTimelineForStatus(
        component,
        'Processing'
      );

      expect(
        component.timeline[0].completed
      )
        .toBe(true);

      expect(
        component.timeline[1].completed
      )
        .toBe(true);

      expect(
        component.timeline[1].current
      )
        .toBe(true);

      expect(
        component.timeline[2].completed
      )
        .toBe(false);

    });


    it('should mark Packed as current', () => {

      buildTimelineForStatus(
        component,
        'Packed'
      );

      expect(
        component.timeline[2].current
      )
        .toBe(true);

      expect(
        component.timeline[0].completed
      )
        .toBe(true);

      expect(
        component.timeline[1].completed
      )
        .toBe(true);

      expect(
        component.timeline[2].completed
      )
        .toBe(true);

      expect(
        component.timeline[3].completed
      )
        .toBe(false);

    });


    it('should mark Shipped as current', () => {

      buildTimelineForStatus(
        component,
        'Shipped'
      );

      expect(
        component.timeline[3].current
      )
        .toBe(true);

      expect(
        component.timeline[3].completed
      )
        .toBe(true);

      expect(
        component.timeline[4].completed
      )
        .toBe(false);

    });


    it('should mark Out for Delivery as current', () => {

      buildTimelineForStatus(
        component,
        'Out for Delivery'
      );

      expect(
        component.timeline[4].current
      )
        .toBe(true);

      expect(
        component.timeline[4].completed
      )
        .toBe(true);

      expect(
        component.timeline[5].completed
      )
        .toBe(false);

    });


    it('should mark Delivered as current and complete all steps', () => {

      buildTimelineForStatus(
        component,
        'Delivered'
      );

      expect(
        component.timeline[5].current
      )
        .toBe(true);

      expect(
        component.timeline[5].completed
      )
        .toBe(true);

      expect(
        component.timeline.every(
          step => step.completed
        )
      )
        .toBe(true);

    });


    it('should use order date for every timeline step', () => {

      const order =
        createOrder('Shipped');

      component.order = order;

      component.ngOnChanges({
        order: {
          currentValue: order,
          previousValue: null,
          firstChange: true,
          isFirstChange: () => true
        }
      });

      expect(
        component.timeline.every(
          step =>
            step.date === order.date
        )
      )
        .toBe(true);

    });


    it('should use fallback descriptions in timeline', () => {

      buildTimelineForStatus(
        component,
        'Delivered'
      );

      expect(
        component.timeline[0].description
      )
        .toBe(
          'Your order has been placed.'
        );

      expect(
        component.timeline[5].description
      )
        .toBe(
          'Your order has been delivered.'
        );

    });


    // =====================================================
    // CANCELLED
    // =====================================================

    it('should return true for cancelled order', () => {

      component.order =
        createOrder('Cancelled');

      expect(
        component.isCancelled()
      )
        .toBe(true);

    });


    it('should return false for non-cancelled order', () => {

      component.order =
        createOrder('Processing');

      expect(
        component.isCancelled()
      )
        .toBe(false);

    });


    it('should return false when order is null', () => {

      component.order = null;

      expect(
        component.isCancelled()
      )
        .toBe(false);

    });


    // =====================================================
    // CLOSE
    // =====================================================

    it('should emit false when close is called', () => {

      const emitSpy =
        jest.spyOn(
          component.visibleChange,
          'emit'
        );

      component.close();

      expect(emitSpy)
        .toHaveBeenCalledWith(false);

    });


    // =====================================================
    // INPUT VALUES
    // =====================================================

    it('should accept visible input', () => {

      component.visible = true;

      expect(component.visible)
        .toBe(true);

    });


    it('should accept order input', () => {

      const order =
        createOrder('Delivered');

      component.order = order;

      expect(component.order)
        .toEqual(order);

    });

  }
);


// =========================================================
// TEST HELPERS
// =========================================================

function createOrder(
  status: string
): Order {

  return {
    id: 'ORD-1001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    product: 'Wireless Headphones',
    itemsCount: 1,
    amount: 2499,
    date: '2026-09-10',
    status: status as any
  } as Order;
}


function buildTimelineForStatus(
  component: OrderTrackingDialogComponent,
  status: string
): void {

  const order =
    createOrder(status);

  component.order = order;

  component.ngOnChanges({
    order: {
      currentValue: order,
      previousValue: null,
      firstChange: true,
      isFirstChange: () => true
    }
  });

}