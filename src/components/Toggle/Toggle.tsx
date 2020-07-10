import React, {useState} from 'react';
import s from './Toggle.module.css';

interface Props {
  id: string;
  leftValue: string;
  rightValue: string;
  selectedValue: string;
  mapValue?: (value: string) => string;
  onToggle: (value: string) => void;
}

export function Toggle<T>(props: Props) {
  const [value, setValue] = useState(props.selectedValue);
  const handleToggle = (val: string) => () => {
    setValue(val);
    props.onToggle(val);
  };

  const isLeftSelected = value === props.leftValue;
  const isRightSelected = value === props.rightValue;

  const leftCN = `${s.toggle__value} ${s.toggle__valueLeft} ${
    isLeftSelected ? s.toggle__valueActive : ''
  }`;
  const rightCN = `${s.toggle__value} ${s.toggle__valueRight} ${
    isRightSelected ? s.toggle__valueActive : ''
  }`;

  const leftId = `${props.id}-left`;
  const rightId = `${props.id}-right`;

  const leftValue = props.mapValue ? props.mapValue(props.leftValue) : props.leftValue;
  const rightValue = props.mapValue ? props.mapValue(props.rightValue) : props.rightValue;

  return (
    <div className={s.toggle}>
      <label className={leftCN} htmlFor={leftId}>
        {leftValue}
      </label>
      <label className={rightCN} htmlFor={rightId}>
        {rightValue}
      </label>

      <input
        className={s.toggle__radio}
        id={leftId}
        type='radio'
        checked={isLeftSelected}
        onChange={handleToggle(props.leftValue)}
      />
      <input
        id={rightId}
        className={s.toggle__radio}
        type='radio'
        checked={isRightSelected}
        onChange={handleToggle(props.rightValue)}
      />
    </div>
  );
}
