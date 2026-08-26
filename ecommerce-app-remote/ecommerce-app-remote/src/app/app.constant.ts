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
        name: 'Wireless Headphones',
        description: 'Premium wireless headphones',
        category: 'Electronics',
        price: '₹2,499',
        stock: 128,
        status: 'In Stock',
        icon: '🎧'
      },
      {
        name: 'Smart Watch',
        description: 'Advanced fitness smart watch',
        category: 'Electronics',
        price: '₹4,999',
        stock: 96,
        status: 'In Stock',
        icon: '⌚'
      },
      {
        name: 'Laptop Stand',
        description: 'Adjustable aluminum laptop stand',
        category: 'Accessories',
        price: '₹1,799',
        stock: 82,
        status: 'In Stock',
        icon: '💻'
      },
      {
        name: 'Bluetooth Speaker',
        description: 'Portable wireless speaker',
        category: 'Electronics',
        price: '₹1,899',
        stock: 74,
        status: 'In Stock',
        icon: '🔊'
      },
      {
        name: 'USB-C Hub',
        description: 'Multi-port USB-C adapter',
        category: 'Accessories',
        price: '₹1,299',
        stock: 12,
        status: 'Low Stock',
        icon: '🔌'
      },
      {
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