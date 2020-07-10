const isEmail = (value: string) => {
  const regexp = /\S+@\S+\.\S+/;
  return regexp.test(value);
};

const isNotEmpty = (value: string) => value !== '';

const isLessOrEqual = (length: number) => (value: string) => value.length <= length;
const isLessOrEqual100 = isLessOrEqual(50);
const isLessOrEqual255 = isLessOrEqual(255);

export const validators = {
  isNotEmpty: {
    isValid: isNotEmpty,
    error: 'Value should not be empty',
  },
  isLessOrEqual100: {
    isValid: isLessOrEqual100,
    error: 'Value should be less or equal than 100 symbols',
  },
  isLessOrEqual255: {
    isValid: isLessOrEqual255,
    error: 'Value should be less or equal than 255 symbols',
  },
  isEmail: {
    isValid: isEmail,
    error: 'Value should be a valid email. Example: test@test.com',
  },
};

export const defaultValidationErrorMessage = 'Value is invalid!';

export type Validator = {
  isValid: (value: string) => boolean;
  error?: string;
};

export const isOkForAllValidators = (validators: Validator[]) => (value: string) => {
  return validators.every((validator) => validator.isValid(value));
};
