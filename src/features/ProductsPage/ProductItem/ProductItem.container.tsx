import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../../store/actions/cartActions';
import {Product} from '../../../domain/product.domain';
import {ProductItemComponent} from './ProductItem.component';

interface Props {
  product: Product;
}

export const ProductItemContainer: React.FC<Props> = ({product}) => {
  const dispatch = useDispatch();

  const addProductToCart = useCallback(
    (product: Product, quantity: number) => {
      if (quantity === 0) {
        return;
      }

      dispatch(addToCart(product, quantity));
    },
    [dispatch],
  );

  return <ProductItemComponent product={product} addToCart={addProductToCart} />;
};
