import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {Product} from '../../../domain/product.domain';
import {setProductQuantityInCart, removeFromCart} from '../../../store/actions/cartActions';
import {ApplicationState} from '../../../store/store';
import {useShallowSelector} from '../../../utils/useShallowSelector';
import {CartItemComponent} from './CartItem.component';

interface Props {
  product: Product;
}

const productQuantitySelector = (product: Product) => (state: ApplicationState) => {
  const orderItem = state.cart.order?.items.find((item) => item.product.id === product.id);
  return orderItem?.quantity ?? 0;
};

export const CartItemContainer: React.FC<Props> = ({product}) => {
  const dispatch = useDispatch();
  const remove = useCallback(
    (id: number) => {
      dispatch(removeFromCart(id));
    },
    [dispatch],
  );

  const setQuantity = useCallback(
    (id: number, value: number) => dispatch(setProductQuantityInCart(id, value)),
    [dispatch],
  );

  const quantity = useShallowSelector(productQuantitySelector(product));
  return (
    <CartItemComponent
      removeFromCart={remove}
      setProductQuantity={setQuantity}
      product={product}
      quantity={quantity}
    />
  );
};
