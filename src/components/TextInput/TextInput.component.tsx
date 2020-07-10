import React, {useState, useEffect, useCallback, ChangeEvent} from 'react';
import {useDebouncedValue} from '../../utils/useDebouncedValue';
import {Validator, defaultValidationErrorMessage} from '../../utils/validators';
import s from './TextInput.module.css';

export enum TextInputType {
  text = 'text',
  password = 'password',
}

export interface Props {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  validators?: Validator[];
  type?: TextInputType;
}

export const TextInput: React.FC<Props> = ({placeholder, value, onChange, validators, type}) => {
  const [text, setText] = useState(value);
  const [errors, setErrors] = useState<string[]>([]);
  const [isFocused, setFocused] = useState(false);
  const [isTouched, setTouched] = useState(false);
  const debouncedValue = useDebouncedValue(text, 300);

  useEffect(() => {
    const errors: string[] = [];
    if (validators) {
      validators.forEach((validator) => {
        const isValid = validator.isValid(debouncedValue);
        if (!isValid) {
          errors.push(validator.error ?? defaultValidationErrorMessage);
        }
      });
    }
    setErrors(errors);
    onChange(debouncedValue);
  }, [debouncedValue, onChange, validators]);

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setErrors([]);
    setText(e.target.value);
  }, []);

  const onFocus = useCallback((e: React.FocusEvent) => {
    setTouched(false);
    setFocused(true);
  }, []);

  const onBlur = useCallback((e: React.FocusEvent) => {
    setTouched(true);

    setFocused(false);
  }, []);

  const cn = `${s.textInput} ${isFocused ? s.textInput__active : ''} ${
    errors.length > 0 && isTouched ? s.textInput__error : ''
  }`;

  const inputType = type ?? TextInputType.text;

  return (
    <div className={s.textInput__wrapper}>
      <input
        className={cn}
        onFocus={onFocus}
        onBlur={onBlur}
        value={text}
        placeholder={placeholder}
        onChange={onInputChange}
        type={inputType}
      />

      {isTouched
        ? errors.map((error, idx) => (
            <div key={idx} className={s.textInput__errorText}>
              {error}
            </div>
          ))
        : null}
    </div>
  );
};
