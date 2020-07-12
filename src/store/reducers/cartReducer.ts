import {ApplicationAction, ActionTypes} from '../actions/actions';
import {Order, OrderStatus, DraftOrder} from '../../domain/order.domain';
import {Currency} from '../../utils/currency';

export interface CartState {
  order?: Order;
  loading: boolean;
  currency: Currency;
  deliveryCost: number;
  error?: string;
}

export const emptyDraftOrder: DraftOrder = {
  status: OrderStatus.draft,
  items: [],
};

const defaultState: CartState = {
  order: emptyDraftOrder,
  loading: false,
  currency: Currency.EUR,
  deliveryCost: 0,
};

export const cartReducer = (state: CartState = defaultState, action: ApplicationAction) => {
  switch (action.type) {
    case ActionTypes.saveOrder: {
      return {
        ...state,
        order: action.newOrder,
      };
    }

    case ActionTypes.clearOrder: {
      return {
        ...state,
        order: undefined,
      };
    }

    case ActionTypes.setCurrency: {
      return {
        ...state,
        currency: action.currency,
      };
    }

    case ActionTypes.saveDeliveryCost: {
      return {
        ...state,
        deliveryCost: action.cost,
      };
    }

    case ActionTypes.errorOrder: {
      return {
        ...state,
        error: action.error,
      };
    }

    case ActionTypes.clearErrorOrder: {
      return {
        ...state,
        error: undefined,
      };
    }

    default:
      return state;
  }
};
