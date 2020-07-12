import React from 'react';
import s from './ErrorMessage.module.css';

interface Props {
  title?: string;
  errorText?: string;
}

const defaultErrorMessage = 'Unknown error.';

export const ErrorMessageComponent: React.FC<Props> = ({errorText, title}) => {
  return (
    <div className={s.errorContainer}>
      {title && <h2 className={s.errorContainer__title}>{title}</h2>}
      <div className={s.errorContainer__text}>{errorText ?? defaultErrorMessage}</div>
      <div className={s.errorContainer__text}>Please try again later.</div>
    </div>
  );
};
