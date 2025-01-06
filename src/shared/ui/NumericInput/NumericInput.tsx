import { InputHTMLAttributes, forwardRef } from 'react';

import { containsOnlyDigits } from '@/shared/lib/utils/onlyDigits';

import { Input } from '../Input/Input';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'max'
>;

interface Props extends HTMLInputProps {
  value?: string | number;
  onChange?: (value: string) => void;
  max?: number;
}

export const NumericInput = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { className, type, value, max, onChange, ...otherProps } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value.replace(/\s+/g, '');

      if (newValue.length > 1 && newValue.startsWith('0')) {
        newValue = newValue.slice(1);
      }
      if (!containsOnlyDigits(newValue)) return;
      if (max && parseInt(newValue) > max) {
        return onChange?.(String(max));
      }

      onChange?.(newValue);
    };

    const formatNumber = (value: string) => {
      if (!value) return '';
      if (isNaN(parseInt(value.replace(/\s+/g, ''), 10))) {
        return '0';
      }
      return parseInt(value.replace(/\s+/g, ''), 10).toLocaleString('ru-RU');
    };

    const formattedValue = formatNumber(String(value || '')) || 0;

    return (
      <Input
        ref={ref}
        type={type}
        value={formattedValue}
        onChange={onChangeHandler}
        className={className}
        {...otherProps}
      />
    );
  },
);

NumericInput.displayName = 'NumericInput';
