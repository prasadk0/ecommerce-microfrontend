import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { FormsModule } from '@angular/forms';

import { OrdersComponent } from './orders.component';

import {
  OrderTrackingDialogComponent
} from '../order-tracking-dialog/order-tracking-dialog.component';

import {
  ORDERS_CONSTANTS
} from 'src/app/app.constant';

import * as XLSX from 'xlsx';

/*
 * JSON fallback mock used by OrderTrackingDialogComponent.
 */
jest.mock(
  '../../../assets/app-fallback.json',
  () => ({
    __esModule: true,

    default: {
      ORDERS_CONSTANTS: {
        PAGE_HEADER: {
          TITLE: 'Orders',
          DESCRIPTION: 'Manage and monitor your orders'
        },

        FILTER: {
          STATUS_ALL: 'All'
        },

        TABLE: {
          TITLE: 'All Orders',
          DESCRIPTION: 'Manage and monitor customer orders'
        },

        ACTIONS: {
          VIEW: 'View'
        },

        EMPTY_STATE: {
          TITLE: 'No Orders Found',
          DESCRIPTION: 'There are no orders matching your search.'
        },

        TRACKING: {
          HEADER: 'Order Tracking'
        }
      }
    }
  })
);


/*
 * Mock XLSX file writing.
 */
jest.mock(
  'xlsx',
  () => ({
    utils: {
      json_to_sheet: jest.fn(() => ({
        '!cols': []
      })),

      book_new: jest.fn(() => ({
        Sheets: {},
        SheetNames: []
      })),

      book_append_sheet: jest.fn()
    },

    writeFile: jest.fn()
  })
);


