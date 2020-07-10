import {Product} from './product.domain';

export enum OrderStatus {
  draft = 'draft',
  confirmed = 'confirmed',
  pending = 'pending',
  success = 'success',
  error = 'error',
}

export type OrderItem = {
  product: Product;
  quantity: number;
};

export type Order = DraftOrder | ConfirmedOrder | PendingOrder | SuccessOrder | ErrorOrder;

export type DraftOrder = {
  status: OrderStatus.draft;
  items: OrderItem[];
  customerInfo?: CustomerInfo;
};

export type ConfirmedOrder = {
  status: OrderStatus.confirmed;
  items: OrderItem[];
  customerInfo?: CustomerInfo;
};

export type CustomerInfo = {
  customerName: string;
  email: string;
  phoneNumber: string;
  address: string;
};

export type PendingOrder = {
  status: OrderStatus.pending;
  items: OrderItem[];
  customerInfo: CustomerInfo;
};

export type SuccessOrder = {
  status: OrderStatus.success;
  items: OrderItem[];
  customerInfo: CustomerInfo;
  totalPriceEUR: number;
  id: number;
  orderDate: Date;
};

export type ErrorOrder = {
  status: OrderStatus.error;
  items: OrderItem[];
  customerInfo: CustomerInfo;
  error: string;
};
