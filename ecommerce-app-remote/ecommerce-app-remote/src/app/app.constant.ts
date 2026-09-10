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
  ,

  ADD_PRODUCT :{
  HEADER: 'Add Product',

  FIELDS: {
    PRODUCT_NAME: {
      LABEL: 'Product Name',
      PLACEHOLDER: 'Enter product name'
    },

    DESCRIPTION: {
      LABEL: 'Description',
      PLACEHOLDER: 'Enter product description'
    },

    CATEGORY: {
      LABEL: 'Category',
      PLACEHOLDER: 'Enter category'
    },

    PRICE: {
      LABEL: 'Price'
    },

    STOCK: {
      LABEL: 'Stock'
    },

    STATUS: {
      LABEL: 'Status',
      PLACEHOLDER: 'Select status'
    },

    ICON: {
      LABEL: 'Product Icon',
      PLACEHOLDER: 'Example: 📱'
    }
  },

  VALIDATION: {
    PRODUCT_NAME_REQUIRED: 'Product name is required.',
    PRODUCT_NAME_MAX_LENGTH:
      'Product name cannot exceed 100 characters.',

    DESCRIPTION_MAX_LENGTH:
      'Description cannot exceed 500 characters.',

    CATEGORY_REQUIRED: 'Category is required.',
    CATEGORY_MAX_LENGTH:
      'Category cannot exceed 100 characters.',

    PRICE_REQUIRED: 'Price is required.',
    PRICE_MIN: 'Price cannot be negative.',

    STOCK_REQUIRED: 'Stock is required.',
    STOCK_MIN: 'Stock cannot be negative.',

    STATUS_REQUIRED: 'Status is required.',

    ICON_MAX_LENGTH:
      'Icon cannot exceed 10 characters.'
  },

  STATUS_OPTIONS: [
    {
      label: 'Active',
      value: 'Active'
    },
    {
      label: 'Inactive',
      value: 'Inactive'
    },
    {
      label: 'Out of Stock',
      value: 'Out of Stock'
    }
  ],

  DEFAULTS: {
    ID: '',
    NAME: '',
    DESCRIPTION: '',
    CATEGORY: '',
    PRICE: 0,
    STOCK: 0,
    STATUS: 'Active',
    ICON: '📦'
  },

  FOOTER: {
    CANCEL: 'Cancel',
    ADD_PRODUCT: 'Add Product'
  }
},
EDIT_PRODUCT: {
  HEADER: 'Edit Product',

  FIELDS: {
    PRODUCT_NAME: {
      LABEL: 'Product Name',
      PLACEHOLDER: 'Enter product name'
    },

    DESCRIPTION: {
      LABEL: 'Description',
      PLACEHOLDER: 'Enter product description'
    },

    CATEGORY: {
      LABEL: 'Category',
      PLACEHOLDER: 'Enter category'
    },

    PRICE: {
      LABEL: 'Price'
    },

    STOCK: {
      LABEL: 'Stock'
    },

    STATUS: {
      LABEL: 'Status',
      PLACEHOLDER: 'Select status'
    },

    ICON: {
      LABEL: 'Product Icon',
      PLACEHOLDER: 'Example: 📱'
    }
  },

  VALIDATION: {
    PRODUCT_NAME_REQUIRED: 'Product name is required.',
    PRODUCT_NAME_MAX_LENGTH:
      'Product name cannot exceed 100 characters.',

    DESCRIPTION_MAX_LENGTH:
      'Description cannot exceed 500 characters.',

    CATEGORY_REQUIRED: 'Category is required.',
    CATEGORY_MAX_LENGTH:
      'Category cannot exceed 100 characters.',

    PRICE_REQUIRED: 'Price is required.',
    PRICE_MIN:
      'Price cannot be negative.',

    STOCK_REQUIRED: 'Stock is required.',
    STOCK_MIN:
      'Stock cannot be negative.',

    STATUS_REQUIRED:
      'Status is required.',

    ICON_MAX_LENGTH:
      'Icon cannot exceed 10 characters.'
  },

  FOOTER: {
    CANCEL: 'Cancel',
    SAVE: 'Save Changes'
  }
},

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
  },

TRACKING: {
  HEADER: {
    ORDER_DETAILS: 'ORDER DETAILS',
    ORDERED_ON: 'Ordered on',
    CURRENT: 'Current'
  },

  DELIVERY_STATUS: {
    TITLE: 'Delivery Status',
    DESCRIPTION: 'Track your order journey',
    CANCELLED_TITLE: 'Order Cancelled',
    CANCELLED_DESCRIPTION: 'This order has been cancelled.'
  },

  TIMELINE: {
    ORDER_PLACED: {
      LABEL: 'Order Placed',
      DESCRIPTION: 'Your order has been placed successfully.'
    },

    ORDER_CONFIRMED: {
      LABEL: 'Order Confirmed',
      DESCRIPTION: 'Your order has been confirmed by the seller.'
    },

    PACKED: {
      LABEL: 'Packed',
      DESCRIPTION: 'Your package has been packed and is ready for shipment.'
    },

    SHIPPED: {
      LABEL: 'Shipped',
      DESCRIPTION: 'Your package has been handed over to the delivery partner.'
    },

    OUT_FOR_DELIVERY: {
      LABEL: 'Out for Delivery',
      DESCRIPTION: 'Your package is on the way to your delivery address.'
    },

    DELIVERED: {
      LABEL: 'Delivered',
      DESCRIPTION: 'Your order has been delivered successfully.'
    }
  },

  PRODUCT_DETAILS: {
    TITLE: 'Product Details',
    DESCRIPTION: 'Items included in this order',
    QUANTITY: 'Quantity'
  },

  CUSTOMER_DETAILS: {
    TITLE: 'Customer Details',
    DESCRIPTION: 'Customer information',
    CUSTOMER_NAME: 'Customer Name',
    EMAIL: 'Email'
  },

  DELIVERY_INFORMATION: {
    TITLE: 'Delivery Information',
    DESCRIPTION: 'Shipping information',
    DELIVERY_PARTNER: 'Delivery Partner',
    DELIVERY_PARTNER_NAME: 'Fast Delivery',
    TRACKING_ID: 'Tracking ID',
    TRACKING_PREFIX: 'TRK-'
  },

  PAYMENT_INFORMATION: {
    TITLE: 'Payment Information',
    DESCRIPTION: 'Payment details',
    PAYMENT_METHOD: 'Payment Method',
    PAYMENT_STATUS: 'Payment Status',
    PAID: 'Paid'
  },

  ORDER_SUMMARY: {
    TITLE: 'Order Summary',
    DESCRIPTION: 'Payment breakdown',
    ITEM_TOTAL: 'Item Total',
    DELIVERY_CHARGES: 'Delivery Charges',
    FREE: 'FREE',
    TOTAL_AMOUNT: 'Total Amount'
  },

  FOOTER: {
    CLOSE: 'Close'
  },

  DEFAULTS: {
    PRODUCT_ICON: '📦',
    EMPTY_PRODUCT_ICON: '🛍️'
  }
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