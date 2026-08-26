import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import { HOME_CONSTANTS } from '../app.constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  stats = [
    {
      title: 'Total Products',
      value: '1,248',
      change: '+12.5%',
      icon: '▣',
      type: 'blue'
    },
    {
      title: 'Total Orders',
      value: '856',
      change: '+8.2%',
      icon: '☷',
      type: 'green'
    },
    {
      title: 'Revenue',
      value: '₹8.42L',
      change: '+15.8%',
      icon: '₹',
      type: 'purple'
    },
    {
      title: 'Customers',
      value: '3,642',
      change: '+10.4%',
      icon: '♙',
      type: 'orange'
    }
  ];

  recentOrders = [
    {
      id: '#ORD-10245',
      customer: 'Rahul Sharma',
      product: 'Wireless Headphones',
      amount: '₹2,499',
      status: 'Delivered'
    },
    {
      id: '#ORD-10244',
      customer: 'Priya Patil',
      product: 'Smart Watch',
      amount: '₹4,999',
      status: 'Processing'
    },
    {
      id: '#ORD-10243',
      customer: 'Amit Kumar',
      product: 'Laptop Backpack',
      amount: '₹1,299',
      status: 'Shipped'
    },
    {
      id: '#ORD-10242',
      customer: 'Sneha Joshi',
      product: 'Bluetooth Speaker',
      amount: '₹1,899',
      status: 'Delivered'
    }
  ];

  revampFallback() {
    return HOME_CONSTANTS;
  }

  trackByStat(index: number, stat: any): string {
    return stat.title;
  }

  trackByOrder(index: number, order: any): string {
    return order.id;
  }
}