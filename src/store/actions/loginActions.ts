import {Action} from 'redux';
import {loginApi} from '../../api/loginApi';
import {User} from '../../domain/user.domain';
import {orderApi} from '../../api/orderApi';
import {SuccessOrder} from '../../domain/order.domain';
import {localStorageUtils} from '../../utils/localStorage';
import {ActionTypes, ApplicationThunk} from './actions';

export interface SaveUserAction extends Action<ActionTypes.saveUser> {
  user?: User;
}

export interface SaveOrdersListAction extends Action<ActionTypes.saveOrdersList> {
  orders: SuccessOrder[];
}

export const login = (email: string, password: string): ApplicationThunk => async (dispatch) => {
  const loginResponse = await loginApi.signIn(email, password);
  localStorageUtils.setAccessToken(loginResponse.accessToken);

  dispatch({
    type: ActionTypes.saveUser,
    user: loginResponse.user,
  });
};

export const getUser = (): ApplicationThunk => async (dispatch, getState) => {
  const {user} = getState().user;
  if (user) {
    return;
  }
  const newUser = await loginApi.getMyUser();

  dispatch({
    type: ActionTypes.saveUser,
    user: newUser,
  });
};

export const logout = (): ApplicationThunk => async (dispatch, getState) => {
  const {user} = getState().user;
  localStorageUtils.removeAccessToken();

  if (user) {
    dispatch({
      type: ActionTypes.saveUser,
      user: undefined,
    });
  }
};

export const getMyOrders = (): ApplicationThunk => async (dispatch) => {
  const myOrders = await orderApi.getMyOrders();

  dispatch({
    type: ActionTypes.saveOrdersList,
    orders: myOrders,
  });
};
