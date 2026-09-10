import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  ReactiveFormsModule
} from '@angular/forms';

import {
  NO_ERRORS_SCHEMA,
  SimpleChange
} from '@angular/core';

import {
  EditProductDialogComponent
} from './edit-product-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';


// ============================================
// MOCK FALLBACK JSON
// ============================================

jest.mock('../../../assets/app-fallback.json', () => ({
  __esModule: true,

  default: {

    PRODUCTS_CONSTANTS: {

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

          PRODUCT_NAME_REQUIRED:
            'Product name is required.',

          PRODUCT_NAME_MAX_LENGTH:
            'Product name cannot exceed 100 characters.',

          DESCRIPTION_MAX_LENGTH:
            'Description cannot exceed 500 characters.',

          CATEGORY_REQUIRED:
            'Category is required.',

          CATEGORY_MAX_LENGTH:
            'Category cannot exceed 100 characters.',

          PRICE_REQUIRED:
            'Price is required.',

          PRICE_MIN:
            'Price cannot be negative.',

          STOCK_REQUIRED:
            'Stock is required.',

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

      ADD_PRODUCT: {

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

        ]

      }

    }

  }

}));


// ============================================
// TEST SUITE
// ============================================

describe('EditProductDialogComponent', () => {

  let component: EditProductDialogComponent;

  let fixture:
    ComponentFixture<EditProductDialogComponent>;


  // ============================================
  // BEFORE EACH
  // ============================================

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      declarations: [
        EditProductDialogComponent
      ],

      imports: [
        ReactiveFormsModule,
        DialogModule,
        InputNumberModule,
        DropdownModule
      ],

      schemas: [
        NO_ERRORS_SCHEMA
      ]

    }).compileComponents();


    fixture =
      TestBed.createComponent(
        EditProductDialogComponent
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
  // FORM
  // ============================================

  it('should initialize the product form', () => {

    expect(
      component.productForm
    ).toBeTruthy();

  });


  it('should contain all required form controls', () => {

    expect(
      component.productForm.contains('id')
    ).toBe(true);


    expect(
      component.productForm.contains('name')
    ).toBe(true);


    expect(
      component.productForm.contains('description')
    ).toBe(true);


    expect(
      component.productForm.contains('category')
    ).toBe(true);


    expect(
      component.productForm.contains('price')
    ).toBe(true);


    expect(
      component.productForm.contains('stock')
    ).toBe(true);


    expect(
      component.productForm.contains('status')
    ).toBe(true);


    expect(
      component.productForm.contains('icon')
    ).toBe(true);

  });


  // ============================================
  // DEFAULT VALUES
  // ============================================

  it('should initialize form with default values', () => {

    const formValue =
      component.productForm.getRawValue();


    expect(
      formValue.id
    ).toBe('');


    expect(
      formValue.name
    ).toBe('');


    expect(
      formValue.description
    ).toBe('');


    expect(
      formValue.category
    ).toBe('');


    expect(
      formValue.price
    ).toBe(0);


    expect(
      formValue.stock
    ).toBe(0);


    expect(
      formValue.status
    ).toBe('Active');


    expect(
      formValue.icon
    ).toBe('📦');

  });


  // ============================================
  // INPUT DEFAULTS
  // ============================================

  it('should initialize visible as false', () => {

    expect(
      component.visible
    ).toBe(false);

  });


  it('should initialize product as null', () => {

    expect(
      component.product
    ).toBeNull();

  });


  // ============================================
  // PATCH PRODUCT
  // ============================================

  it('should patch product when product input changes', () => {

    const product = {

      id: 101,

      name:
        'Wireless Headphones',

      description:
        'Premium wireless headphones',

      category:
        'Electronics',

      price:
        2499,

      stock:
        128,

      status:
        'Active',

      icon:
        '🎧'

    };


    component.product = product;


    component.ngOnChanges({

      product:
        new SimpleChange(
          null,
          product,
          true
        )

    });


    const formValue =
      component.productForm.getRawValue();


    expect(
      formValue
    ).toEqual(product);

  });


  it('should patch product when dialog becomes visible', () => {

    const product = {

      id: 101,

      name:
        'Smart Watch',

      description:
        'Fitness smart watch',

      category:
        'Electronics',

      price:
        4999,

      stock:
        96,

      status:
        'Active',

      icon:
        '⌚'

    };


    component.product = product;

    component.visible = true;


    component.ngOnChanges({

      visible:
        new SimpleChange(
          false,
          true,
          false
        )

    });


    const formValue =
      component.productForm.getRawValue();


    expect(
      formValue
    ).toEqual(product);

  });


  it('should not patch form when product is null', () => {

    component.product = null;


    component.ngOnChanges({

      product:
        new SimpleChange(
          null,
          null,
          true
        )

    });


    expect(
      component.productForm.get('name')?.value
    ).toBe('');

  });


  // ============================================
  // NUMBER CONVERSION
  // ============================================

  it('should convert currency price to number', () => {

    const product = {

      id: 1,

      name:
        'Headphones',

      description:
        'Premium headphones',

      category:
        'Electronics',

      price:
        '₹2,499',

      stock:
        128,

      status:
        'Active',

      icon:
        '🎧'

    };


    component.product = product;


    component.ngOnChanges({

      product:
        new SimpleChange(
          null,
          product,
          true
        )

    });


    expect(
      component.productForm.get('price')?.value
    ).toBe(2499);

  });


  it('should convert comma separated price to number', () => {

    const product = {

      id: 1,

      name:
        'Headphones',

      description:
        'Premium headphones',

      category:
        'Electronics',

      price:
        '4,999',

      stock:
        '1,250',

      status:
        'Active',

      icon:
        '🎧'

    };


    component.product = product;


    component.ngOnChanges({

      product:
        new SimpleChange(
          null,
          product,
          true
        )

    });


    expect(
      component.productForm.get('price')?.value
    ).toBe(4999);


    expect(
      component.productForm.get('stock')?.value
    ).toBe(1250);

  });


  it('should keep numeric price unchanged', () => {

    const product = {

      id: 1,

      name:
        'Laptop Stand',

      description:
        'Aluminum stand',

      category:
        'Accessories',

      price:
        1799,

      stock:
        82,

      status:
        'Active',

      icon:
        '💻'

    };


    component.product = product;


    component.ngOnChanges({

      product:
        new SimpleChange(
          null,
          product,
          true
        )

    });


    expect(
      component.productForm.get('price')?.value
    ).toBe(1799);

  });


  it('should convert numeric string stock to number', () => {

    const product = {

      id: 1,

      name:
        'USB-C Hub',

      description:
        'Multi-port USB-C adapter',

      category:
        'Accessories',

      price:
        1299,

      stock:
        '100',

      status:
        'Active',

      icon:
        '🔌'

    };


    component.product = product;


    component.ngOnChanges({

      product:
        new SimpleChange(
          null,
          product,
          true
        )

    });


    expect(
      component.productForm.get('stock')?.value
    ).toBe(100);

  });


  // ============================================
  // VALIDATION
  // ============================================

  it('should mark name as invalid when empty', () => {

    const control =
      component.getControl('name');


    control?.setValue('');


    expect(
      control?.invalid
    ).toBe(true);


    expect(
      control?.errors?.['required']
    ).toBeTruthy();

  });


  it('should mark category as invalid when empty', () => {

    const control =
      component.getControl('category');


    control?.setValue('');


    expect(
      control?.invalid
    ).toBe(true);


    expect(
      control?.errors?.['required']
    ).toBeTruthy();

  });


  it('should mark status as invalid when empty', () => {

    const control =
      component.getControl('status');


    control?.setValue('');


    expect(
      control?.invalid
    ).toBe(true);


    expect(
      control?.errors?.['required']
    ).toBeTruthy();

  });


  it('should validate maximum name length', () => {

    const control =
      component.getControl('name');


    control?.setValue(
      'a'.repeat(101)
    );


    expect(
      control?.errors?.['maxlength']
    ).toBeTruthy();

  });


  it('should validate maximum description length', () => {

    const control =
      component.getControl('description');


    control?.setValue(
      'a'.repeat(501)
    );


    expect(
      control?.errors?.['maxlength']
    ).toBeTruthy();

  });


  it('should validate maximum category length', () => {

    const control =
      component.getControl('category');


    control?.setValue(
      'a'.repeat(101)
    );


    expect(
      control?.errors?.['maxlength']
    ).toBeTruthy();

  });


  it('should validate maximum icon length', () => {

    const control =
      component.getControl('icon');


    control?.setValue(
      '12345678901'
    );


    expect(
      control?.errors?.['maxlength']
    ).toBeTruthy();

  });


  it('should not allow negative price', () => {

    const control =
      component.getControl('price');


    control?.setValue(-1);


    expect(
      control?.errors?.['min']
    ).toBeTruthy();

  });


  it('should not allow negative stock', () => {

    const control =
      component.getControl('stock');


    control?.setValue(-1);


    expect(
      control?.errors?.['min']
    ).toBeTruthy();

  });


  // ============================================
  // isInvalid()
  // ============================================

  it('should return false when control is valid', () => {

    const control =
      component.getControl('name');


    control?.setValue(
      'Wireless Headphones'
    );


    control?.markAsTouched();


    expect(
      component.isInvalid('name')
    ).toBe(false);

  });


  it('should return true when control is touched and invalid', () => {

    const control =
      component.getControl('name');


    control?.setValue('');


    control?.markAsTouched();


    expect(
      component.isInvalid('name')
    ).toBe(true);

  });


  it('should return false for unknown control', () => {

    expect(
      component.isInvalid('unknown')
    ).toBe(false);

  });


  // ============================================
  // getControl()
  // ============================================

  it('should return requested control', () => {

    const control =
      component.getControl('name');


    expect(
      control
    ).toBe(
      component.productForm.get('name')
    );

  });


  it('should return null for unknown control', () => {

    expect(
      component.getControl('unknown')
    ).toBeNull();

  });


  // ============================================
  // SAVE PRODUCT
  // ============================================

  it('should not emit save when form is invalid', () => {

    const saveSpy =
      jest.spyOn(
        component.save,
        'emit'
      );


    component.productForm.patchValue({

      name: '',

      category: '',

      status: ''

    });


    component.saveProduct();


    expect(
      component.productForm.invalid
    ).toBe(true);


    expect(
      saveSpy
    ).not.toHaveBeenCalled();

  });


  it('should emit updated product when form is valid', () => {

    const saveSpy =
      jest.spyOn(
        component.save,
        'emit'
      );


    component.productForm.patchValue({

      id:
        101,

      name:
        'Wireless Headphones',

      description:
        'Premium wireless headphones',

      category:
        'Electronics',

      price:
        '₹2,499',

      stock:
        '128',

      status:
        'Active',

      icon:
        '🎧'

    });


    component.saveProduct();


    expect(
      component.productForm.valid
    ).toBe(true);


    expect(
      saveSpy
    ).toHaveBeenCalledWith({

      id:
        101,

      name:
        'Wireless Headphones',

      description:
        'Premium wireless headphones',

      category:
        'Electronics',

      price:
        2499,

      stock:
        128,

      status:
        'Active',

      icon:
        '🎧'

    });

  });


  it('should close dialog after successful save', () => {

    component.visible = true;


    component.productForm.patchValue({

      id:
        101,

      name:
        'Wireless Headphones',

      description:
        'Premium wireless headphones',

      category:
        'Electronics',

      price:
        2499,

      stock:
        128,

      status:
        'Active',

      icon:
        '🎧'

    });


    component.saveProduct();


    expect(
      component.visible
    ).toBe(false);

  });


  // ============================================
  // CLOSE
  // ============================================

  it('should close the dialog', () => {

    component.visible = true;


    component.close();


    expect(
      component.visible
    ).toBe(false);

  });


  it('should emit false when dialog is closed', () => {

    const visibleChangeSpy =
      jest.spyOn(
        component.visibleChange,
        'emit'
      );


    component.visible = true;


    component.close();


    expect(
      visibleChangeSpy
    ).toHaveBeenCalledWith(false);

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
      fallback.EDIT_PRODUCT
    ).toBeTruthy();


    expect(
      fallback.EDIT_PRODUCT.HEADER
    ).toBe(
      'Edit Product'
    );

  });

});