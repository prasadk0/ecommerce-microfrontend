import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Order, OrderStatus } from './order.model';
import { getProductIcon, ORDERS_CONSTANTS } from 'src/app/app.constant';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit, OnDestroy {

  private allOrders: Order[] = ORDERS_CONSTANTS.TABLE.ORDERS;

  searchTerm = '';
  statusFilter: OrderStatus | 'All' = ORDERS_CONSTANTS.FILTER.STATUS_ALL as OrderStatus | 'All';
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
  private readonly searchTerm$ = new Subject<string>();
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.computeSummary();
    this.applyFilters();

    this.searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(term => {
        this.searchTerm = term;
        this.currentPage = 1;
        this.applyFilters();
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  revampFallback() {
    return ORDERS_CONSTANTS;
  }

  getIcon(productName: string): string {
    return getProductIcon(productName);
  }

  onSearchInput(value: string): void {
    this.searchTerm$.next(value);
  }

  onStatusChange(value: OrderStatus | 'All'): void {
    this.statusFilter = value;
    this.currentPage = 1;
    this.applyFilters();
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    this.currentPage = page;
    this.paginate();
  }

  viewOrder(order: Order): void {
    console.log('View order', order.id);
  }

  trackByOrder(_index: number, order: Order): string {
    return order.id;
  }

  statusClass(status: string | undefined): string {
    return status ? status.toLowerCase().replace(' ', '-') : '';
  }

  private applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();
    const status = this.statusFilter;

    this.filteredOrders = this.allOrders.filter(order => {
      const matchesSearch =
        !term ||
        order.id.toLowerCase().includes(term) ||
        order.customerName.toLowerCase().includes(term) ||
        order.product.toLowerCase().includes(term);

      const matchesStatus = status === ORDERS_CONSTANTS.FILTER.STATUS_ALL || order.status === status;

      return matchesSearch && matchesStatus;
    });

    this.totalPages = Math.max(1, Math.ceil(this.filteredOrders.length / this.pageSize));
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    this.paginate();
  }

  private paginate(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    this.pagedOrders = this.filteredOrders.slice(start, start + this.pageSize);
  }

  private computeSummary(): void {
    this.totalOrders = this.allOrders.length;
    this.pendingCount = this.allOrders.filter(o => o.status === 'Pending').length;
    this.processingCount = this.allOrders.filter(o => o.status === 'Processing').length;
    this.deliveredCount = this.allOrders.filter(o => o.status === 'Delivered').length;
    this.totalRevenue = this.allOrders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + o.amount, 0);
  }
}