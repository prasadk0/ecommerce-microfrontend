import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { PRODUCTS_CONSTANTS } from '../app.constant';
import constantsJson from '../../assets/app-fallback.json';
import { deepMerge } from '../utils/deep-merge';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {

  readonly constants = deepMerge(
    PRODUCTS_CONSTANTS,
    constantsJson.PRODUCTS_CONSTANTS
  );

  products = [
    ...this.constants.TABLE.PRODUCTS
  ];

  showEditDialog = false;
  selectedProduct: any = null;

  showAddDialog = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  viewProduct(product: any): void {
    this.router.navigate([product.id], {
        relativeTo: this.route
    });
  }

  openAddProduct(): void {
    this.showAddDialog = true;

    this.cdr.markForCheck();
  }

  onProductAdd(newProduct: any): void {
    const newId = this.generateProductId();

    const productToAdd = {
      ...newProduct,
      id: newId
    };

    this.products = [
      productToAdd,
      ...this.products
    ];

    this.showAddDialog = false;

    this.cdr.markForCheck();

  }

  onAddDialogClose(): void {
    this.showAddDialog = false;

    this.cdr.markForCheck();
  }

  editProduct(product: any): void {
    this.selectedProduct = {
      ...product
    };

    this.showEditDialog = true;

    this.cdr.markForCheck();
  }

  onProductSave(updatedProduct: any): void {
    const index = this.products.findIndex(
      product => product.id === updatedProduct.id
    );

    if (index === -1) {
      return;
    }

    this.products[index] = {
      ...updatedProduct
    };

    this.products = [...this.products];

    this.showEditDialog = false;
    this.selectedProduct = null;

    this.cdr.markForCheck();
  }

  onDialogClose(): void {
    this.showEditDialog = false;
    this.selectedProduct = null;

    this.cdr.markForCheck();
  }

  deleteProduct(product: any): void {
    this.products = this.products.filter(
      item => item.id !== product.id
    );

    this.cdr.markForCheck();
  }

  private generateProductId(): string {
    if (!this.products.length) {
      return '1';
    }

    const numericIds = this.products
      .map(product => Number(product.id))
      .filter(id => !isNaN(id));

    if (!numericIds.length) {
      return '1';
    }

    const maxId = Math.max(...numericIds);

    return String(maxId + 1);
  }


  revampFallback() {
    return this.constants;
  }

  trackByProduct(
    index: number,
    product: any
  ): string {
    return product.id;
  }
}