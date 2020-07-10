import React from 'react';
import {OrderStatus} from '../../../domain/order.domain';
import s from './CartStatus.module.css';

export interface Props {
  status: OrderStatus;
}

interface OrderStatusItem {
  className: string;
  count: number;
  label: string;
  forStatus: OrderStatus;
}

const statuses: OrderStatusItem[] = [
  {
    className: s.statusSection__draft,
    count: 1,
    label: 'Cart',
    forStatus: OrderStatus.draft,
  },
  {
    className: s.statusSection__confirmed,
    count: 2,
    forStatus: OrderStatus.confirmed,
    label: 'Checkout',
  },
  {
    className: s.statusSection__success,
    count: 3,
    label: 'Success',
    forStatus: OrderStatus.success,
  },
];

export const CartStatusComponent: React.FC<Props> = ({status}) => {
  return (
    <section className={s.statusSection}>
      {statuses.map((item) => {
        const cn = `${item.className} ${status === item.forStatus ? s.statusSection__active : ''}`;

        return (
          <div key={item.forStatus} className={cn}>
            <div className={s.statusSection__count}>{item.count}</div>
            <div className={s.statusSection__label}>{item.label}</div>
          </div>
        );
      })}
    </section>
  );
};
