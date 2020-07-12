import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {ActionTypes} from '../../store/actions/actions';
import {ErrorMessageComponent} from './ErrorMessage.component';

interface Props {
  title?: string;
  errorText?: string;
}

export const ErrorMessageContainer: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({
        type: ActionTypes.clearErrorOrder,
      });
    };
  });

  return <ErrorMessageComponent {...props} />;
};
