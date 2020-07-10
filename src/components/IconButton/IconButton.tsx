import React from 'react';
import {ButtonType} from '../Button/Button';
import s from './IconButton.module.css';

interface Props {
  onClick: () => void;
  className?: string;
  type?: ButtonType;
  disabled?: boolean;
  Icon: React.ComponentType;
}

const getButtonTypeClassName = (type: ButtonType) => {
  switch (type) {
    case ButtonType.COLORED: {
      return s.iconButton__colored;
    }
    case ButtonType.COLORED_SOLID: {
      return s.iconButton__coloredSolid;
    }
    case ButtonType.SOLID: {
      return s.iconButton__solid;
    }

    default:
      return '';
  }
};

export const IconButton: React.FC<Props> = ({className, onClick, Icon, type, disabled}) => {
  const buttonTypeClassName = getButtonTypeClassName(type ?? ButtonType.BASE);

  const cn = `${s.iconButton} ${buttonTypeClassName} ${disabled ? s.iconButton__disabled : ''} ${
    className ?? ''
  }`;

  return (
    <button disabled={disabled} onClick={onClick} className={cn}>
      <Icon />
    </button>
  );
};
