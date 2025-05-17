'use client';

import copy from 'copy-to-clipboard';
import { Check, Copy } from 'lucide-react';
import { FC, useState } from 'react';

import { timeout } from '@/shared/lib/utils/timeout';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import './CopiedField.css';

type Props = {
  field: string;
  value: string;
  withCopy?: boolean;
};

export const CopiedField: FC<Props> = ({ field, value, withCopy = true }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!withCopy) return;
    copy(value);
    setIsCopied(true);
    await timeout(2000);
    setIsCopied(false);
  };

  return (
    <VStack>
      <Text weight="medium" className="text-base">
        {field}
      </Text>
      <HStack className="copied-field">
        <Text className="text-base">{value}</Text>
        {isCopied ? (
          <Check size={18} />
        ) : (
          withCopy && <Copy size={18} onClick={handleCopy} />
        )}
      </HStack>
    </VStack>
  );
};
