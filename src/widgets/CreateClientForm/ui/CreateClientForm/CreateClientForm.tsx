'use client';
import { useState } from 'react';

import { Progress } from '@/shared/ui/Progress/Progress';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { DefaultClientFormStep } from '../DefaultClientFormStep/DefaultClientFormStep';

import './CreateClientForm.css';

export const CreateClientForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <VStack className="clients-form">
      <VStack className="mb-3 items-center justify-center">
        <Text>{currentStep} из 3</Text>
        <Progress
          value={(currentStep * 100) / 3}
          className="h-[4px] max-w-[60px]"
        />
      </VStack>
      <DefaultClientFormStep />
    </VStack>
  );
};
