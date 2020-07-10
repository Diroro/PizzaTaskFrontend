import {Action} from 'redux';
import {Product} from '../../domain/product.domain';
import {productsApi} from '../../api/productsApi';
import {ApplicationThunk, ActionTypes} from './actions';

export const fetchProducts = (): ApplicationThunk => (dispatch) => {
  dispatch({
    type: ActionTypes.productsLoading,
    flag: true,
  });

  return productsApi
    .getProducts()
    .then((products) => {
      dispatch({
        type: ActionTypes.productsSuccess,
        list: products,
      });
    })
    .catch((e: Error) => {
      dispatch({
        type: ActionTypes.productsError,
        message: e.message,
      });
    });
};

export interface ProductsLoadingAction extends Action<ActionTypes.productsLoading> {
  flag: boolean;
}

export interface ProductsSuccessAction extends Action<ActionTypes.productsSuccess> {
  list: Product[];
}

export interface ProductsErrorAction extends Action<ActionTypes.productsError> {
  message: string;
}
