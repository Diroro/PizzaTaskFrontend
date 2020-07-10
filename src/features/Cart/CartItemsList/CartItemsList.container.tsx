import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {DraftOrder} from '../../../domain/order.domain';
import {confirmOrder} from '../../../store/actions/cartActions';
import {useShallowSelector} from '../../../utils/useShallowSelector';
import {ApplicationState} from '../../../store/store';
import {CartItemsListComponent} from './CartItemsList.component';

interface Props {
  order: DraftOrder;
}

export const CartItemsListContainer: React.FC<Props> = ({order}) => {
  const dispatch = useDispatch();
  const confirm = useCallback(
    (order: DraftOrder) => {
      dispatch(confirmOrder(order));
    },
    [dispatch],
  );

  const deliveryCostEUR = useShallowSelector((state: ApplicationState) => state.cart.deliveryCost);

  return (
    <CartItemsListComponent
      deliveryCostEUR={deliveryCostEUR}
      confirmOrder={confirm}
      order={order}
    />
  );
};
