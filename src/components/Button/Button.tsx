import React from 'react';
import s from './Button.module.css';

export enum ButtonType {
  BASE = 'BASE',
  COLORED_SOLID = 'colored_solid',
  COLORED = 'colored',
  SOLID = 'solid',
}

interface Props {
  onClick: () => void;
  className?: string;
  label: string;
  type?: ButtonType;
  disabled?: boolean;
  icon?: React.ComponentType;
}

export const getButtonTypeClassName = (type: ButtonType) => {
  switch (type) {
    case ButtonType.COLORED: {
      return s.button__colored;
    }
    case ButtonType.COLORED_SOLID: {
      return s.button__coloredSolid;
    }
    case ButtonType.SOLID: {
      return s.button__solid;
    }

    default:
      return '';
  }
};

export const Button: React.FC<Props> = ({className, onClick, label, type, disabled}) => {
  const buttonTypeClassName = getButtonTypeClassName(type ?? ButtonType.BASE);

  const cn = `${s.button} ${buttonTypeClassName} ${disabled ? s.button__disabled : ''} ${
    className ?? ''
  }`;

  return (
    <button disabled={disabled} onClick={onClick} className={cn}>
      {label}
    </button>
  );
};
