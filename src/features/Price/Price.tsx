import React from 'react';
import {ApplicationState} from '../../store/store';
import {eurUsdValue, Currency} from '../../utils/currency';
import {useShallowSelector} from '../../utils/useShallowSelector';

export const getPriceByCurrenccy = (priceEUR: number, currency: Currency): string => {
  const price = currency === Currency.EUR ? priceEUR : eurUsdValue * priceEUR;
  const label = currency;

  return `${price.toFixed(2)} ${label}`;
};

interface Props {
  priceEUR: number;
}

const currencySelector = (state: ApplicationState) => state.cart.currency;

export const Price: React.FC<Props> = ({priceEUR}) => {
  const currency = useShallowSelector(currencySelector);
  const price = currency === Currency.EUR ? priceEUR : eurUsdValue * priceEUR;
  const label = currency;

  return (
    <>
      {price.toFixed(2)} {label}
    </>
  );
};
