import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  PRODUCTS_CONSTANTS
} from 'src/app/app.constant';

import constantsJson from '../../../assets/app-fallback.json';

import { deepMerge } from 'src/app/utils/deep-merge';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss']
})
export class EditProductDialogComponent
  implements OnChanges {

  @Input() visible = false;

  @Input() product: any = null;

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
    private readonly fb: FormBuilder
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {

    this.productForm =
      this.fb.group({

        id: [''],

        name: [
          '',
          [
            Validators.required,
            Validators.maxLength(100)
          ]
        ],

        description: [
          '',
          [
            Validators.maxLength(500)
          ]
        ],

        category: [
          '',
          [
            Validators.required,
            Validators.maxLength(100)
          ]
        ],

        price: [
          0,
          [
            Validators.required,
            Validators.min(0)
          ]
        ],

        stock: [
          0,
          [
            Validators.required,
            Validators.min(0)
          ]
        ],

        status: [
          'Active',
          Validators.required
        ],

        icon: [
          '📦',
          [
            Validators.maxLength(10)
          ]
        ]
      });
  }

  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (
      changes['product'] &&
      this.product
    ) {
      this.patchProduct();
    }

    if (
      changes['visible'] &&
      this.visible &&
      this.product
    ) {
      this.patchProduct();
    }
  }

  private patchProduct(): void {

    if (!this.product) {
      return;
    }

    this.productForm.patchValue({

      id:
        this.product.id ?? '',

      name:
        this.product.name ?? '',

      description:
        this.product.description ?? '',

      category:
        this.product.category ?? '',

      price:
        this.getNumberValue(
          this.product.price
        ),

      stock:
        this.getNumberValue(
          this.product.stock
        ),

      status:
        this.product.status ?? 'Active',

      icon:
        this.product.icon ?? '📦'
    });

    this.productForm.markAsPristine();

    this.productForm.markAsUntouched();
  }

  private getNumberValue(
    value: any
  ): number {

    if (
      typeof value === 'number'
    ) {
      return Number.isFinite(value)
        ? value
        : 0;
    }

    if (
      value === null ||
      value === undefined ||
      value === ''
    ) {
      return 0;
    }

    const cleanedValue =
      String(value)
        .replace(/₹/g, '')
        .replace(/,/g, '')
        .trim();

    const numberValue =
      Number(cleanedValue);

    return Number.isFinite(numberValue)
      ? numberValue
      : 0;
  }

  saveProduct(): void {

    if (
      this.productForm.invalid
    ) {
      this.productForm.markAllAsTouched();

      return;
    }

    const formValue =
      this.productForm.getRawValue();

    const updatedProduct = {
      ...formValue,

      price:
        this.getNumberValue(
          formValue.price
        ),

      stock:
        this.getNumberValue(
          formValue.stock
        )
    };

    this.save.emit(
      updatedProduct
    );

    this.close();
  }

  close(): void {

    this.visible = false;

    this.visibleChange.emit(
      false
    );
  }

  isInvalid(
    controlName: string
  ): boolean {

    const control =
      this.productForm.get(
        controlName
      );

    return !!(
      control &&
      control.invalid &&
      (
        control.touched ||
        control.dirty
      )
    );
  }

  getControl(
    controlName: string
  ) {
    return this.productForm.get(
      controlName
    );
  }

  revampFallback() {
    return this.constants;
  }
}
