import {Dispatch, Action} from 'redux';
import {ApplicationState} from '../store';
import {ProductsErrorAction, ProductsLoadingAction, ProductsSuccessAction} from './productsActions';
import {
  SaveOrderAction,
  SetCurrencyAction,
  ClearOrderAction,
  SaveDeliveryCostAction,
  ErrorOrderAction,
  ClearOrderErrorAction,
} from './cartActions';
import {SaveUserAction, SaveOrdersListAction} from './loginActions';

export type ApplicationAction = Action<ActionTypes> &
  (
    | ProductsLoadingAction
    | ProductsSuccessAction
    | ProductsErrorAction
    | SaveOrderAction
    | ErrorOrderAction
    | ClearOrderErrorAction
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
  errorOrder = 'OrderError',
  clearErrorOrder = 'clearErrorOrder',
  saveUser = 'SaveUser',
  saveOrdersList = 'SaveOrdersList',
}

export type ApplicationThunk = (
  dispatch: Dispatch<ApplicationAction>,
  getState: () => ApplicationState,
) => void;
