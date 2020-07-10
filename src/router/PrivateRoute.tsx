import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {localStorageUtils} from '../utils/localStorage';
import {APP_ROUTES} from './Router.component';

const hasToken = (): boolean => {
  const accessToken = localStorageUtils.getAccessToken();
  return accessToken !== null;
};

interface Props {
  path: APP_ROUTES;
  exact?: boolean;
  render: () => React.ReactElement;
  elseRedirectTo: APP_ROUTES;
}

export const PrivateRouter: React.FC<Props> = ({path, exact, render, elseRedirectTo}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        if (hasToken()) {
          return render();
        } else {
          return <Redirect exact to={elseRedirectTo} />;
        }
      }}
    />
  );
};
