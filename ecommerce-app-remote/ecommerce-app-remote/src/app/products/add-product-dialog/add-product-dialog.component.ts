import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { PRODUCTS_CONSTANTS } from 'src/app/app.constant';
import constantsJson from '../../../assets/app-fallback.json';
import { deepMerge } from 'src/app/utils/deep-merge';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit {

  @Input() visible = false;

  @Output() visibleChange =
    new EventEmitter<boolean>();

  @Output() save =
    new EventEmitter<any>();

  productForm!: FormGroup;

  readonly constants = deepMerge(
    PRODUCTS_CONSTANTS,
    constantsJson.PRODUCTS_CONSTANTS
  );

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {

    this.productForm = this.fb.group({

      id: [
        this.constants.ADD_PRODUCT.DEFAULTS.ID
      ],

      name: [
        this.constants.ADD_PRODUCT.DEFAULTS.NAME,
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],

      description: [
        this.constants.ADD_PRODUCT.DEFAULTS.DESCRIPTION,
        [
          Validators.maxLength(500)
        ]
      ],

      category: [
        this.constants.ADD_PRODUCT.DEFAULTS.CATEGORY,
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],

      price: [
        this.constants.ADD_PRODUCT.DEFAULTS.PRICE,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      stock: [
        this.constants.ADD_PRODUCT.DEFAULTS.STOCK,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      status: [
        this.constants.ADD_PRODUCT.DEFAULTS.STATUS,
        Validators.required
      ],

      icon: [
        this.constants.ADD_PRODUCT.DEFAULTS.ICON,
        [
          Validators.maxLength(10)
        ]
      ]
    });
  }

  open(): void {

    this.productForm.reset({

      id: this.constants.ADD_PRODUCT.DEFAULTS.ID,

      name: this.constants.ADD_PRODUCT.DEFAULTS.NAME,

      description:
        this.constants.ADD_PRODUCT.DEFAULTS.DESCRIPTION,

      category:
        this.constants.ADD_PRODUCT.DEFAULTS.CATEGORY,

      price:
        this.constants.ADD_PRODUCT.DEFAULTS.PRICE,

      stock:
        this.constants.ADD_PRODUCT.DEFAULTS.STOCK,

      status:
        this.constants.ADD_PRODUCT.DEFAULTS.STATUS,

      icon:
        this.constants.ADD_PRODUCT.DEFAULTS.ICON
    });

    this.productForm.markAsPristine();
    this.productForm.markAsUntouched();

    this.visible = true;
  }

  saveProduct(): void {

    if (this.productForm.invalid) {

      this.productForm.markAllAsTouched();

      return;
    }

    const product = {
      ...this.productForm.getRawValue()
    };

    this.save.emit(product);

    this.close();
  }

  close(): void {

    this.visible = false;

    this.visibleChange.emit(false);
  }

  isInvalid(controlName: string): boolean {

    const control =
      this.productForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || control.dirty)
    );
  }

  getControl(controlName: string) {

    return this.productForm.get(controlName);
  }

  revampFallback() {

    return this.constants;
  }
}