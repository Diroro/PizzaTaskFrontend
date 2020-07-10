import React, {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {logout as logoutAction, getMyOrders} from '../../store/actions/loginActions';
import {useShallowSelector} from '../../utils/useShallowSelector';
import {ApplicationState} from '../../store/store';
import {APP_ROUTES} from '../../router/Router.component';
import {ProfilePageComponent} from './ProfilePage.component';

export const ProfilePageContainer: React.FC = () => {
  const dispatch = useDispatch();
  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const orders = useShallowSelector((state: ApplicationState) => state.user.myOrders);
  const user = useShallowSelector((state: ApplicationState) => state.user.user);
  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const deliveryCostEUR = useShallowSelector((state: ApplicationState) => state.cart.deliveryCost);

  if (!user) {
    return <Redirect to={APP_ROUTES.productsList} />;
  }

  return <ProfilePageComponent deliveryCostEUR={deliveryCostEUR} logout={logout} orders={orders} />;
};
