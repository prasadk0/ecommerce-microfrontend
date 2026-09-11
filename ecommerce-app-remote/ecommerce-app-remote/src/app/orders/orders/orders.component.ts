import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { Subject } from 'rxjs';

import {
  debounceTime,
  distinctUntilChanged,
  takeUntil
} from 'rxjs/operators';

import {
  Order,
  OrderStatus
} from './order.model';

import {
  getProductIcon,
  ORDERS_CONSTANTS
} from 'src/app/app.constant';
import constantsJson from '../../../assets/app-fallback.json'
import { deepMerge, mergeProducts } from 'src/app/utils/deep-merge';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit, OnDestroy {

 readonly constants = deepMerge(
    ORDERS_CONSTANTS,
    constantsJson.ORDERS_CONSTANTS
  );

  private readonly allOrders: Order[] =
    mergeProducts(
      ORDERS_CONSTANTS.TABLE.ORDERS,
      constantsJson.ORDERS_CONSTANTS.TABLE.ORDERS
    );

  searchTerm = '';

  statusFilter: OrderStatus | 'All' =
    this.constants.FILTER.STATUS_ALL as
    | OrderStatus
    | 'All';

  readonly pageSize = 5;

  currentPage = 1;

  totalPages = 1;

  filteredOrders: Order[] = [];

  pagedOrders: Order[] = [];

  totalOrders = 0;

  pendingCount = 0;

  processingCount = 0;

  deliveredCount = 0;

  totalRevenue = 0;

  selectedOrder: Order | null = null;

  showOrderTracking = false;

  private readonly searchTerm$ =
    new Subject<string>();

  private readonly destroy$ =
    new Subject<void>();

  constructor(
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.computeSummary();

    this.updateOrders();

    this.searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(
        term => {

          this.searchTerm =
            term.trim();

          this.currentPage = 1;

          this.updateOrders();

          this.cdr.markForCheck();
        }
      );
  }

  ngOnDestroy(): void {

    this.destroy$.next();

    this.destroy$.complete();

    this.searchTerm$.complete();
  }

  revampFallback() {
    return this.constants;
  }

  getIcon(
    productName: string
  ): string {

    return getProductIcon(
      productName
    );
  }

  onSearchInput(
    value: string
  ): void {

    this.searchTerm$.next(
      value ?? ''
    );
  }

  onStatusChange(
    value: OrderStatus | 'All'
  ): void {

    this.statusFilter =
      value;

    this.currentPage = 1;

    this.updateOrders();

    this.cdr.markForCheck();
  }

  private updateOrders(): void {

    const search =
      this.normalize(
        this.searchTerm
      );

    const selectedStatus =
      this.normalize(
        String(
          this.statusFilter
        )
      );

    const allStatus =
      this.normalize(
        String(
          this.constants.FILTER.STATUS_ALL
        )
      );

    const result =
      this.allOrders.filter(
        order => {

          const id =
            this.normalize(
              String(
                order.id ?? ''
              )
            );

          const customerName =
            this.normalize(
              String(
                order.customerName ?? ''
              )
            );

          const customerEmail =
            this.normalize(
              String(
                order.customerEmail ?? ''
              )
            );

          const product =
            this.normalize(
              String(
                order.product ?? ''
              )
            );

          const status =
            this.normalize(
              String(
                order.status ?? ''
              )
            );

          const matchesSearch =
            !search ||
            id.includes(search) ||
            customerName.includes(search) ||
            customerEmail.includes(search) ||
            product.includes(search) ||
            status.includes(search);

          const matchesStatus =
            selectedStatus === allStatus ||
            status === selectedStatus;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );

    this.filteredOrders = [
      ...result
    ];

    this.totalPages =
      Math.max(
        1,
        Math.ceil(
          this.filteredOrders.length /
          this.pageSize
        )
      );

    if (
      this.currentPage >
      this.totalPages
    ) {
      this.currentPage = 1;
    }

    this.updatePagedOrders();
  }

  private updatePagedOrders(): void {

    const start =
      (this.currentPage - 1) *
      this.pageSize;

    const end =
      start + this.pageSize;

    this.pagedOrders = [
      ...this.filteredOrders.slice(
        start,
        end
      )
    ];
  }

  goToPage(
    page: number
  ): void {

    if (
      page < 1 ||
      page > this.totalPages
    ) {
      return;
    }

    this.currentPage =
      page;

    this.updatePagedOrders();

    this.cdr.markForCheck();
  }

  viewOrder(
    order: Order
  ): void {

    this.selectedOrder = {
      ...order
    };

    this.showOrderTracking = true;

    this.cdr.markForCheck();
  }

  closeOrderTracking(): void {

    this.showOrderTracking = false;

    this.selectedOrder = null;

    this.cdr.markForCheck();
  }

  trackByOrder(
    _index: number,
    order: Order
  ): string {

    return String(
      order.id
    );
  }

  statusClass(
    status: string | undefined
  ): string {

    if (!status) {
      return '';
    }

    return status
      .trim()
      .toLowerCase()
      .replace(
        /\s+/g,
        '-'
      );
  }

  private computeSummary(): void {

    this.totalOrders =
      this.allOrders.length;

    this.pendingCount =
      this.allOrders.filter(
        order =>
          this.normalize(
            String(
              order.status ?? ''
            )
          ) === 'pending'
      ).length;

    this.processingCount =
      this.allOrders.filter(
        order =>
          this.normalize(
            String(
              order.status ?? ''
            )
          ) === 'processing'
      ).length;

    this.deliveredCount =
      this.allOrders.filter(
        order =>
          this.normalize(
            String(
              order.status ?? ''
            )
          ) === 'delivered'
      ).length;

    this.totalRevenue =
      this.allOrders
        .filter(
          order =>
            this.normalize(
              String(
                order.status ?? ''
              )
            ) !== 'cancelled'
        )
        .reduce(
          (
            sum,
            order
          ) =>
            sum +
            Number(
              order.amount || 0
            ),
          0
        );
  }

  // ============================================================
  // NORMALIZE
  // ============================================================

  private normalize(
    value: string
  ): string {

    return String(
      value ?? ''
    )
      .trim()
      .toLowerCase();
  }

  exportToExcel(): void {

    const ordersToExport =
      this.filteredOrders;

    if (
      !ordersToExport.length
    ) {

      alert(
        this.revampFallback()
          .EMPTY_STATE
          .DESCRIPTION
      );

      return;
    }

    const excelData =
      ordersToExport.map(
        order => ({

          'Order ID':
            order.id,

          'Customer Name':
            order.customerName,

          'Customer Email':
            order.customerEmail,

          'Product':
            order.product,

          'Items':
            order.itemsCount ?? 1,

          'Amount':
            order.amount,

          'Date':
            order.date,

          'Status':
            order.status

        })
      );

    const worksheet:
      XLSX.WorkSheet =
      XLSX.utils.json_to_sheet(
        excelData
      );

    const workbook:
      XLSX.WorkBook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Orders'
    );

    worksheet['!cols'] = [
      { wch: 15 },
      { wch: 25 },
      { wch: 30 },
      { wch: 25 },
      { wch: 10 },
      { wch: 15 },
      { wch: 18 },
      { wch: 15 }
    ];

    const fileName =
      `orders-${new Date()
        .toISOString()
        .split('T')[0]
      }.xlsx`;

    XLSX.writeFile(
      workbook,
      fileName
    );

  }
}