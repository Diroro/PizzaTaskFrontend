import {Action} from 'redux';
import {
  Order,
  OrderItem,
  OrderStatus,
  PendingOrder,
  DraftOrder,
  ConfirmedOrder,
} from '../../domain/order.domain';
import {emptyDraftOrder} from '../reducers/cartReducer';
import {Currency} from '../../utils/currency';
import {orderApi} from '../../api/orderApi';
import {Product} from '../../domain/product.domain';
import {ActionTypes, ApplicationThunk} from './actions';

export interface SaveOrderAction extends Action<ActionTypes.saveOrder> {
  type: ActionTypes.saveOrder;
  newOrder: Order;
}

export interface SetCurrencyAction extends Action<ActionTypes.setCurrency> {
  currency: Currency;
}

export interface ClearOrderAction extends Action<ActionTypes.clearOrder> {}

export interface SaveDeliveryCostAction extends Action<ActionTypes.saveDeliveryCost> {
  cost: number;
}

export const addToCart = (product: Product, quantity: number): ApplicationThunk => (
  dispatch,
  getState,
) => {
  const {cart} = getState();
  const {order = emptyDraftOrder} = cart;
  const {items} = order;

  const item = items.find((order) => order.product.id === product.id);
  if (item === undefined) {
    const newItem: OrderItem = {
      product,
      quantity,
    };
    const newItems = [...items, newItem];

    const newOrder = {
      ...order,
      items: newItems,
    };

    dispatch({
      type: ActionTypes.saveOrder,
      newOrder,
    });
  } else {
    const newItems = items.map((orderItem) => {
      if (orderItem.product.id === product.id) {
        return {
          ...item,
          quantity: item.quantity + quantity,
        };
      } else {
        return orderItem;
      }
    });

    const newOrder = {
      ...order,
      items: newItems,
    };

    dispatch({
      type: ActionTypes.saveOrder,
      newOrder,
    });
  }
};

export const removeFromCart = (productId: number): ApplicationThunk => (dispatch, getState) => {
  const {cart} = getState();
  const {order = emptyDraftOrder} = cart;
  const {items} = order;

  const newItems = items.filter((item) => item.product.id !== productId);
  const newOrder = {
    ...order,
    items: newItems,
  };

  dispatch({
    type: ActionTypes.saveOrder,
    newOrder,
  });
};

export const setProductQuantityInCart = (
  productId: number,
  newQuantity: number,
): ApplicationThunk => (dispatch, getState) => {
  const {cart} = getState();
  const {order = emptyDraftOrder} = cart;
  const {items} = order;

  const item = items.find((orderItem) => orderItem.product.id === productId);

  if (item === undefined) {
    return;
  }

  const newItems = items.map((orderItem) => {
    if (orderItem.product.id === productId) {
      return {
        ...orderItem,
        quantity: newQuantity,
      };
    } else {
      return orderItem;
    }
  });

  const newOrder = {
    ...order,
    items: newItems,
  };

  dispatch({
    type: ActionTypes.saveOrder,
    newOrder,
  });
};

export const confirmOrder = (order: DraftOrder): ApplicationThunk => (dispatch) => {
  if (order.items.length === 0) {
    return;
  }

  const newOrder = {
    items: order.items,
    customerInfo: order.customerInfo,
    status: OrderStatus.confirmed as const,
  };

  dispatch({
    type: ActionTypes.saveOrder,
    newOrder,
  });
};

export const backOrderToDraft = (order: ConfirmedOrder): ApplicationThunk => (dispatch) => {
  const newOrder = {
    items: order.items,
    customerInfo: order.customerInfo,
    status: OrderStatus.draft as const,
  };

  dispatch({
    type: ActionTypes.saveOrder,
    newOrder,
  });
};

export const sendOrder = (order: PendingOrder): ApplicationThunk => async (dispatch, getState) => {
  return orderApi.createOrder(order).then((newOrder) => {
    dispatch({
      type: ActionTypes.saveOrder,
      newOrder,
    });
  });
};

export const getDeliveryCost = (): ApplicationThunk => async (dispatch) => {
  return orderApi.getDeliveryCost().then((cost) => {
    dispatch({
      type: ActionTypes.saveDeliveryCost,
      cost,
    });
  });
};
