import React, {useState, useCallback} from 'react';
import {Product} from '../../../domain/product.domain';
import {Button, ButtonType} from '../../../components/Button/Button';
import {NumericStepper} from '../../../components/NumericStepper/NumericStepper.component';
import {Price} from '../../Price/Price';
import s from './ProductItem.module.css';

interface Props {
  product: Product;
  addToCart: (product: Product, quantity: number) => void;
}

export const ProductItemComponent: React.FC<Props> = ({addToCart, product}) => {
  const [quantity, setQuantity] = useState(1);
  const [isQuantityOpened, setQuantityOpened] = useState(false);

  const addProductToCart = useCallback(() => {
    if (quantity === 0) {
      return;
    }
    addToCart(product, quantity);
    setQuantity(1);
    setQuantityOpened(false);
  }, [addToCart, product, quantity]);

  const openQuantityInput = useCallback(() => {
    setQuantityOpened(true);
  }, []);

  return (
    <li className={s.productItem}>
      <div className={s.productItem__top}>
        <div className={s.productItem__image}>
          <img alt={product.name} src={product.image} />
        </div>
        <div className={s.productItem__name}>{product.name}</div>
        <div className={s.productItem__description}>{product.description}</div>
      </div>

      <div className={s.productItem__bottom}>
        <div className={s.productItem__price}>
          <Price priceEUR={product.priceEUR} />
        </div>
        <div className={s.productItem__actions}>
          {isQuantityOpened ? (
            <NumericStepper value={quantity} onChange={setQuantity} />
          ) : (
            <Button onClick={openQuantityInput} type={ButtonType.COLORED} label='Set Quantity' />
          )}

          <Button onClick={addProductToCart} type={ButtonType.COLORED_SOLID} label='Select' />
        </div>
      </div>
    </li>
  );
};
