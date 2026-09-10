import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { OrderTrackingDialogComponent } from './order-tracking-dialog/order-tracking-dialog.component';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderTrackingDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OrdersRoutingModule,
    DialogModule
  ]
})
export class OrdersModule {}