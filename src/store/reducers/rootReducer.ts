import {combineReducers} from 'redux';
import {productsReducer} from './productsReducer';
import {cartReducer} from './cartReducer';
import {userReducer} from './userReducer';

export const reducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  user: userReducer,
});
