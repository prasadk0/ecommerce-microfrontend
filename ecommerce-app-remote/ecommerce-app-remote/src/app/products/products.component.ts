import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import { PRODUCTS_CONSTANTS } from '../app.constant';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {

  revampFallback() {
    return PRODUCTS_CONSTANTS;
  }

  trackByProduct(index: number, product: any): string {
    return product.name;
  }
}