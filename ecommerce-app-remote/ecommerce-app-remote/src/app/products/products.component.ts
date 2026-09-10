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

  filteredProducts = [
    ...this.products
  ];

  showEditDialog = false;
  selectedProduct: any = null;

  showAddDialog = false;

  // ==============================
  // FILTERS
  // ==============================

  searchTerm = '';
  selectedCategory = 'all';
  selectedStock = 'all';
  selectedStatus = 'all';
  selectedPrice = 'all';
  selectedSort = 'default';

  // ==============================
  // FILTER OPTIONS
  // ==============================

  categories: string[] = [];
  readonly stockOptions = [
    'all',
    'in-stock',
    'low-stock',
    'out-of-stock'
  ];

  readonly statusOptions = [
    'all',
    'In Stock',
    'Low Stock',
    'Out of Stock'
  ];

  readonly priceOptions = [
    'all',
    '0-1000',
    '1000-5000',
    '5000-10000',
    '10000+'
  ];

  readonly sortOptions = [
    'default',
    'name-asc',
    'name-desc',
    'price-low-high',
    'price-high-low',
    'stock-low-high',
    'stock-high-low'
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.initializeFilters();
  }

  // ==============================
  // INITIALIZE FILTERS
  // ==============================

  private initializeFilters(): void {
    this.categories = [
      ...new Set(
        this.products
          .map(product => product?.category)
          .filter(Boolean)
      )
    ];
  }

  // ==============================
  // APPLY FILTERS
  // ==============================

  applyFilters(): void {

    let result = [...this.products];

    // SEARCH
    if (this.searchTerm.trim()) {

      const search = this.searchTerm
        .trim()
        .toLowerCase();

      result = result.filter(product =>
        product?.name
          ?.toLowerCase()
          .includes(search) ||

        product?.description
          ?.toLowerCase()
          .includes(search)
      );
    }

    // CATEGORY
    if (this.selectedCategory !== 'all') {

      result = result.filter(product =>
        product?.category === this.selectedCategory
      );
    }

    // STOCK
    if (this.selectedStock !== 'all') {

      result = result.filter(product => {

        const stock = Number(product?.stock ?? 0);

        switch (this.selectedStock) {

          case 'in-stock':
            return stock > 20;

          case 'low-stock':
            return stock > 0 && stock <= 20;

          case 'out-of-stock':
            return stock === 0;

          default:
            return true;
        }
      });
    }

    // STATUS
    if (this.selectedStatus !== 'all') {

      result = result.filter(product =>
        product?.status === this.selectedStatus
      );
    }

    // PRICE
    if (this.selectedPrice !== 'all') {

      result = result.filter(product => {

        const price = Number(product?.price ?? 0);

        switch (this.selectedPrice) {

          case '0-1000':
            return price <= 1000;

          case '1000-5000':
            return price > 1000 && price <= 5000;

          case '5000-10000':
            return price > 5000 && price <= 10000;

          case '10000+':
            return price > 10000;

          default:
            return true;
        }
      });
    }

    // SORT
    result = this.sortProducts(result);

    this.filteredProducts = result;

    this.cdr.markForCheck();
  }

  // ==============================
  // SORT
  // ==============================

  private sortProducts(products: any[]): any[] {

    const result = [...products];

    switch (this.selectedSort) {

      case 'name-asc':
        return result.sort((a, b) =>
          String(a?.name ?? '')
            .localeCompare(String(b?.name ?? ''))
        );

      case 'name-desc':
        return result.sort((a, b) =>
          String(b?.name ?? '')
            .localeCompare(String(a?.name ?? ''))
        );

      case 'price-low-high':
        return result.sort(
          (a, b) =>
            Number(a?.price ?? 0) -
            Number(b?.price ?? 0)
        );

      case 'price-high-low':
        return result.sort(
          (a, b) =>
            Number(b?.price ?? 0) -
            Number(a?.price ?? 0)
        );

      case 'stock-low-high':
        return result.sort(
          (a, b) =>
            Number(a?.stock ?? 0) -
            Number(b?.stock ?? 0)
        );

      case 'stock-high-low':
        return result.sort(
          (a, b) =>
            Number(b?.stock ?? 0) -
            Number(a?.stock ?? 0)
        );

      default:
        return result;
    }
  }

  // ==============================
  // CLEAR FILTERS
  // ==============================

  clearFilters(): void {

    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.selectedStock = 'all';
    this.selectedStatus = 'all';
    this.selectedPrice = 'all';
    this.selectedSort = 'default';

    this.applyFilters();
  }

  // ==============================
  // FILTER EVENTS
  // ==============================

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  // ==============================
  // PRODUCT ACTIONS
  // ==============================

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

    this.categories = [
      ...new Set(
        this.products
          .map(product => product?.category)
          .filter(Boolean)
      )
    ];

    this.showAddDialog = false;

    this.applyFilters();
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

    this.applyFilters();
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

    this.applyFilters();
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