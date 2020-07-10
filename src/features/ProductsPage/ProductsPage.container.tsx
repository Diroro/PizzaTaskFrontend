import React, {useEffect, memo} from 'react';
import {useDispatch} from 'react-redux';
import {fetchProducts} from '../../store/actions/productsActions';
import {ApplicationState} from '../../store/store';
import {useShallowSelector} from '../../utils/useShallowSelector';
import {ProductsPageComponent} from './ProductsPage.component';

const productsSelector = (state: ApplicationState) => state.products.list;

export const ProductsPageContainer: React.FC<{}> = memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const products = useShallowSelector(productsSelector);

  return <ProductsPageComponent products={products} />;
});
