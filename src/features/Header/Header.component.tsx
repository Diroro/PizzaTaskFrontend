import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import {APP_ROUTES} from '../../router/Router.component';
import {LinkButton} from '../../components/LinkButton/LinkButton';
import {Toggle} from '../../components/Toggle/Toggle';
import {Currency, CurrencySymbol} from '../../utils/currency';
import {ButtonType} from '../../components/Button/Button';
import {User} from '../../domain/user.domain';
import {CartIcon} from '../../components/icons/CartIcon';
import {IconLink} from '../../components/IconLink/IconLink';
import {LoginIcon} from '../../components/icons/LoginIcon';
import {ProfileIcon} from '../../components/icons/ProfileIcon';
import s from './Header.module.css';

interface Props {
  cartItemsCount: number;
  setCurrency: (currency: Currency) => void;
  currency: Currency;
  user?: User;
}
export const HeaderComponent: React.FC<Props> = ({cartItemsCount, currency, setCurrency, user}) => {
  const cartLabel = `Cart${cartItemsCount ? ` | ${cartItemsCount}` : ''}`;

  const selectCurrency = useCallback(
    (currencyValue: string) => {
      if (currencyValue === Currency.EUR) {
        setCurrency(Currency.EUR);
      } else {
        setCurrency(Currency.USD);
      }
    },
    [setCurrency],
  );

  const mapCurrencyToSymbol = useCallback((currency: string) => CurrencySymbol[currency], []);

  return (
    <header className={s.header}>
      <div className={s.headerContainer}>
        <div className={s.leftSection}>
          <Link to={APP_ROUTES.productsList}>
            <h1 className={s.titleText}>Pizza task!</h1>
          </Link>
          <span className={s.titleDescription}>
            This is my online pizza shop made for testing purposes
          </span>
        </div>

        <div className={s.rightSection}>
          <Toggle
            leftValue={Currency.EUR}
            rightValue={Currency.USD}
            mapValue={mapCurrencyToSymbol}
            selectedValue={currency}
            onToggle={selectCurrency}
            id='currency'
          />
          <div className={s.loginSection}>
            {user ? (
              <>
                <LinkButton
                  type={ButtonType.COLORED_SOLID}
                  href={APP_ROUTES.profile}
                  label='Profile'
                  className={s.profile}
                />
                <IconLink
                  Icon={ProfileIcon}
                  className={s.profileIcon}
                  type={ButtonType.COLORED_SOLID}
                  href={APP_ROUTES.profile}
                />
              </>
            ) : (
              <>
                <LinkButton
                  className={s.login}
                  type={ButtonType.COLORED_SOLID}
                  href={APP_ROUTES.login}
                  label='Login'
                />
                <IconLink
                  Icon={LoginIcon}
                  className={s.loginIcon}
                  type={ButtonType.COLORED_SOLID}
                  href={APP_ROUTES.login}
                />
              </>
            )}
          </div>
          <LinkButton
            className={s.cart}
            type={ButtonType.COLORED_SOLID}
            href={APP_ROUTES.cart}
            label={cartLabel}
          />
          <IconLink
            Icon={CartIcon}
            className={s.cartIcon}
            type={ButtonType.COLORED_SOLID}
            href={APP_ROUTES.cart}
          />
        </div>
      </div>
    </header>
  );
};
