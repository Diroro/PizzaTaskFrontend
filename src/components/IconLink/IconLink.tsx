import React from 'react';
import {Link} from 'react-router-dom';
import {ButtonType} from '../Button/Button';
import s from './IconLink.module.css';

interface Props {
  href: string;
  className?: string;
  type?: ButtonType;
  disabled?: boolean;
  Icon: React.ComponentType;
}

const getButtonTypeClassName = (type: ButtonType) => {
  switch (type) {
    case ButtonType.COLORED: {
      return s.iconLink__colored;
    }
    case ButtonType.COLORED_SOLID: {
      return s.iconLink__coloredSolid;
    }
    case ButtonType.SOLID: {
      return s.iconLink__solid;
    }

    default:
      return '';
  }
};

export const IconLink: React.FC<Props> = ({className, href, Icon, type, disabled}) => {
  const buttonTypeClassName = getButtonTypeClassName(type ?? ButtonType.BASE);

  const cn = `${s.iconLink} ${buttonTypeClassName} ${disabled ? s.iconLink__disabled : ''} ${
    className ?? ''
  }`;

  return (
    <Link className={cn} to={href}>
      <Icon />
    </Link>
  );
};
