import React from 'react';
import {useDispatch} from 'react-redux';
import {ApplicationState} from '../../store/store';
import {useShallowSelector} from '../../utils/useShallowSelector';
import {ActionTypes} from '../../store/actions/actions';
import {emptyDraftOrder} from '../../store/reducers/cartReducer';
import {CartComponent} from './Cart.component';

const orderSelector = (state: ApplicationState) => state.cart.order;

export const CartContainer: React.FC<{}> = () => {
  const order = useShallowSelector(orderSelector);
  const dispatch = useDispatch();

  const createEmptyDraftOrder = () =>
    dispatch({
      type: ActionTypes.saveOrder,
      newOrder: emptyDraftOrder,
    });
  const error = useShallowSelector((state: ApplicationState) => state.cart.error);
  return (
    <CartComponent order={order} createEmptyDraftOrder={createEmptyDraftOrder} error={error} />
  );
};
