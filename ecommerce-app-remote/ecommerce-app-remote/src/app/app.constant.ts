import { Order, OrderStatus } from "./orders/orders/order.model";

export const PRODUCTS_CONSTANTS = {

  PAGE_HEADER: {
    TITLE: 'Products',
    DESCRIPTION: 'Manage your products and inventory',
    ADD_PRODUCT: 'Add Product'
  },

  SEARCH: {
    PLACEHOLDER: 'Search products...',
    BUTTON: 'Search'
  },

  FILTER: {
    CATEGORY_LABEL: 'Category',
    CATEGORY_ALL: 'All Categories',
    STATUS_LABEL: 'Status',
    STATUS_ALL: 'All Statuses'
  },

  TABLE: {
    TITLE: 'All Products',
    DESCRIPTION: 'Manage and monitor your product inventory',

    HEADERS: {
      PRODUCT: 'Product',
      CATEGORY: 'Category',
      PRICE: 'Price',
      STOCK: 'Stock',
      STATUS: 'Status',
      ACTIONS: 'Actions'
    },

   PRODUCTS: [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'Premium wireless headphones',
    category: 'Electronics',
    price: '₹2,499',
    stock: 128,
    status: 'In Stock',
    icon: '🎧'
  },
  {
    id: 2,
    name: 'Smart Watch',
    description: 'Advanced fitness smart watch',
    category: 'Electronics',
    price: '₹4,999',
    stock: 96,
    status: 'In Stock',
    icon: '⌚'
  },
  {
    id: 3,
    name: 'Laptop Stand',
    description: 'Adjustable aluminum laptop stand',
    category: 'Accessories',
    price: '₹1,799',
    stock: 82,
    status: 'In Stock',
    icon: '💻'
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    description: 'Portable wireless speaker',
    category: 'Electronics',
    price: '₹1,899',
    stock: 74,
    status: 'In Stock',
    icon: '🔊'
  },
  {
    id: 5,
    name: 'USB-C Hub',
    description: 'Multi-port USB-C adapter',
    category: 'Accessories',
    price: '₹1,299',
    stock: 12,
    status: 'Low Stock',
    icon: '🔌'
  },
  {
    id: 6,
    name: 'Gaming Mouse',
    description: 'High precision gaming mouse',
    category: 'Gaming',
    price: '₹1,599',
    stock: 0,
    status: 'Out of Stock',
    icon: '🖱️'
  }
]
  },

  ACTIONS: {
    EDIT: 'Edit',
    DELETE: 'Delete',
    VIEW: 'View'
  },

  EMPTY_STATE: {
    TITLE: 'No Products Found',
    DESCRIPTION: 'There are no products matching your search.'
  }

};


const DEFAULT_PRODUCT_ICON = '📦';

const PRODUCT_ICON_MAP: Record<string, string> = {
  'Wireless Headphones': '🎧',
  'Smart Watch': '⌚',
  'Laptop Stand': '💻',
  'Bluetooth Speaker': '🔊',
  'USB-C Hub': '🔌',
  'Gaming Mouse': '🖱️'
};

export function getProductIcon(productName: string): string {
  return PRODUCT_ICON_MAP[productName] ?? DEFAULT_PRODUCT_ICON;
}

