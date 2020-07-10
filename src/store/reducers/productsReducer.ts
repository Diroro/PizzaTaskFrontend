import {ApplicationAction, ActionTypes} from '../actions/actions';
import {Product} from '../../domain/product.domain';

export interface ProductsState {
  list: Product[];
  isLoading: boolean;
  error?: string;
}

const defaultState: ProductsState = {
  list: [],
  isLoading: false,
  error: undefined,
};

export const productsReducer = (state: ProductsState = defaultState, action: ApplicationAction) => {
  switch (action.type) {
    case ActionTypes.productsLoading: {
      return {
        ...state,
        isLoading: action.flag,
      };
    }

    case ActionTypes.productsSuccess: {
      return {
        ...state,
        isLoading: false,
        list: action.list,
      };
    }

    case ActionTypes.productsError: {
      return {
        ...state,
        isLoading: false,
        error: action.message,
      };
    }
    default:
      return state;
  }
};
