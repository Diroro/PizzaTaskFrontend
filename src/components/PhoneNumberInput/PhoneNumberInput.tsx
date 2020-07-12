import React, {useState, useEffect, useCallback, memo} from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input';
import {useDebouncedValue} from '../../utils/useDebouncedValue';
import './PhoneNumberInput.css';

interface Props {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const PhoneNumberInput: React.FC<Props> = memo(
  ({value: initialValie, onChange, placeholder}) => {
    const [value, setValue] = useState(initialValie);
    const [isTouched, setTouched] = useState(false);
    const [error, setError] = useState('');
    const debouncedValue = useDebouncedValue(value, 300);

    useEffect(() => {
      let error = '';
      if (!isValidPhoneNumber(debouncedValue) || debouncedValue.length === 0) {
        error = 'Value should be a valid phone number';
      }
      setError(error);
      onChange(debouncedValue ?? '');
    }, [debouncedValue, onChange]);

    const onChangeValue = useCallback((value?: string) => {
      setValue(value ?? '');
    }, []);

    const onFocus = useCallback(() => {
      setTouched(false);
    }, []);

    const onBlur = useCallback(() => {
      setTouched(true);
    }, []);

    const cn = `textInput__wrapper ${error ? 'textInput__wrapperError' : ''}`;
    return (
      <>
        <PhoneInput
          className={cn}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          limitMaxLength
          international
          value={value}
          onChange={onChangeValue}
        />
        {isTouched && error ? <div className='textInput__errorText'>{error}</div> : null}
      </>
    );
  },
);
