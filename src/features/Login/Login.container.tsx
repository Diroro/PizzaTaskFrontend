import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login} from '../../store/actions/loginActions';
import {useShallowSelector} from '../../utils/useShallowSelector';
import {ApplicationState} from '../../store/store';
import {APP_ROUTES} from '../../router/Router.component';
import {LoginComponent} from './Login.component';

export const LoginContainer: React.FC = () => {
  const dispatch = useDispatch();

  // add login error handling;

  const onLogin = useCallback(
    (email: string, password: string) => {
      dispatch(login(email, password));
    },
    [dispatch],
  );

  const user = useShallowSelector((state: ApplicationState) => state.user.user);

  if (user) {
    return <Redirect to={APP_ROUTES.productsList} />;
  }

  return <LoginComponent onLogin={onLogin} />;
};
