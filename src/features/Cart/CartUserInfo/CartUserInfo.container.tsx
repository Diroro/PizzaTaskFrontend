import React from 'react';
import {useDispatch} from 'react-redux';
import {backOrderToDraft, sendOrder} from '../../../store/actions/cartActions';
import {ConfirmedOrder, PendingOrder, CustomerInfo} from '../../../domain/order.domain';
import {useShallowSelector} from '../../../utils/useShallowSelector';
import {ApplicationState} from '../../../store/store';
import {CartUserInfoComponent} from './CartUserInfo.component';

const defaultCustomerInfo: CustomerInfo = {
  customerName: '',
  address: '',
  email: '',
  phoneNumber: '',
};

interface Props {
  order: ConfirmedOrder;
}

export const CartUserInfoContainer: React.FC<Props> = ({order}) => {
  const user = useShallowSelector((state: ApplicationState) => state.user.user);

  const dispatch = useDispatch();

  const send = (order: PendingOrder) => dispatch(sendOrder(order));
  const back = (order: ConfirmedOrder) => dispatch(backOrderToDraft(order));

  const defaultUserInfo: CustomerInfo = user
    ? {
        customerName: user.firstName ?? '',
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
      }
    : defaultCustomerInfo;

  return (
    <CartUserInfoComponent
      order={order}
      backToDraft={back}
      sendOrder={send}
      defaultCustomerInfo={defaultUserInfo}
    />
  );
};
