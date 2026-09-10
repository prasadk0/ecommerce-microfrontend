import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { NotificationsComponent } from './notifications.component';

import { NOTIFICATIONS_CONSTANTS } from 'src/app/app.constant';


/*
 * JSON fallback mock
 */
jest.mock(
  '../../../assets/app-fallback.json',
  () => ({
    __esModule: true,

    default: {
      NOTIFICATIONS_CONSTANTS: {

        PAGE_HEADER: {
          TITLE: 'Notifications',
          DESCRIPTION: 'Stay updated with your latest activities.'
        },

        FILTERS: {
          ALL: 'All',
          UNREAD: 'Unread',
          ORDERS: 'Orders',
          PRODUCTS: 'Products'
        },

        EMPTY_STATE: {
          TITLE: 'No Notifications',
          DESCRIPTION: 'There are no notifications to display.'
        }

      }
    }
  })
);


describe(
  'NotificationsComponent',
  () => {

    let component:
      NotificationsComponent;

    let fixture:
      ComponentFixture<NotificationsComponent>;


    beforeEach(async () => {

      await TestBed
        .configureTestingModule({

          declarations: [
            NotificationsComponent
          ]

        })
        .compileComponents();


      fixture =
        TestBed.createComponent(
          NotificationsComponent
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


    it('should initialize with all filter active', () => {

      expect(component.activeFilter)
        .toBe('all');

    });


    it('should initialize notifications', () => {

      expect(component.notifications)
        .toBeTruthy();

      expect(component.notifications.length)
        .toBe(6);

    });


    // =====================================================
    // JSON FALLBACK
    // =====================================================

    it('should return merged fallback constants', () => {

      expect(
        component.revampFallback()
      )
        .toBe(
          component.constants
        );

    });


    it('should contain notification fallback values', () => {

      const fallback =
        component.revampFallback();

      expect(
        fallback.PAGE_HEADER
      )
        .toBeTruthy();

      expect(
        fallback.PAGE_HEADER.TITLE
      )
        .toBe('Notifications');

    });


    it('should contain JSON filter fallback values', () => {

      const fallback =
        component.revampFallback();

      expect(
        fallback.FILTERS
      )
        .toBeTruthy();

      expect(
        fallback.FILTERS.ALL
      )
        .toBe('All');

      expect(
        fallback.FILTERS.UNREAD
      )
        .toBe('Unread');

    });


    // =====================================================
    // FILTERED NOTIFICATIONS
    // =====================================================

    it('should return all notifications for all filter', () => {

      component.activeFilter = 'all';

      expect(
        component.filteredNotifications.length
      )
        .toBe(
          component.notifications.length
        );

    });


    it('should return unread notifications', () => {

      component.activeFilter = 'unread';

      const result =
        component.filteredNotifications;

      expect(result.length)
        .toBe(3);

      expect(
        result.every(
          notification =>
            notification.read === false
        )
      )
        .toBe(true);

    });


    it('should return order notifications', () => {

      component.activeFilter = 'orders';

      const result =
        component.filteredNotifications;

      expect(result.length)
        .toBe(3);

      expect(
        result.every(
          notification =>
            notification.type === 'order'
        )
      )
        .toBe(true);

    });


    it('should return product notifications', () => {

      component.activeFilter = 'products';

      const result =
        component.filteredNotifications;

      expect(result.length)
        .toBe(2);

      expect(
        result.every(
          notification =>
            notification.type === 'product'
        )
      )
        .toBe(true);

    });


    it('should return all notifications for unknown filter', () => {

      component.activeFilter =
        'unknown';

      expect(
        component.filteredNotifications.length
      )
        .toBe(
          component.notifications.length
        );

    });


    // =====================================================
    // COUNTS
    // =====================================================

    it('should calculate unread count', () => {

      expect(component.unreadCount)
        .toBe(3);

    });


    it('should calculate order notification count', () => {

      expect(component.orderCount)
        .toBe(3);

    });


    it('should calculate product notification count', () => {

      expect(component.productCount)
        .toBe(2);

    });


    it('should calculate system notification count', () => {

      expect(component.systemCount)
        .toBe(1);

    });


    // =====================================================
    // SET FILTER
    // =====================================================

    it('should change active filter', () => {

      component.setFilter('unread');

      expect(component.activeFilter)
        .toBe('unread');

    });


    it('should change filter from unread to orders', () => {

      component.setFilter('unread');

      expect(component.activeFilter)
        .toBe('unread');

      component.setFilter('orders');

      expect(component.activeFilter)
        .toBe('orders');

    });


    // =====================================================
    // MARK AS READ
    // =====================================================

    it('should mark notification as read', () => {

      const notification =
        component.notifications.find(
          item => !item.read
        );

      expect(notification)
        .toBeTruthy();

      component.markAsRead(
        notification!
      );

      expect(notification!.read)
        .toBe(true);

    });


    it('should decrease unread count after marking notification as read', () => {

      const initialCount =
        component.unreadCount;

      const notification =
        component.notifications.find(
          item => !item.read
        );

      component.markAsRead(
        notification!
      );

      expect(component.unreadCount)
        .toBe(
          initialCount - 1
        );

    });


    // =====================================================
    // MARK ALL AS READ
    // =====================================================

    it('should mark all notifications as read', () => {

      component.markAllAsRead();

      expect(
        component.notifications.every(
          notification =>
            notification.read === true
        )
      )
        .toBe(true);

    });


    it('should make unread count zero after mark all as read', () => {

      component.markAllAsRead();

      expect(component.unreadCount)
        .toBe(0);

    });


    it('should return zero unread notifications after mark all as read', () => {

      component.markAllAsRead();

      component.activeFilter =
        'unread';

      expect(
        component.filteredNotifications.length
      )
        .toBe(0);

    });


    // =====================================================
    // DELETE
    // =====================================================

    it('should delete a notification', () => {

      const notification =
        component.notifications[0];

      const initialLength =
        component.notifications.length;

      const event = createMockEvent();

      component.deleteNotification(
        notification,
        event
      );

      expect(
        component.notifications.length
      )
        .toBe(
          initialLength - 1
        );

      expect(
        component.notifications.some(
          item =>
            item.id === notification.id
        )
      )
        .toBe(false);

    });


    it('should stop event propagation when deleting notification', () => {

      const notification =
        component.notifications[0];

      const event =
        createMockEvent();

      component.deleteNotification(
        notification,
        event
      );

      expect(
        event.stopPropagation
      )
        .toHaveBeenCalled();

    });


    it('should update unread count after deleting unread notification', () => {

      const notification =
        component.notifications.find(
          item => !item.read
        );

      expect(notification)
        .toBeTruthy();

      const initialUnreadCount =
        component.unreadCount;

      const event =
        createMockEvent();

      component.deleteNotification(
        notification!,
        event
      );

      expect(component.unreadCount)
        .toBe(
          initialUnreadCount - 1
        );

    });


    it('should not change unread count when deleting read notification', () => {

      const notification =
        component.notifications.find(
          item => item.read
        );

      expect(notification)
        .toBeTruthy();

      const initialUnreadCount =
        component.unreadCount;

      const event =
        createMockEvent();

      component.deleteNotification(
        notification!,
        event
      );

      expect(component.unreadCount)
        .toBe(
          initialUnreadCount
        );

    });


    // =====================================================
    // FILTER + DELETE
    // =====================================================

    it('should update filtered notifications after deleting an order', () => {

      component.activeFilter =
        'orders';

      const initialCount =
        component.filteredNotifications.length;

      const notification =
        component.notifications.find(
          item =>
            item.type === 'order'
        );

      const event =
        createMockEvent();

      component.deleteNotification(
        notification!,
        event
      );

      expect(
        component.filteredNotifications.length
      )
        .toBe(
          initialCount - 1
        );

    });


    it('should update product count after deleting product notification', () => {

      const notification =
        component.notifications.find(
          item =>
            item.type === 'product'
        );

      const initialCount =
        component.productCount;

      const event =
        createMockEvent();

      component.deleteNotification(
        notification!,
        event
      );

      expect(component.productCount)
        .toBe(
          initialCount - 1
        );

    });

  }
);


// =========================================================
// TEST HELPERS
// =========================================================

function createMockEvent(): Event {

  return {
    stopPropagation:
      jest.fn()
  } as unknown as Event;

}