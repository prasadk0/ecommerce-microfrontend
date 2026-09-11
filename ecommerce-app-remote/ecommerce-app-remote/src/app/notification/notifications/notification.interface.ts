export interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'order' | 'product' | 'system';
  icon: string;
  time: string;
  read: boolean;
}