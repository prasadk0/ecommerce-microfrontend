import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import { PRODUCTS_CONSTANTS } from '../app.constant';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {

  constructor(private router: Router, private route: ActivatedRoute) {}

viewProduct(product: any): void {
  this.router.navigate([product.id], {
  relativeTo: this.route
});
}
  revampFallback() {
    return PRODUCTS_CONSTANTS;
  }

  trackByProduct(index: number, product: any): string {
    return product.name;
  }
}