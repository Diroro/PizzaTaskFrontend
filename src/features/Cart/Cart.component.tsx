import React, {memo, useEffect} from 'react';
import {Order, OrderStatus} from '../../domain/order.domain';
import {ErrorMessageContainer} from '../ErrorMessage/ErrorMessage.container';
import {SuccessOrderComponent} from './SuccessOrder/SuccessOrder.component';
import {CartStatusComponent} from './CartStatus/CartStatus.component';
import s from './Cart.module.css';
import {CartUserInfoContainer} from './CartUserInfo/CartUserInfo.container';
import {CartItemsListContainer} from './CartItemsList/CartItemsList.container';

interface Props {
  order?: Order;
  createEmptyDraftOrder: () => void;
  error?: string;
}
export const CartComponent: React.FC<Props> = memo(({order, createEmptyDraftOrder, error}) => {
  useEffect(() => {
    if (order === undefined) {
      createEmptyDraftOrder();
    }
  });

  if (order === undefined) {
    return null;
  }

  if (error) {
    return <ErrorMessageContainer title='Order error' errorText={error} />;
  }

  let content: React.ReactNode = null;

  switch (order.status) {
    case OrderStatus.draft: {
      content = <CartItemsListContainer order={order} />;
      break;
    }
    case OrderStatus.confirmed: {
      content = <CartUserInfoContainer order={order} />;
      break;
    }
    case OrderStatus.pending: {
      content = null; //<LoadingSpinner />
      break;
    }

    case OrderStatus.success: {
      content = <SuccessOrderComponent />;
      break;
    }
  }
  return (
    <section className={s.cart}>
      <h2 className={s.cart__title}>Cart</h2>
      <div className={s.cart__order}>
        {content}
        <CartStatusComponent status={order.status} />
      </div>
    </section>
  );
});
