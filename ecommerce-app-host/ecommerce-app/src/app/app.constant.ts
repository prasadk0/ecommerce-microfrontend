export const NAVBAR_FALLBACK = {
  'navbar': {
    'brand': 'E-Commerce',
    'home': 'Home',
    'products': 'Products',
    'orders': 'Orders',
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

export const SIGNUP_CONSTANTS = {
  PAGE_TITLE: 'Create Account',
  PAGE_SUBTITLE: 'Enter your details to create your account',

  FULL_NAME_LABEL: 'Full Name',
  FULL_NAME_PLACEHOLDER: 'Enter your full name',

  EMAIL_LABEL: 'Email Address',
  EMAIL_PLACEHOLDER: 'Enter your email',

  PASSWORD_LABEL: 'Password',
  PASSWORD_PLACEHOLDER: 'Create a password',

  CONFIRM_PASSWORD_LABEL: 'Confirm Password',
  CONFIRM_PASSWORD_PLACEHOLDER: 'Confirm your password',

  TERMS_TEXT: 'I agree to the Terms & Conditions',

  SIGNUP_BUTTON: 'Create Account',

  ALREADY_HAVE_ACCOUNT: 'Already have an account?',
  SIGN_IN: 'Sign In',

  PASSWORD_NOT_MATCH: 'Passwords do not match',
  USERNAME_LABEL: 'Username',
  USERNAME_PLACEHOLDER: 'Enter your username',
};

export const LOGIN_CONSTANTS = {
  PAGE_TITLE: 'Welcome Back',
  PAGE_SUBTITLE: 'Sign in to continue to your account',

  EMAIL_LABEL: 'Username',
  EMAIL_PLACEHOLDER: 'Enter your username',

  PASSWORD_LABEL: 'Password',
  PASSWORD_PLACEHOLDER: 'Enter your password',

  REMEMBER_ME: 'Remember me',

  FORGOT_PASSWORD: 'Forgot Password?',

  LOGIN_BUTTON: 'Sign In',

  DONT_HAVE_ACCOUNT: "Don't have an account?",
  SIGN_UP: 'Sign Up',

  LOGIN_SUCCESS: 'Login successful',
  LOGIN_FAILED: 'Invalid email or password'
};


export const PROFILE_FALLBACK = {

  PAGE_HEADER: {
    TITLE: 'My Profile',
    DESCRIPTION: 'Manage your personal information and account settings.'
  },

  PROFILE: {
    STATUS: 'Active'
  },

  PERSONAL_INFO: {
    TITLE: 'Personal Information',
    DESCRIPTION: 'View and update your personal details.'
  },

  FIELDS: {
    NAME: 'Full Name',
    EMAIL: 'Email Address',
    PHONE: 'Phone Number',
    ROLE: 'Role',
    MEMBER_SINCE: 'Member Since',
    LOCATION: 'Location'
  },

  SECURITY: {
    TITLE: 'Security',
    DESCRIPTION: 'Manage your account security and login settings.',

    PASSWORD_TITLE: 'Password',
    PASSWORD_DESCRIPTION: 'Keep your account secure with a strong password.',

    LOGIN_TITLE: 'Login Security',
    LOGIN_DESCRIPTION: 'Your account is protected by authentication.',

    ENABLED: 'Enabled'
  },

  BUTTONS: {
    EDIT: 'Edit Profile',
    SAVE: 'Save Changes',
    CANCEL: 'Cancel',
    CHANGE_PASSWORD: 'Change Password'
  }

};

