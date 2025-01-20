import { CircleAlert } from 'lucide-react';
import * as React from 'react';

import { cn } from '../../lib/utils/cn';

import './input.css';

type Props = React.ComponentProps<'input'> & {
  error?: string;
};

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="relative block">
        <div className="input__wrap" data-error={Boolean(error)}>
          <input
            type={type}
            className={cn('input', className)}
            ref={ref}
            autoComplete="off"
            {...props}
          />

          <div className="input__box" />
          {error && <CircleAlert size={20} className="input__state" />}
        </div>
        {error && <span className="input__error">{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
