import React, {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getUser as getUserFromServer} from '../store/actions/loginActions';
import {getDeliveryCost as getDeliveryCostFromServer} from '../store/actions/cartActions';
import {RouterComponent} from './Router.component';

export const RouterContainer: React.FC = () => {
  const dispatch = useDispatch();
  const getUser = useCallback(() => {
    dispatch(getUserFromServer());
  }, [dispatch]);

  const getDeliveryCost = useCallback(() => {
    dispatch(getDeliveryCostFromServer());
  }, [dispatch]);

  useEffect(() => {
    getUser();
    getDeliveryCost();
  }, [getUser, getDeliveryCost]);

  return <RouterComponent />;
};
