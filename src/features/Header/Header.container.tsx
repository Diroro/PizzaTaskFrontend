import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {ApplicationState} from '../../store/store';
import {Currency} from '../../utils/currency';
import {ActionTypes} from '../../store/actions/actions';
import {useShallowSelector} from '../../utils/useShallowSelector';
import {HeaderComponent} from './Header.component';

const orderCountSelector = (state: ApplicationState) => {
  const items = state.cart.order?.items;
  return (
    items?.reduce((prev, curr) => {
      return (prev += curr.quantity);
    }, 0) ?? 0
  );
};

const currencySelector = (state: ApplicationState) => state.cart.currency;
const userSelector = (state: ApplicationState) => state.user.user;

export const HeaderContainer: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const cartItemsCount = useShallowSelector(orderCountSelector);
  const currency = useShallowSelector(currencySelector);
  const user = useShallowSelector(userSelector);

  const setCurrency = useCallback(
    (currency: Currency) =>
      dispatch({
        type: ActionTypes.setCurrency,
        currency,
      }),
    [dispatch],
  );

  return (
    <HeaderComponent
      setCurrency={setCurrency}
      cartItemsCount={cartItemsCount}
      currency={currency}
      user={user}
    />
  );
};
