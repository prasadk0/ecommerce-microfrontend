import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  NO_ERRORS_SCHEMA
} from '@angular/core';

import {
  ProductsComponent
} from './products.component';


// ============================================
// MOCK FALLBACK JSON
// ============================================

jest.mock('../../assets/app-fallback.json', () => ({
  __esModule: true,

  default: {

    PRODUCTS_CONSTANTS: {

      PAGE_HEADER: {

        TITLE:
          'Products',

        DESCRIPTION:
          'Manage your Products and inventory',

        ADD_PRODUCT:
          'Add Product'

      },

      SEARCH: {

        PLACEHOLDER:
          'Search products...',

        BUTTON:
          'Search'

      },

      FILTER: {

        CATEGORY_LABEL:
          'Category',

        CATEGORY_ALL:
          'All Categories',

        STATUS_LABEL:
          'Status',

        STATUS_ALL:
          'All Statuses'

      },

      TABLE: {

        TITLE:
          'All Products',

        DESCRIPTION:
          'Manage and monitor your product inventory',

        HEADERS: {

          PRODUCT:
            'Product',

          CATEGORY:
            'Category',

          PRICE:
            'Price',

          STOCK:
            'Stock',

          STATUS:
            'Status',

          ACTIONS:
            'Actions'

        },

        PRODUCTS: [

          {
            id: 1,

            name:
              'Wireless Headphones',

            description:
              'Premium wireless headphones',

            category:
              'Electronics',

            price:
              '₹2,499',

            stock:
              128,

            status:
              'In Stock',

            icon:
              '🎧'

          },

          {
            id: 2,

            name:
              'Smart Watch',

            description:
              'Advanced fitness smart watch',

            category:
              'Electronics',

            price:
              '₹4,999',

            stock:
              96,

            status:
              'In Stock',

            icon:
              '⌚'

          },

          {
            id: 3,

            name:
              'Laptop Stand',

            description:
              'Adjustable aluminum laptop stand',

            category:
              'Accessories',

            price:
              '₹1,799',

            stock:
              82,

            status:
              'In Stock',

            icon:
              '💻'

          }

        ]

      },

      ACTIONS: {

        EDIT:
          'Edit',

        DELETE:
          'Delete',

        VIEW:
          'View'

      },

      EMPTY_STATE: {

        TITLE:
          'No Products Found',

        DESCRIPTION:
          'There are no products matching your search.'

      },

      ADD_PRODUCT: {

        HEADER:
          'Add Product',

        FIELDS: {

          PRODUCT_NAME: {

            LABEL:
              'Product Name',

            PLACEHOLDER:
              'Enter product name'

          },

          DESCRIPTION: {

            LABEL:
              'Description',

            PLACEHOLDER:
              'Enter product description'

          },

          CATEGORY: {

            LABEL:
              'Category',

            PLACEHOLDER:
              'Enter category'

          },

          PRICE: {

            LABEL:
              'Price'

          },

          STOCK: {

            LABEL:
              'Stock'

          },

          STATUS: {

            LABEL:
              'Status',

            PLACEHOLDER:
              'Select status'

          },

          ICON: {

            LABEL:
              'Product Icon',

            PLACEHOLDER:
              'Example: 📱'

          }

        },

        STATUS_OPTIONS: [

          {
            label:
              'Active',

            value:
              'Active'

          },

          {
            label:
              'Inactive',

            value:
              'Inactive'

          },

          {
            label:
              'Out of Stock',

            value:
              'Out of Stock'

          }

        ]

      },

      EDIT_PRODUCT: {

        HEADER:
          'Edit Product',

        FIELDS: {

          PRODUCT_NAME: {

            LABEL:
              'Product Name',

            PLACEHOLDER:
              'Enter product name'

          },

          DESCRIPTION: {

            LABEL:
              'Description',

            PLACEHOLDER:
              'Enter product description'

          },

          CATEGORY: {

            LABEL:
              'Category',

            PLACEHOLDER:
              'Enter category'

          },

          PRICE: {

            LABEL:
              'Price'

          },

          STOCK: {

            LABEL:
              'Stock'

          },

          STATUS: {

            LABEL:
              'Status',

            PLACEHOLDER:
              'Select status'

          },

          ICON: {

            LABEL:
              'Product Icon',

            PLACEHOLDER:
              'Example: 📱'

          }

        }

      }

    }

  }

}));


// ============================================
// TEST SUITE
// ============================================