describe('OrdersComponent', () => {

  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      declarations: [
        OrdersComponent,
        OrderTrackingDialogComponent
      ],

      imports: [
        FormsModule
      ]

    }).compileComponents();

    fixture =
      TestBed.createComponent(
        OrdersComponent
      );

    component =
      fixture.componentInstance;

    fixture.detectChanges();
  });


  // =========================================================
  // BASIC
  // =========================================================

  it('should create', () => {

    expect(component)
      .toBeTruthy();

  });


  it('should initialize orders on ngOnInit', () => {

    expect(component.totalOrders)
      .toBe(
        ORDERS_CONSTANTS.TABLE.ORDERS.length
      );

    expect(component.filteredOrders.length)
      .toBe(
        ORDERS_CONSTANTS.TABLE.ORDERS.length
      );

    expect(component.pagedOrders.length)
      .toBeLessThanOrEqual(
        component.pageSize
      );

  });


  // =========================================================
  // FALLBACK / CONSTANTS
  // =========================================================

  it('should return constants from revampFallback', () => {

    expect(
      component.revampFallback()
    ).toBe(
      component.constants
    );

  });


  it('should expose orders constants', () => {

    expect(component.constants)
      .toBe(
        ORDERS_CONSTANTS
      );

  });


  // =========================================================
  // SUMMARY
  // =========================================================

  it('should calculate total orders', () => {

    expect(component.totalOrders)
      .toBe(
        ORDERS_CONSTANTS.TABLE.ORDERS.length
      );

  });


  it('should calculate pending order count', () => {

    const expected =
      ORDERS_CONSTANTS.TABLE.ORDERS
        .filter(
          order =>
            String(order.status)
              .trim()
              .toLowerCase() === 'pending'
        )
        .length;

    expect(component.pendingCount)
      .toBe(expected);

  });


  it('should calculate processing order count', () => {

    const expected =
      ORDERS_CONSTANTS.TABLE.ORDERS
        .filter(
          order =>
            String(order.status)
              .trim()
              .toLowerCase() === 'processing'
        )
        .length;

    expect(component.processingCount)
      .toBe(expected);

  });


  it('should calculate delivered order count', () => {

    const expected =
      ORDERS_CONSTANTS.TABLE.ORDERS
        .filter(
          order =>
            String(order.status)
              .trim()
              .toLowerCase() === 'delivered'
        )
        .length;

    expect(component.deliveredCount)
      .toBe(expected);

  });


  it('should calculate total revenue excluding cancelled orders', () => {

    const expected =
      ORDERS_CONSTANTS.TABLE.ORDERS

        .filter(
          order =>
            String(order.status)
              .trim()
              .toLowerCase() !== 'cancelled'
        )

        .reduce(
          (
            total,
            order
          ) =>
            total +
            Number(
              order.amount || 0
            ),
          0
        );

    expect(component.totalRevenue)
      .toBe(expected);

  });


  // =========================================================
  // PRODUCT ICON
  // =========================================================

  it('should return product icon', () => {

    const product =
      ORDERS_CONSTANTS.TABLE.ORDERS[0].product;

    const icon =
      component.getIcon(product);

    expect(icon)
      .toBeTruthy();

  });


  // =========================================================
  // SEARCH
  // =========================================================

  it('should update search results after debounce', fakeAsync(() => {

    const firstOrder =
      ORDERS_CONSTANTS.TABLE.ORDERS[0];

    component.onSearchInput(
      firstOrder.id
    );

    expect(component.searchTerm)
      .toBe('');

    tick(300);

    expect(component.searchTerm)
      .toBe(
        firstOrder.id.trim()
      );

    expect(
      component.filteredOrders.length
    )
      .toBeGreaterThan(0);

    expect(
      component.filteredOrders.every(
        order =>
          String(order.id)
            .toLowerCase()
            .includes(
              firstOrder.id.toLowerCase()
            )
      )
    )
      .toBe(true);

  }));


  it('should reset page to first page when searching', fakeAsync(() => {

    component.goToPage(2);

    component.onSearchInput(
      'customer'
    );

    tick(300);

    expect(component.currentPage)
      .toBe(1);

  }));


  it('should trim search input', fakeAsync(() => {

    component.onSearchInput(
      '   test   '
    );

    tick(300);

    expect(component.searchTerm)
      .toBe('test');

  }));


  it('should handle null search input', fakeAsync(() => {

    component.onSearchInput(
      null as any
    );

    tick(300);

    expect(component.searchTerm)
      .toBe('');

    expect(component.filteredOrders.length)
      .toBe(
        ORDERS_CONSTANTS.TABLE.ORDERS.length
      );

  }));


  // =========================================================
  // STATUS FILTER
  // =========================================================

  it('should filter orders by status', () => {

    component.onStatusChange(
      'Pending' as any
    );

    expect(component.statusFilter)
      .toBe('Pending');

    expect(component.currentPage)
      .toBe(1);

    expect(
      component.filteredOrders.every(
        order =>
          String(order.status)
            .trim()
            .toLowerCase() === 'pending'
      )
    )
      .toBe(true);

  });


  it('should show all orders when status is All', () => {

    component.onStatusChange(
      'All'
    );

    expect(component.filteredOrders.length)
      .toBe(
        ORDERS_CONSTANTS.TABLE.ORDERS.length
      );

  });


  it('should reset page when status changes', () => {

    component.goToPage(2);

    component.onStatusChange(
      'Delivered' as any
    );

    expect(component.currentPage)
      .toBe(1);

  });


  // =========================================================
  // PAGINATION
  // =========================================================

  it('should calculate total pages using page size', () => {

    const expected =
      Math.max(
        1,
        Math.ceil(
          component.filteredOrders.length /
          component.pageSize
        )
      );

    expect(component.totalPages)
      .toBe(expected);

  });


  it('should navigate to a valid page', () => {

    if (component.totalPages > 1) {

      component.goToPage(2);

      expect(component.currentPage)
        .toBe(2);

    } else {

      component.goToPage(1);

      expect(component.currentPage)
        .toBe(1);

    }

  });


  it('should ignore page lower than 1', () => {

    const originalPage =
      component.currentPage;

    component.goToPage(0);

    expect(component.currentPage)
      .toBe(originalPage);

  });


  it('should ignore page greater than total pages', () => {

    const originalPage =
      component.currentPage;

    component.goToPage(
      component.totalPages + 1
    );

    expect(component.currentPage)
      .toBe(originalPage);

  });


  // =========================================================
  // ORDER TRACKING
  // =========================================================

  it('should open order tracking dialog', () => {

    const order =
      ORDERS_CONSTANTS.TABLE.ORDERS[0];

    component.viewOrder(order);

    expect(component.showOrderTracking)
      .toBe(true);

    expect(component.selectedOrder)
      .toEqual(order);

    expect(component.selectedOrder)
      .not
      .toBe(order);

  });


  it('should close order tracking dialog', () => {

    const order =
      ORDERS_CONSTANTS.TABLE.ORDERS[0];

    component.viewOrder(order);

    component.closeOrderTracking();

    expect(component.showOrderTracking)
      .toBe(false);

    expect(component.selectedOrder)
      .toBeNull();

  });


  // =========================================================
  // TRACK BY
  // =========================================================

  it('should return order id from trackByOrder', () => {

    const order =
      ORDERS_CONSTANTS.TABLE.ORDERS[0];

    const result =
      component.trackByOrder(
        0,
        order
      );

    expect(result)
      .toBe(
        String(order.id)
      );

  });


  // =========================================================
  // STATUS CLASS
  // =========================================================

  it('should convert status to CSS class', () => {

    expect(
      component.statusClass(
        'Out for Delivery'
      )
    )
      .toBe(
        'out-for-delivery'
      );

  });


  it('should trim and lowercase status class', () => {

    expect(
      component.statusClass(
        '  Processing  '
      )
    )
      .toBe(
        'processing'
      );

  });


  it('should return empty string for undefined status', () => {

    expect(
      component.statusClass(
        undefined
      )
    )
      .toBe('');

  });


  it('should return empty string for empty status', () => {

    expect(
      component.statusClass(
        ''
      )
    )
      .toBe('');

  });


  // =========================================================
  // EXCEL EXPORT
  // =========================================================

  it('should export filtered orders to Excel', () => {

    const jsonToSheetSpy =
      XLSX.utils.json_to_sheet as jest.Mock;

    const bookNewSpy =
      XLSX.utils.book_new as jest.Mock;

    const appendSheetSpy =
      XLSX.utils.book_append_sheet as jest.Mock;

    const writeFileSpy =
      XLSX.writeFile as jest.Mock;

    component.exportToExcel();

    expect(jsonToSheetSpy)
      .toHaveBeenCalled();

    expect(bookNewSpy)
      .toHaveBeenCalled();

    expect(appendSheetSpy)
      .toHaveBeenCalled();

    expect(writeFileSpy)
      .toHaveBeenCalled();

  });


  it('should export only filtered orders', () => {

    const jsonToSheetSpy =
      XLSX.utils.json_to_sheet as jest.Mock;

    component.onStatusChange(
      'Pending' as any
    );

    component.exportToExcel();

    expect(jsonToSheetSpy)
      .toHaveBeenCalled();

    const exportedData =
      jsonToSheetSpy.mock.calls[
        jsonToSheetSpy.mock.calls.length - 1
      ][0];

    expect(exportedData.length)
      .toBe(
        component.filteredOrders.length
      );

  });


  it('should show alert when there are no orders to export', () => {

    const alertSpy =
      jest
        .spyOn(
          window,
          'alert'
        )
        .mockImplementation(
          () => {}
        );

    component.filteredOrders = [];

    component.exportToExcel();

    expect(alertSpy)
      .toHaveBeenCalledWith(
        component
          .revampFallback()
          .EMPTY_STATE
          .DESCRIPTION
      );

    alertSpy.mockRestore();

  });


  // =========================================================
  // DESTROY
  // =========================================================

  it('should complete destroy subject on ngOnDestroy', () => {

    const destroySubject =
      (component as any).destroy$;

    const nextSpy =
      jest.spyOn(
        destroySubject,
        'next'
      );

    const completeSpy =
      jest.spyOn(
        destroySubject,
        'complete'
      );

    component.ngOnDestroy();

    expect(nextSpy)
      .toHaveBeenCalled();

    expect(completeSpy)
      .toHaveBeenCalled();

  });


  it('should complete search subject on ngOnDestroy', () => {

    const searchSubject =
      (component as any).searchTerm$;

    const completeSpy =
      jest.spyOn(
        searchSubject,
        'complete'
      );

    component.ngOnDestroy();

    expect(completeSpy)
      .toHaveBeenCalled();

  });

});