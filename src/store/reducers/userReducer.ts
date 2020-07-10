import {ApplicationAction, ActionTypes} from '../actions/actions';
import {User} from '../../domain/user.domain';
import {SuccessOrder} from '../../domain/order.domain';

export interface UserState {
  user?: User;
  myOrders: SuccessOrder[];
}

const defaultState: UserState = {
  user: undefined,
  myOrders: [],
};

export const userReducer = (state: UserState = defaultState, action: ApplicationAction) => {
  switch (action.type) {
    case ActionTypes.saveUser: {
      return {
        ...state,
        user: action.user,
      };
    }

    case ActionTypes.saveOrdersList: {
      return {
        ...state,
        myOrders: action.orders,
      };
    }

    default:
      return state;
  }
};
