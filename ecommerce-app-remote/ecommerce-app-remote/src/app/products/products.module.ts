import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductInfoComponent } from './product-info/product-info.component';
import { EditProductDialogComponent } from './edit-product-dialog/edit-product-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductInfoComponent,
    EditProductDialogComponent,
    AddProductDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
    ButtonModule,
    ReactiveFormsModule
    
  ]
})
export class ProductsModule { }
