import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductInfoComponent } from './product-info/product-info.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: ':id',
    component: ProductInfoComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductsRoutingModule {}