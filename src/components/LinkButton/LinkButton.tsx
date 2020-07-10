import React from 'react';
import {Link} from 'react-router-dom';
import {ButtonType} from '../Button/Button';
import s from './LinkButton.module.css';

interface Props {
  href: string;
  className?: string;
  label: string;
  type?: ButtonType;
}

const getButtonTypeClassName = (type: ButtonType) => {
  switch (type) {
    case ButtonType.COLORED: {
      return s.linkButton__colored;
    }
    case ButtonType.COLORED_SOLID: {
      return s.linkButton__coloredSolid;
    }
    case ButtonType.SOLID: {
      return s.linkButton__solid;
    }

    default:
      return '';
  }
};

export const LinkButton: React.FC<Props> = ({className, href, label, type}) => {
  const buttonTypeClassName = getButtonTypeClassName(type ?? ButtonType.BASE);

  const cn = `${s.linkButton} ${buttonTypeClassName} ${className ?? ''}`;
  return (
    <Link className={cn} to={href}>
      {label}
    </Link>
  );
};
