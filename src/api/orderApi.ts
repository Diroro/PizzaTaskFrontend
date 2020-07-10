import {
  OrderItem,
  SuccessOrder,
  OrderStatus,
  ErrorOrder,
  PendingOrder,
} from '../domain/order.domain';
import {User} from '../domain/user.domain';
import {apiClient} from './api';

export const ORDER_URLS = {
  createOrder: '/orders/create',
  my: '/orders/my',
  deliveryCost: '/orders/delivery-cost',
};

interface OrderResponse {
  items: OrderItem[];
  totalPriceEUR: number;
  user?: User;
  email: string;
  address: string;
  customerName: string;
  phoneNumber: string;
  orderDate: string;
  id: number;
}

const mapOrderResponse = (res: OrderResponse): SuccessOrder => {
  return {
    status: OrderStatus.success as const,
    items: res.items,
    customerInfo: {
      customerName: res.customerName,
      email: res.email,
      address: res.address,
      phoneNumber: res.phoneNumber,
    },
    id: res.id,
    totalPriceEUR: res.totalPriceEUR,
    orderDate: new Date(res.orderDate),
  };
};

const createOrder = async (order: PendingOrder): Promise<SuccessOrder | ErrorOrder> => {
  const {items, customerInfo} = order;
  const {email, address, phoneNumber, customerName} = customerInfo;

  const body = {email, address, phoneNumber, items, customerName};

  return apiClient
    .post<OrderResponse>({url: ORDER_URLS.createOrder, body})
    .then(mapOrderResponse)
    .catch((e) => {
      return {
        status: OrderStatus.error as const,
        items,
        customerInfo,
        error: `Order was not send. Error: ${e.message}`,
      };
    });
};

const getMyOrders = async (): Promise<SuccessOrder[]> => {
  const orders = await apiClient.get<OrderResponse[]>({url: ORDER_URLS.my});
  return orders.map(mapOrderResponse);
};

const getDeliveryCost = async (): Promise<number> => {
  return apiClient.get<number>({url: ORDER_URLS.deliveryCost});
};

export const orderApi = {
  createOrder,
  getMyOrders,
  getDeliveryCost,
};
