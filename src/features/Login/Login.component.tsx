import React, {useState, useCallback} from 'react';
import {validators, isOkForAllValidators, Validator} from '../../utils/validators';
import {ButtonType, Button} from '../../components/Button/Button';
import {APP_ROUTES} from '../../router/Router.component';
import {TextInput, TextInputType} from '../../components/TextInput/TextInput.component';
import {LinkButton} from '../../components/LinkButton/LinkButton';
import s from './Login.module.css';

const emailValidators: Validator[] = [
  validators.isNotEmpty,
  validators.isEmail,
  validators.isLessOrEqual100,
];
const passwordValidators: Validator[] = [validators.isNotEmpty, validators.isLessOrEqual100];

const isValidEmail = isOkForAllValidators(emailValidators);
const isValidPassword = isOkForAllValidators(passwordValidators);

interface Props {
  onLogin: (email: string, password: string) => void;
}

export const LoginComponent: React.FC<Props> = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isButtonDisabled = !isValidEmail(email) || !isValidPassword(password);

  const login = useCallback(() => {
    onLogin(email, password);
  }, [onLogin, email, password]);

  return (
    <section className={s.login}>
      <h2>Please enter your email and password</h2>
      <form className={s.login__form} name='login'>
        <TextInput
          placeholder='Email'
          value={email}
          onChange={setEmail}
          validators={emailValidators}
        />
        <TextInput
          type={TextInputType.password}
          placeholder='Password'
          value={password}
          onChange={setPassword}
          validators={passwordValidators}
        />
      </form>

      <div className={s.login__actions}>
        <LinkButton href={APP_ROUTES.productsList} label='Back to menu' />

        <Button
          type={ButtonType.COLORED_SOLID}
          onClick={login}
          disabled={isButtonDisabled}
          label='Login'
        />
        {/* MAKE AN ORDER BUTTON SHOULD BE DISABLED OR DISAPPEAR WHEN NO PRODUCTS ARE SELECTED OR NO QUANTITY OF ALL PRODUCTS */}
      </div>
    </section>
  );
  // GO TO MENU BUTTON
};