describe('ProductsComponent', () => {

  let component:
    ProductsComponent;

  let fixture:
    ComponentFixture<ProductsComponent>;


  // ============================================
  // ROUTER MOCK
  // ============================================

  const routerMock = {

    navigate:
      jest.fn()

  };


  // ============================================
  // ACTIVATED ROUTE MOCK
  // ============================================

  const activatedRouteMock = {};


  // ============================================
  // BEFORE EACH
  // ============================================

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      declarations: [

        ProductsComponent

      ],

      providers: [

        {

          provide:
            Router,

          useValue:
            routerMock

        },

        {

          provide:
            ActivatedRoute,

          useValue:
            activatedRouteMock

        }

      ],

      schemas: [

        NO_ERRORS_SCHEMA

      ]

    }).compileComponents();


    fixture =
      TestBed.createComponent(
        ProductsComponent
      );


    component =
      fixture.componentInstance;


    fixture.detectChanges();

  });


  // ============================================
  // AFTER EACH
  // ============================================

  afterEach(() => {

    jest.clearAllMocks();

  });


  // ============================================
  // COMPONENT
  // ============================================

  it('should create', () => {

    expect(
      component
    ).toBeTruthy();

  });


  // ============================================
  // PRODUCTS
  // ============================================

  it('should initialize products from fallback constants', () => {

    expect(
      component.products
    ).toBeTruthy();


    expect(
      component.products.length
    ).toBeGreaterThan(0);

  });


  it('should create a copy of fallback products', () => {

    expect(
      component.products
    ).not.toBe(
      component.constants.TABLE.PRODUCTS
    );

  });


  it('should initialize products with expected fallback data', () => {

    expect(
      component.products[0]
    ).toEqual({

      id:
        1,

      name:
        'Wireless Headphones',

      description:
        'Premium wireless headphones',

      category:
        'Electronics',

      price:
        '₹2,499',

      stock:
        128,

      status:
        'In Stock',

      icon:
        '🎧'

    });

  });


  // ============================================
  // VIEW PRODUCT
  // ============================================

  it('should navigate to product details', () => {

    const product = {

      id:
        5,

      name:
        'Gaming Mouse'

    };


    component.viewProduct(
      product
    );


    expect(
      routerMock.navigate
    ).toHaveBeenCalledWith(

      [5],

      {

        relativeTo:
          activatedRouteMock

      }

    );

  });


  // ============================================
  // ADD PRODUCT DIALOG
  // ============================================

  it('should open add product dialog', () => {

    component.showAddDialog =
      false;


    component.openAddProduct();


    expect(
      component.showAddDialog
    ).toBe(true);

  });


  it('should close add product dialog', () => {

    component.showAddDialog =
      true;


    component.onAddDialogClose();


    expect(
      component.showAddDialog
    ).toBe(false);

  });


  // ============================================
  // ADD PRODUCT
  // ============================================

  it('should add a new product', () => {

    const initialLength =
      component.products.length;


    const newProduct = {

      name:
        'Bluetooth Speaker',

      description:
        'Portable wireless speaker',

      category:
        'Electronics',

      price:
        1899,

      stock:
        74,

      status:
        'Active',

      icon:
        '🔊'

    };


    component.onProductAdd(
      newProduct
    );


    expect(
      component.products.length
    ).toBe(
      initialLength + 1
    );


    expect(
      component.products[0].name
    ).toBe(
      'Bluetooth Speaker'
    );


    expect(
      component.products[0].price
    ).toBe(1899);

  });


  it('should generate a new product id when adding a product', () => {

    const newProduct = {

      name:
        'New Product',

      description:
        'New product description',

      category:
        'Accessories',

      price:
        1000,

      stock:
        20,

      status:
        'Active',

      icon:
        '📦'

    };


    const existingIds =
      component.products
        .map(
          product =>
            Number(product.id)
        );


    const maxId =
      Math.max(
        ...existingIds
      );


    component.onProductAdd(
      newProduct
    );


    expect(
      component.products[0].id
    ).toBe(
      String(maxId + 1)
    );

  });


  it('should close add dialog after adding product', () => {

    component.showAddDialog =
      true;


    component.onProductAdd({

      name:
        'Test Product',

      category:
        'Testing',

      price:
        500,

      stock:
        10,

      status:
        'Active',

      icon:
        '📦'

    });


    expect(
      component.showAddDialog
    ).toBe(false);

  });


  // ============================================
  // EDIT PRODUCT
  // ============================================

  it('should open edit dialog with selected product', () => {

    const product =
      component.products[0];


    component.editProduct(
      product
    );


    expect(
      component.showEditDialog
    ).toBe(true);


    expect(
      component.selectedProduct
    ).toEqual(
      product
    );

  });


  it('should create a copy of selected product for editing', () => {

    const product =
      component.products[0];


    component.editProduct(
      product
    );


    expect(
      component.selectedProduct
    ).not.toBe(
      product
    );


    expect(
      component.selectedProduct
    ).toEqual(
      product
    );

  });


  // ============================================
  // UPDATE PRODUCT
  // ============================================

  it('should update an existing product', () => {

    const product =
      component.products[0];


    const updatedProduct = {

      ...product,

      name:
        'Updated Product Name',

      price:
        9999,

      stock:
        50

    };


    component.onProductSave(
      updatedProduct
    );


    const updated =
      component.products.find(
        item =>
          item.id === product.id
      );


    expect(
      updated?.name
    ).toBe(
      'Updated Product Name'
    );


    expect(
      updated?.price
    ).toBe(9999);


    expect(
      updated?.stock
    ).toBe(50);

  });


  it('should not update product when product id does not exist', () => {

    const originalProducts = [
      ...component.products
    ];


    component.onProductSave({

      id:
        '999999',

      name:
        'Unknown Product',

      price:
        100,

      stock:
        10

    });


    expect(
      component.products
    ).toEqual(
      originalProducts
    );

  });


  it('should close edit dialog after saving product', () => {

    component.showEditDialog =
      true;


    component.selectedProduct = {

      id:
        1,

      name:
        'Product'

    };


    const product =
      component.products[0];


    component.onProductSave({

      ...product,

      name:
        'Updated Product'

    });


    expect(
      component.showEditDialog
    ).toBe(false);

  });


  it('should clear selected product after saving', () => {

    const product =
      component.products[0];


    component.selectedProduct =
      product;


    component.onProductSave({

      ...product,

      name:
        'Updated Product'

    });


    expect(
      component.selectedProduct
    ).toBeNull();

  });


  // ============================================
  // EDIT DIALOG CLOSE
  // ============================================

  it('should close edit dialog', () => {

    component.showEditDialog =
      true;


    component.selectedProduct = {

      id:
        1,

      name:
        'Test Product'

    };


    component.onDialogClose();


    expect(
      component.showEditDialog
    ).toBe(false);


    expect(
      component.selectedProduct
    ).toBeNull();

  });


  // ============================================
  // DELETE PRODUCT
  // ============================================

  it('should delete a product', () => {

    const product =
      component.products[0];


    const initialLength =
      component.products.length;


    component.deleteProduct(
      product
    );


    expect(
      component.products.length
    ).toBe(
      initialLength - 1
    );


    expect(
      component.products.some(
        item =>
          item.id === product.id
      )
    ).toBe(false);

  });


  it('should not remove other products when deleting a product', () => {

    const productToDelete =
      component.products[0];


    const otherProducts =
      component.products.slice(1);


    component.deleteProduct(
      productToDelete
    );


    expect(
      component.products
    ).toEqual(
      otherProducts
    );

  });


  // ============================================
  // TRACK BY
  // ============================================

  it('should return product id from trackByProduct', () => {

    const product = {

      id:
        '10',

      name:
        'Test Product'

    };


    expect(
      component.trackByProduct(
        0,
        product
      )
    ).toBe('10');

  });


  // ============================================
  // FALLBACK CONSTANTS
  // ============================================

  it('should return fallback constants', () => {

    const fallback =
      component.revampFallback();


    expect(
      fallback
    ).toBeTruthy();


    expect(
      fallback.TABLE
    ).toBeTruthy();


    expect(
      fallback.TABLE.PRODUCTS
    ).toBeTruthy();

  });


  it('should return expected fallback page header', () => {

    const fallback =
      component.revampFallback();


    expect(
      fallback.PAGE_HEADER.TITLE
    ).toBe(
      'Products'
    );


    expect(
      fallback.PAGE_HEADER.ADD_PRODUCT
    ).toBe(
      'Add Product'
    );

  });


  // ============================================
  // DIALOG INITIAL STATES
  // ============================================

  it('should initialize dialogs as closed', () => {

    expect(
      component.showAddDialog
    ).toBe(false);


    expect(
      component.showEditDialog
    ).toBe(false);


    expect(
      component.selectedProduct
    ).toBeNull();

  });

});