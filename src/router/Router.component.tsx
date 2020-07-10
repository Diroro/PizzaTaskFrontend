import React, {memo} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {ProductsPageContainer} from '../features/ProductsPage/ProductsPage.container';
import {ProductInfoPageContainer} from '../features/ProductInfoPage/ProductInfoPage.container';
import {LoginContainer} from '../features/Login/Login.container';
import {ProfilePageContainer} from '../features/Profile/ProfilePage.container';
import {CartContainer} from '../features/Cart/Cart.container';
import {PrivateRouter} from './PrivateRoute';

export enum APP_ROUTES {
  productsList = '/products-list',
  cart = '/cart',
  productInfo = '/product-info/:productName',
  profile = '/profile',
  login = '/login',
}
export const RouterComponent: React.FC<{}> = memo(() => {
  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to={APP_ROUTES.productsList} />
      </Route>
      <Route path={APP_ROUTES.productsList} component={ProductsPageContainer} />
      <Route path={APP_ROUTES.productInfo} component={ProductInfoPageContainer} />
      <Route path={APP_ROUTES.cart} component={CartContainer} />
      <Route path={APP_ROUTES.login} component={LoginContainer} />
      <PrivateRouter
        path={APP_ROUTES.profile}
        render={() => <ProfilePageContainer />}
        elseRedirectTo={APP_ROUTES.login}
      />
    </Switch>
  );
});
