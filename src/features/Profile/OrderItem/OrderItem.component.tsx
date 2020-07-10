import React, {useState, useCallback} from 'react';
import {SuccessOrder} from '../../../domain/order.domain';
import {ArrowIcon} from '../../../components/icons/ToggleDownIcon';
import {Price} from '../../Price/Price';
import s from './OrderItem.module.css';

interface Props {
  order: SuccessOrder;
  deliveryCostEUR: number;
}

export const OrderItem: React.FC<Props> = ({order, deliveryCostEUR}) => {
  const [areProductsShown, setProductsShown] = useState(false);

  const toggleProducts = useCallback(() => {
    setProductsShown(!areProductsShown);
  }, [areProductsShown]);

  const formattedDate = order.orderDate.toDateString();
  return (
    <li className={s.orderItem}>
      <div className={s.orderItem__description}>
        <div className={s.orderItem__id}>
          <span className={s.orderItem_idLabel}>Order</span> ID: {order.id}
        </div>
        <div className={s.orderItem__price}>
          <span className={s.orderItem__priceLabel}>Total price: </span>
          <Price priceEUR={order.totalPriceEUR} />
        </div>
        <div className={s.orderItem__date}>{formattedDate}</div>
        <div className={s.orderItem__toggle}>
          <button onClick={toggleProducts} className={s.orderItem__arrow}>
            <ArrowIcon className={s.orderItem__arrowIcon} isUp={areProductsShown} />
          </button>
        </div>
      </div>

      {areProductsShown && (
        <ul className={s.orderItem__productList}>
          {order.items.map((orderItem) => {
            const {product, quantity} = orderItem;
            return (
              <li key={product.id} className={s.orderItem__product}>
                <div className={s.orderItem__productImage}>
                  <img alt={product.name} src={product.image} />
                </div>
                <div className={s.orderItem__productName}>{product.name}</div>
                <div className={s.orderItem__productPrice}>
                  <Price priceEUR={product.priceEUR} />
                </div>
                <div className={s.orderItem__productQuantity}>
                  <span className={s.orderItem__productQuantityLabel}>Quantity:&nbsp;</span>
                  {quantity}
                </div>
              </li>
            );
          })}
          <li className={s.orderItem__deliveryInformation}>
            Delivery cost <Price priceEUR={deliveryCostEUR} /> is included in the total price.
          </li>
        </ul>
      )}
    </li>
  );
};
