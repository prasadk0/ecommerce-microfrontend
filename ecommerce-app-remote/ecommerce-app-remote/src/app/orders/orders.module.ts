import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { OrderTrackingDialogComponent } from './order-tracking-dialog/order-tracking-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    OrdersComponent,
    OrderTrackingDialogComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    DialogModule,
  ]
})
export class OrdersModule { }
