import React, {useCallback} from 'react';
import {Product} from '../../../domain/product.domain';
import {NumericStepper} from '../../../components/NumericStepper/NumericStepper.component';
import {Button} from '../../../components/Button/Button';
import {Price} from '../../Price/Price';
import s from './CartItem.module.css';

interface Props {
  product: Product;
  quantity: number;
  removeFromCart: (productId: number) => void;
  setProductQuantity: (productId: number, newQuantity: number) => void;
}

export const CartItemComponent: React.FC<Props> = ({
  product,
  quantity,
  setProductQuantity,
  removeFromCart,
}) => {
  const {priceEUR, id} = product;

  const totalProductPrice = priceEUR * quantity;
  const setQuantity = useCallback(
    (value: number) => {
      setProductQuantity(id, value);
    },
    [id, setProductQuantity],
  );

  const remove = useCallback(() => {
    removeFromCart(id);
  }, [id, removeFromCart]);

  return (
    <li className={s.cartItem}>
      <div className={s.cartItem__leftSection}>
        <div className={s.cartItem__image}>
          <img alt={product.name} src={product.image} />
        </div>
        <div className={s.cartItem__name}>{product.name}</div>
      </div>
      <div className={s.cartItem__rightSection}>
        <div className={s.cartItem__price}>
          <Price priceEUR={totalProductPrice} />
        </div>
        <div className={s.cartItem__actions}>
          <NumericStepper value={quantity} onChange={setQuantity} />
          <Button onClick={remove} label='Remove' />
        </div>
      </div>
    </li>
  );
};
