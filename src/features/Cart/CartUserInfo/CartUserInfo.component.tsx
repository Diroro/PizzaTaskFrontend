import React, {useState, useCallback} from 'react';
import {isValidPhoneNumber} from 'react-phone-number-input';
import {LinkButton} from '../../../components/LinkButton/LinkButton';
import {APP_ROUTES} from '../../../router/Router.component';
import {ButtonType, Button} from '../../../components/Button/Button';
import {TextInput} from '../../../components/TextInput/TextInput.component';
import {
  ConfirmedOrder,
  PendingOrder,
  OrderStatus,
  CustomerInfo,
} from '../../../domain/order.domain';
import {validators, Validator, isOkForAllValidators} from '../../../utils/validators';
import {User} from '../../../domain/user.domain';
import {PhoneNumberInput} from '../../../components/PhoneNumberInput/PhoneNumberInput';
import s from './CartUserInfo.module.css';

const nameValidators: Validator[] = [validators.isNotEmpty, validators.isLessOrEqual100];
const emailValidators: Validator[] = [
  validators.isNotEmpty,
  validators.isEmail,
  validators.isLessOrEqual100,
];
const addressValidators: Validator[] = [validators.isNotEmpty, validators.isLessOrEqual255];

const isValidName = isOkForAllValidators(nameValidators);
const isValidAddress = isOkForAllValidators(addressValidators);
const isValidEmail = isOkForAllValidators(emailValidators);

interface Props {
  sendOrder: (order: PendingOrder) => void;
  backToDraft: (order: ConfirmedOrder) => void;
  order: ConfirmedOrder;
  defaultCustomerInfo: CustomerInfo;
  user?: User;
}

export const CartUserInfoComponent: React.FC<Props> = ({
  sendOrder,
  backToDraft,
  order,
  defaultCustomerInfo,
}) => {
  const customerInfo = order.customerInfo ?? defaultCustomerInfo;

  const [customerName, setCustomerName] = useState(customerInfo.customerName);
  const [email, setEmail] = useState(customerInfo.email);
  const [address, setAddress] = useState(customerInfo.address);
  const [phoneNumber, setPhoneNumber] = useState(customerInfo.phoneNumber);

  const isSendDisabled =
    !isValidName(customerName) ||
    !isValidAddress(address) ||
    !isValidPhoneNumber(phoneNumber) ||
    !isValidEmail(email);

  const send = useCallback(() => {
    const newOrder: PendingOrder = {
      items: order.items,
      customerInfo: {
        address,
        customerName,
        email,
        phoneNumber,
      },
      status: OrderStatus.pending,
    };
    sendOrder(newOrder);
  }, [address, email, customerName, order.items, phoneNumber, sendOrder]);

  const back = useCallback(() => {
    const newOrder: ConfirmedOrder = {
      items: order.items,
      customerInfo: {
        address,
        customerName,
        email,
        phoneNumber,
      },
      status: OrderStatus.confirmed,
    };

    backToDraft(newOrder);
  }, [address, backToDraft, email, customerName, order, phoneNumber]);

  return (
    <div className={s.userInfo}>
      <h2>Where to deliver?</h2>

      <form className={s.userInfo__form} name='customer'>
        <TextInput
          placeholder='Name'
          value={customerName}
          onChange={setCustomerName}
          validators={nameValidators}
        />
        <TextInput
          placeholder='Address'
          value={address}
          onChange={setAddress}
          validators={addressValidators}
        />
        <TextInput
          placeholder='Email'
          value={email}
          onChange={setEmail}
          validators={emailValidators}
        />
        <PhoneNumberInput
          placeholder='Phone number'
          value={phoneNumber}
          onChange={setPhoneNumber}
        />
      </form>

      <div className={s.userInfo__actions}>
        <LinkButton href={APP_ROUTES.productsList} label='Back to menu' />

        <Button type={ButtonType.BASE} onClick={back} label='Back' />
        <Button
          type={ButtonType.COLORED_SOLID}
          onClick={send}
          disabled={isSendDisabled}
          label='Confirm'
        />
      </div>
    </div>
  );
};
