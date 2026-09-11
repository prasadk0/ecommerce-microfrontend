export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;         
  customerName: string;
  customerEmail: string;
  product: string;
  itemsCount: number;
  amount: number;
  date: string;            
  status: OrderStatus;
  paymentMethod: string;
}