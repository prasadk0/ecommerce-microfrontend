import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';



@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
