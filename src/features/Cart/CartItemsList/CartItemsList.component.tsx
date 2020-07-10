import React, {useMemo, useCallback} from 'react';
import {DraftOrder} from '../../../domain/order.domain';
import {APP_ROUTES} from '../../../router/Router.component';
import {CartItemContainer} from '../CartItem/CartItem.container';
import {Price} from '../../Price/Price';
import {LinkButton} from '../../../components/LinkButton/LinkButton';
import {Button, ButtonType} from '../../../components/Button/Button';
import s from './CartItemsList.module.css';

interface Props {
  order: DraftOrder;
  confirmOrder: (order: DraftOrder) => void;
  deliveryCostEUR: number;
}

const deliveryCostMessage = (isCartEmpty: boolean, deliveryCostValue: number) =>
  !isCartEmpty ? (
    <div className={s.cartItems__totalLabel}>
      Delivery cost <Price priceEUR={deliveryCostValue} /> is included to the total.
    </div>
  ) : null;

const emptyCartMessage = (isCartEmpty: boolean) =>
  isCartEmpty ? (
    <div className={s.cartItems__emptyMessage}>
      The cart is empty! Please return back to menu for adding a product
    </div>
  ) : null;

export const CartItemsListComponent: React.FC<Props> = ({order, confirmOrder, deliveryCostEUR}) => {
  const {items} = order;
  const isCartEmpty = items.length === 0;
  const deliveryCostValue = !isCartEmpty ? deliveryCostEUR : 0;

  const totalCost = useMemo(() => {
    return order.items.reduce(
      (prev, current) => prev + current.quantity * current.product.priceEUR,
      deliveryCostValue,
    );
  }, [deliveryCostValue, order.items]);

  const confirm = useCallback(() => {
    confirmOrder(order);
  }, [confirmOrder, order]);

  return (
    <div className={s.cartItems}>
      <ul className={s.cartItems__list}>
        {order.items.map((item) => (
          <CartItemContainer key={item.product.id} product={item.product} />
        ))}
      </ul>
      {emptyCartMessage(isCartEmpty)}
      <div className={s.cartItems__totalSection}>
        <div className={s.cartItems__totalValue}>
          Total: <Price priceEUR={totalCost} />
        </div>
        {deliveryCostMessage(isCartEmpty, deliveryCostValue)}
      </div>
      <div className={s.cartItems__actions}>
        <LinkButton href={APP_ROUTES.productsList} label='Back to menu' />
        <Button
          disabled={items.length === 0}
          type={ButtonType.COLORED_SOLID}
          onClick={confirm}
          label='Make an order'
        />
      </div>
    </div>
  );
};
