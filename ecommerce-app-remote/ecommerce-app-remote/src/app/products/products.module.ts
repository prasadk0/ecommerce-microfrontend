import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { FormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductInfoComponent } from './product-info/product-info.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    
  ]
})
export class ProductsModule { }
