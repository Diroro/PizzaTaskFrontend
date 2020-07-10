import React, {useCallback} from 'react';
import s from './NumericStepper.module.css';

interface Props {
  className?: string;
  value: number;
  onChange: (value: number) => void;
}
export const NumericStepper: React.FC<Props> = ({className, value, onChange}) => {
  const increase = useCallback(() => onChange(value + 1), [value, onChange]);

  const decrease = useCallback(() => {
    if (value <= 0) {
      return;
    }
    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className={s.numericStepper}>
      <button onClick={decrease} disabled={value === 0} className={s.numericStepper__decrease}>
        -
      </button>
      <div className={s.numericStepper__value}>{value}</div>
      <button onClick={increase} className={s.numericStepper__increase}>
        +
      </button>
    </div>
  );
};
