import { ComponentProps, PropsWithChildren } from 'react';

import { cn } from '@/shared/lib/utils/cn';
import { PropsWithClassName } from '@/shared/types/general/general';

import { CurrencyIcon } from '../CurrencyIcon/CurrencyIcon';

type AvailableComponents = React.ElementType<
  {},
  'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label'
>;
type TextVariant = 'default' | 'error' | 'secondary' | 'primary';
type TextWeight =
  | 'extraLight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

type TextProps<T extends AvailableComponents = 'p'> = PropsWithClassName &
  PropsWithChildren & {
    as?: T;
    variant?: TextVariant;
    weight?: TextWeight;
    withCurrencyIcon?: boolean;
  } & ComponentProps<T>;

export const Text = <T extends AvailableComponents = 'p'>(
  props: TextProps<T>,
) => {
  const {
    className,
    children,
    withCurrencyIcon = false,
    variant = 'default',
    weight = 'normal',
    as: Component = 'p',
    ...otherProps
  } = props;

  const variantClasses: Record<TextVariant, string> = {
    default: 'text-foreground',
    error: 'text-destructive',
    secondary: 'text-muted-foreground',
    primary: 'text-primary',
  };

  const weightClasses: Record<TextWeight, string> = {
    black: 'font-black',
    extrabold: 'font-extrabold',
    bold: 'font-bold',
    semibold: 'font-semibold',
    medium: 'font-medium',
    light: 'font-light',
    extraLight: 'font-extralight',
    normal: '',
  };

  return (
    <Component
      className={cn(
        'text-sm',
        weightClasses[weight],
        variantClasses[variant],
        className,
      )}
      {...otherProps}
    >
      {children}
      {withCurrencyIcon && <CurrencyIcon className="ml-1" />}
    </Component>
  );
};
