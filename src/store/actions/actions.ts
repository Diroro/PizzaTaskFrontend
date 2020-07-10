import {Dispatch, Action} from 'redux';
import {ApplicationState} from '../store';
import {ProductsErrorAction, ProductsLoadingAction, ProductsSuccessAction} from './productsActions';
import {
  SaveOrderAction,
  SetCurrencyAction,
  ClearOrderAction,
  SaveDeliveryCostAction,
} from './cartActions';
import {SaveUserAction, SaveOrdersListAction} from './loginActions';

export type ApplicationAction = Action<ActionTypes> &
  (
    | ProductsLoadingAction
    | ProductsSuccessAction
    | ProductsErrorAction
    | SaveOrderAction
    | SaveDeliveryCostAction
    | ClearOrderAction
    | SetCurrencyAction
    | SaveUserAction
    | SaveOrdersListAction
  );

export type ApplicationThunkAction = ApplicationAction | ApplicationThunk;

export enum ActionTypes {
  productsLoading = 'ProductsLoading',
  productsSuccess = 'ProductsSuccess',
  productsError = 'ProductsError',
  saveOrder = 'SaveOrder',
  saveDeliveryCost = 'SaveDeliveryCost',
  clearOrder = 'ClearOrder',
  setCurrency = 'setCurrency',
  addCustomerInfo = 'AddCustomerInfo',
  orderSuccess = 'OrderSuccess',
  orderError = 'OrderError',
  saveUser = 'SaveUser',
  saveOrdersList = 'SaveOrdersList',
}

export type ApplicationThunk = (
  dispatch: Dispatch<ApplicationAction>,
  getState: () => ApplicationState,
) => void;
