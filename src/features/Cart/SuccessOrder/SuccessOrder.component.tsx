import React, {useEffect, useState, memo} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {emptyDraftOrder} from '../../../store/reducers/cartReducer';
import {ActionTypes} from '../../../store/actions/actions';
import {APP_ROUTES} from '../../../router/Router.component';
import s from './SuccessOrder.module.css';

const REDIRECT_TIMEOUT = 3000;

export const SuccessOrderComponent: React.FC = memo(() => {
  const [needRedirect, setNeedRedirect] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setNeedRedirect(true);
      dispatch({
        type: ActionTypes.saveOrder,
        newOrder: emptyDraftOrder,
      });
    }, REDIRECT_TIMEOUT);

    return () => {
      dispatch({
        type: ActionTypes.saveOrder,
        newOrder: emptyDraftOrder,
      });
      window.clearTimeout(timeout);
    };
  }, [needRedirect, setNeedRedirect, dispatch]);

  return needRedirect ? (
    <Redirect to={APP_ROUTES.productsList} />
  ) : (
    <div className={s.successOrder}>
      <h2>Order is successfully created!</h2>
      You will be redirected to the menu in 3 sec...
    </div>
  );
});
