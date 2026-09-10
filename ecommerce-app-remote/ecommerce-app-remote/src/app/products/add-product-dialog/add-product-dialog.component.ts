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

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit {

  @Input() visible = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<any>();

  productForm!: FormGroup;

  statusOptions = [
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
  ];

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.productForm = this.fb.group({
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

  open(): void {
    this.productForm.reset({
      id: '',
      name: '',
      description: '',
      category: '',
      price: 0,
      stock: 0,
      status: 'Active',
      icon: '📦'
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
    const control = this.productForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || control.dirty)
    );
  }

  getControl(controlName: string) {
    return this.productForm.get(controlName);
  }

  revampFallback() { return PRODUCTS_CONSTANTS; }
}