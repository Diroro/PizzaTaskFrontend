import React from 'react';
import {Product} from '../../domain/product.domain';
import {ProductItemContainer} from './ProductItem/ProductItem.container';
import s from './ProductsPage.module.css';

interface Props {
  products: Product[];
}
export const ProductsPageComponent: React.FC<Props> = (props) => {
  return (
    <section className={s.productsSection}>
      <h2 className={s.productsTitle}>Please chose any pizza you would like to eat</h2>
      <ul className={s.productsList}>
        {props.products.map((product) => (
          <ProductItemContainer key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
};
