import { Component } from '@angular/core';

import { NOTIFICATIONS_CONSTANTS } from 'src/app/app.constant';

import constantsJson from '../../../assets/app-fallback.json';

import { deepMerge } from 'src/app/utils/deep-merge';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'order' | 'product' | 'system';
  icon: string;
  time: string;
  read: boolean;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

  activeFilter = 'all';

  readonly constants = deepMerge(
    NOTIFICATIONS_CONSTANTS,
    constantsJson.NOTIFICATIONS_CONSTANTS
  );

  notifications: Notification[] = [

    {
      id: 1,
      title: 'New order received',
      message: 'Order #ORD-1025 has been placed by Rahul Sharma.',
      type: 'order',
      icon: 'pi pi-shopping-cart',
      time: '5 minutes ago',
      read: false
    },

    {
      id: 2,
      title: 'Low stock alert',
      message: 'Wireless Headphones are running low. Only 5 units remaining.',
      type: 'product',
      icon: 'pi pi-exclamation-triangle',
      time: '20 minutes ago',
      read: false
    },

    {
      id: 3,
      title: 'Order delivered',
      message: 'Order #ORD-1021 has been successfully delivered.',
      type: 'order',
      icon: 'pi pi-check-circle',
      time: '1 hour ago',
      read: true
    },

    {
      id: 4,
      title: 'New product added',
      message: 'iPhone 15 has been successfully added to your products.',
      type: 'product',
      icon: 'pi pi-box',
      time: '2 hours ago',
      read: false
    },

    {
      id: 5,
      title: 'System maintenance',
      message: 'Scheduled maintenance will be performed tonight at 11:00 PM.',
      type: 'system',
      icon: 'pi pi-info-circle',
      time: '3 hours ago',
      read: true
    },

    {
      id: 6,
      title: 'Order cancelled',
      message: 'Order #ORD-1018 has been cancelled by the customer.',
      type: 'order',
      icon: 'pi pi-times-circle',
      time: '5 hours ago',
      read: true
    }

  ];


  get filteredNotifications(): Notification[] {

    switch (this.activeFilter) {

      case 'unread':
        return this.notifications.filter(
          notification => !notification.read
        );

      case 'orders':
        return this.notifications.filter(
          notification => notification.type === 'order'
        );

      case 'products':
        return this.notifications.filter(
          notification => notification.type === 'product'
        );

      default:
        return this.notifications;
    }
  }


  get unreadCount(): number {

    return this.notifications.filter(
      notification => !notification.read
    ).length;
  }


  get orderCount(): number {

    return this.notifications.filter(
      notification => notification.type === 'order'
    ).length;
  }


  get productCount(): number {

    return this.notifications.filter(
      notification => notification.type === 'product'
    ).length;
  }


  get systemCount(): number {

    return this.notifications.filter(
      notification => notification.type === 'system'
    ).length;
  }


  setFilter(filter: string): void {

    this.activeFilter = filter;
  }


  markAsRead(notification: Notification): void {

    notification.read = true;
  }


  markAllAsRead(): void {

    this.notifications.forEach(notification => {
      notification.read = true;
    });
  }


  deleteNotification(
    notification: Notification,
    event: Event
  ): void {

    event.stopPropagation();

    this.notifications =
      this.notifications.filter(
        item => item.id !== notification.id
      );
  }


  revampFallback() {

    return this.constants;
  }
}