export const ORDERS_CONSTANTS = {

  PAGE_HEADER: {
    TITLE: 'Orders',
    DESCRIPTION: 'Manage and track customer orders',
    EXPORT: 'Export',
    NEW_ORDER: 'New Order'
  },

  SEARCH: {
    PLACEHOLDER: 'Search by order ID, customer or product',
    BUTTON: 'Search'
  },

  FILTER: {
    STATUS_LABEL: 'Status',
    STATUS_ALL: 'All'
  },

  STATS: {
    TOTAL_ORDERS: 'Total Orders',
    PENDING: 'Pending',
    PROCESSING: 'Processing',
    DELIVERED: 'Delivered',
    REVENUE: 'Revenue'
  },

  TABLE: {
    TITLE: 'All Orders',
    DESCRIPTION: 'Manage and monitor your customer orders',

    HEADERS: {
      ORDER_ID: 'Order ID',
      CUSTOMER: 'Customer',
      PRODUCT: 'Product',
      AMOUNT: 'Amount',
      DATE: 'Date',
      STATUS: 'Status',
      ACTIONS: 'Actions'
    },

    STATUSES: ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as (OrderStatus | 'All')[],

    ORDERS: [
      { id: 'ORD-1001', customerName: 'Rahul Sharma', customerEmail: 'rahul.sharma@mail.com', product: 'Wireless Headphones', itemsCount: 1, amount: 2499, date: '2026-08-24', status: 'Delivered',  paymentMethod: 'UPI' },
      { id: 'ORD-1002', customerName: 'Priya Nair',    customerEmail: 'priya.nair@mail.com',    product: 'Smart Watch',         itemsCount: 1, amount: 4999, date: '2026-08-24', status: 'Processing', paymentMethod: 'Card' },
      { id: 'ORD-1003', customerName: 'Amit Verma',    customerEmail: 'amit.verma@mail.com',    product: 'Laptop Stand',        itemsCount: 2, amount: 3598, date: '2026-08-23', status: 'Shipped',    paymentMethod: 'Card' },
      { id: 'ORD-1004', customerName: 'Sneha Iyer',    customerEmail: 'sneha.iyer@mail.com',    product: 'Bluetooth Speaker',   itemsCount: 1, amount: 1899, date: '2026-08-23', status: 'Pending',    paymentMethod: 'COD' },
      { id: 'ORD-1005', customerName: 'Karan Mehta',   customerEmail: 'karan.mehta@mail.com',   product: 'Wireless Headphones', itemsCount: 1, amount: 2499, date: '2026-08-22', status: 'Cancelled',  paymentMethod: 'UPI' },
      { id: 'ORD-1006', customerName: 'Divya Rao',     customerEmail: 'divya.rao@mail.com',     product: 'Smart Watch',         itemsCount: 1, amount: 4999, date: '2026-08-22', status: 'Delivered',  paymentMethod: 'Card' },
      { id: 'ORD-1007', customerName: 'Arjun Singh',   customerEmail: 'arjun.singh@mail.com',   product: 'Laptop Stand',        itemsCount: 1, amount: 1799, date: '2026-08-21', status: 'Delivered',  paymentMethod: 'UPI' },
      { id: 'ORD-1008', customerName: 'Neha Gupta',    customerEmail: 'neha.gupta@mail.com',    product: 'Bluetooth Speaker',   itemsCount: 3, amount: 5697, date: '2026-08-21', status: 'Processing', paymentMethod: 'Card' }
    ] as Order[]
  },

  ACTIONS: {
    VIEW: 'View',
    EDIT: 'Edit',
    DELETE: 'Delete'
  },

  EMPTY_STATE: {
    TITLE: 'No Orders Found',
    DESCRIPTION: 'There are no orders matching your search.'
  }
};

export const NOTIFICATIONS_CONSTANTS = {

  BREADCRUMB: {
    DASHBOARD: 'Dashboard',
    NOTIFICATIONS: 'Notifications'
  },

  PAGE_HEADER: {
    TITLE: 'Notifications',
    DESCRIPTION: 'Stay updated with your latest store activities.',
    MARK_ALL_AS_READ: 'Mark all as read'
  },

  SUMMARY: {
    UNREAD: 'Unread',
    ORDERS: 'Orders',
    PRODUCTS: 'Products',
    SYSTEM: 'System'
  },

  TABS: {
    ALL: 'All',
    UNREAD: 'Unread',
    ORDERS: 'Orders',
    PRODUCTS: 'Products'
  },

  TOOLBAR: {
    FILTER: 'Filter'
  },

  ACTIONS: {
    DELETE: 'Delete'
  },

  EMPTY_STATE: {
    TITLE: 'No notifications',
    DESCRIPTION: "You're all caught up. There are no notifications to show."
  }

};