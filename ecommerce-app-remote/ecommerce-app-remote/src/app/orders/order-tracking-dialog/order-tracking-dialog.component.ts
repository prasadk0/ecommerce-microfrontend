import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

import { Order } from '../orders/order.model';
import { ORDERS_CONSTANTS } from '../../app.constant';

import constantsJson from '../../../assets/app-fallback.json';
import { deepMerge } from 'src/app/utils/deep-merge';

interface OrderTimelineStep {
  label: string;
  description: string;
  date?: string;
  completed: boolean;
  current: boolean;
}

@Component({
  selector: 'app-order-tracking-dialog',
  templateUrl: './order-tracking-dialog.component.html',
  styleUrls: ['./order-tracking-dialog.component.scss']
})
export class OrderTrackingDialogComponent implements OnChanges {

  @Input() visible = false;

  @Input() order: Order | null = null;

  @Output() visibleChange =
    new EventEmitter<boolean>();

  timeline: OrderTimelineStep[] = [];

  readonly constants = deepMerge(
    ORDERS_CONSTANTS,
    constantsJson.ORDERS_CONSTANTS
  );

  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['order'] &&
      this.order
    ) {
      this.buildTimeline();
    }
  }

  close(): void {

    this.visibleChange.emit(false);
  }

  private buildTimeline(): void {

    if (!this.order) {
      return;
    }

    const status = this.order.status;

    const statusOrder: string[] = [
      'Pending',
      'Processing',
      'Packed',
      'Shipped',
      'Out for Delivery',
      'Delivered'
    ];

    const currentIndex =
      statusOrder.indexOf(status);

    const tracking =
      this.revampFallback().TRACKING;

    this.timeline = [

      {
        label:
          tracking.TIMELINE.ORDER_PLACED.LABEL,

        description:
          tracking.TIMELINE.ORDER_PLACED.DESCRIPTION,

        date:
          this.order.date,

        completed:
          currentIndex >= 0,

        current:
          status === 'Pending'
      },

      {
        label:
          tracking.TIMELINE.ORDER_CONFIRMED.LABEL,

        description:
          tracking.TIMELINE.ORDER_CONFIRMED.DESCRIPTION,

        date:
          this.order.date,

        completed:
          currentIndex >= 1,

        current:
          status === 'Processing'
      },

      {
        label:
          tracking.TIMELINE.PACKED.LABEL,

        description:
          tracking.TIMELINE.PACKED.DESCRIPTION,

        date:
          this.order.date,

        completed:
          currentIndex >= 2,

        current:
          status as string=== 'Packed'
      },

      {
        label:
          tracking.TIMELINE.SHIPPED.LABEL,

        description:
          tracking.TIMELINE.SHIPPED.DESCRIPTION,

        date:
          this.order.date,

        completed:
          currentIndex >= 3,

        current:
          status === 'Shipped'
      },

      {
        label:
          tracking.TIMELINE.OUT_FOR_DELIVERY.LABEL,

        description:
          tracking.TIMELINE.OUT_FOR_DELIVERY.DESCRIPTION,

        date:
          this.order.date,

        completed:
          currentIndex >= 4,

        current:
          status as string=== 'Out for Delivery'
      },

      {
        label:
          tracking.TIMELINE.DELIVERED.LABEL,

        description:
          tracking.TIMELINE.DELIVERED.DESCRIPTION,

        date:
          this.order.date,

        completed:
          currentIndex >= 5,

        current:
          status === 'Delivered'
      }

    ];
  }

  isCancelled(): boolean {

    return this.order?.status === 'Cancelled';
  }

  revampFallback() {

    return this.constants;
  }
}