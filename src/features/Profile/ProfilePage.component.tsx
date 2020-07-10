import React from 'react';
import {APP_ROUTES} from '../../router/Router.component';
import {SuccessOrder} from '../../domain/order.domain';
import {ButtonType, Button} from '../../components/Button/Button';
import {LinkButton} from '../../components/LinkButton/LinkButton';
import s from './ProfilePage.module.css';
import {OrderItem} from './OrderItem/OrderItem.component';

interface Props {
  logout: () => void;
  orders: SuccessOrder[];
  deliveryCostEUR: number;
}
export const ProfilePageComponent: React.FC<Props> = ({logout, orders, deliveryCostEUR}) => {
  return (
    <section className={s.profilePage}>
      <h2>Order History</h2>
      <ul className={s.profilePage__orderList}>
        {orders.map((order) => (
          <OrderItem deliveryCostEUR={deliveryCostEUR} key={order.id} order={order} />
        ))}
      </ul>
      <div className={s.profilePage__actions}>
        <LinkButton href={APP_ROUTES.productsList} label='Back to menu' />
        <Button type={ButtonType.COLORED_SOLID} onClick={logout} label='Logout' />
      </div>
    </section>
  );
};
