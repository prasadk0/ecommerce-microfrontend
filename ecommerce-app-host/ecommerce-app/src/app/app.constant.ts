export const NAVBAR_FALLBACK = {
  'navbar': {
    'brand': 'E-Commerce',
    'home': 'Home',
    'products': 'Products',
    'orders': 'Orders',
    'data-generator': 'Test Data',
    'notifications': 'Notifications',
    'profile': 'Profile',
    'logout': 'Logout'
  }
};

// ==============================
// HOME PAGE CONSTANTS
// ==============================

export const HOME_CONSTANTS = {

  PAGE_HEADER: {
    WELCOME_TEXT: 'Welcome back 👋',
    TITLE: 'E-Commerce Dashboard',
    DESCRIPTION: "Here's what's happening with your store today.",
    ADD_PRODUCT: 'Add Product'
  },

  STATS: [
    {
      title: 'Total Revenue',
      value: '₹1,24,580',
      change: '+12.5%',
      icon: '₹',
      type: 'revenue'
    },
    {
      title: 'Total Orders',
      value: '1,248',
      change: '+8.2%',
      icon: '🛒',
      type: 'orders'
    },
    {
      title: 'Total Customers',
      value: '3,642',
      change: '+15.3%',
      icon: '👥',
      type: 'customers'
    },
    {
      title: 'Total Products',
      value: '284',
      change: '+5.7%',
      icon: '📦',
      type: 'products'
    }
  ],

  SALES_OVERVIEW: {
    TITLE: 'Sales Overview',
    DESCRIPTION: 'Revenue performance',

    PERIODS: [
      'Last 7 days',
      'Last 30 days',
      'Last 3 months'
    ],

    DEFAULT_PERIOD: 'Last 7 days',

    Y_AXIS: [
      '₹20K',
      '₹15K',
      '₹10K',
      '₹5K',
      '₹0'
    ],

    DATA: [
      {
        day: 'Mon',
        height: 45
      },
      {
        day: 'Tue',
        height: 65
      },
      {
        day: 'Wed',
        height: 52
      },
      {
        day: 'Thu',
        height: 80
      },
      {
        day: 'Fri',
        height: 62
      },
      {
        day: 'Sat',
        height: 92
      },
      {
        day: 'Sun',
        height: 72
      }
    ]
  },

  TOP_PRODUCTS: {
    TITLE: 'Top Products',
    DESCRIPTION: 'Best selling products',
    VIEW_ALL: 'View All',

    PRODUCTS: [
      {
        name: 'Wireless Headphones',
        sold: '128 sold',
        price: '₹2,499',
        icon: '🎧'
      },
      {
        name: 'Smart Watch',
        sold: '96 sold',
        price: '₹4,999',
        icon: '⌚'
      },
      {
        name: 'Laptop Stand',
        sold: '82 sold',
        price: '₹1,799',
        icon: '💻'
      },
      {
        name: 'Bluetooth Speaker',
        sold: '74 sold',
        price: '₹1,899',
        icon: '🔊'
      }
    ]
  },

  RECENT_ORDERS: {
    TITLE: 'Recent Orders',
    DESCRIPTION: 'Latest orders from your customers',
    VIEW_ALL: 'View All Orders',

    TABLE_HEADERS: {
      ORDER_ID: 'Order ID',
      CUSTOMER: 'Customer',
      PRODUCT: 'Product',
      AMOUNT: 'Amount',
      STATUS: 'Status'
    },

    ORDERS: [
      {
        id: '#ORD-1001',
        customer: 'Rahul Sharma',
        product: 'Wireless Headphones',
        amount: '₹2,499',
        status: 'Delivered'
      },
      {
        id: '#ORD-1002',
        customer: 'Priya Patel',
        product: 'Smart Watch',
        amount: '₹4,999',
        status: 'Processing'
      },
      {
        id: '#ORD-1003',
        customer: 'Amit Kumar',
        product: 'Laptop Stand',
        amount: '₹1,799',
        status: 'Shipped'
      },
      {
        id: '#ORD-1004',
        customer: 'Sneha Joshi',
        product: 'Bluetooth Speaker',
        amount: '₹1,899',
        status: 'Delivered'
      }
    ]
  }

};