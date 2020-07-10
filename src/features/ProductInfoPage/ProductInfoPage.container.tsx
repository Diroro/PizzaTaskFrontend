import React from 'react';
import {useParams} from 'react-router-dom';
import {useShallowSelector} from '../../utils/useShallowSelector';
import {ApplicationState} from '../../store/store';
import {ProductInfoPageComponent} from './ProductInfoPage.component';

export const ProductInfoPageContainer: React.FC<{}> = () => {
  const {productName} = useParams();
  const product = useShallowSelector((state: ApplicationState) =>
    state.products.list.find((item) => item.name === productName),
  );

  if (!product) {
    return null;
  }
  return <ProductInfoPageComponent />;
};
