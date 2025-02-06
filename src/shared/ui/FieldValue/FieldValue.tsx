'use client';

import copy from 'copy-to-clipboard';
import { Check, Copy } from 'lucide-react';
import { FC, ReactNode, useState } from 'react';

import { cn } from '@/shared/lib/utils/cn';
import { PropsWithClassName } from '@/shared/types/general/general';

import { HStack } from '../Stack';
import { Text } from '../Text/Text';

type FieldValueProps = {
  field: string;
  value: ReactNode;
  variant?: 'flex' | 'grid';
  truncate?: boolean;
} & PropsWithClassName;

export const FieldValue: FC<FieldValueProps> = (props) => {
  const { field, value, className, variant = 'flex', truncate = true } = props;

  return (
    <HStack
      className={cn(
        variant === 'flex'
          ? 'justify-between gap-[2px] max-sm:flex-col max-sm:items-start'
          : 'grid grid-cols-2 max-sm:grid-cols-1 max-sm:gap-1',
        className,
      )}
    >
      <Text as="span" variant="secondary" truncate={truncate}>
        {field}
      </Text>
      <Text truncate={truncate} as="div">
        {value}
      </Text>
    </HStack>
  );
};

type CopiedFieldValueProps = FieldValueProps;

export const CopiedFieldValue: FC<CopiedFieldValueProps> = (props) => {
  const { field, value, className, variant = 'flex', truncate = true } = props;

  const [isCopied, setCopied] = useState(false);

  const copyClickHandler = () => {
    const res = copy(value as string);
    if (res) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    }
  };

  return (
    <HStack
      className={cn(
        variant === 'flex'
          ? 'justify-between gap-[2px] max-sm:flex-col max-sm:items-start'
          : 'grid grid-cols-2 max-sm:grid-cols-1 max-sm:gap-1',
        className,
      )}
    >
      <Text as="span" variant="secondary" truncate={truncate}>
        {field}
      </Text>
      <Text truncate={truncate} as="div">
        {value}

        <span className="inline-block cursor-pointer pl-2">
          {isCopied ? (
            <Check size={13} />
          ) : (
            <Copy onClick={copyClickHandler} size={13} />
          )}
        </span>
      </Text>
    </HStack>
  );
};
