'use client';

import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Progress } from '@/shared/ui/Progress/Progress';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { CREATE_CLIENT_FORM_STEPS } from '../../config/clientFormConfig';
import { getClientFormStepSelector } from '../../model/selectors/clientFormSelectors';
import { clientFormReducer } from '../../model/slice/clientFormSlice';
import { DefaultClientFormStep } from '../DefaultClientFormStep/DefaultClientFormStep';
import { ScopesClientFormStep } from '../ScopesClientFormStep/ScopesClientFormStep';
import { SystemClientFormStep } from '../SystemClientFormStep/SystemClientFormStep';

import './CreateClientForm.css';
import { CreateClientSuccessForm } from '../CreateClientSuccessForm/CreateClientSuccessForm';

const reducers: ReducerList = {
  clientForm: clientFormReducer,
};

export const CreateClientForm = () => {
  const currentStep = useAppSelector(getClientFormStepSelector);

  const renderStepForm = () => {
    switch (currentStep) {
      case 1:
        return <DefaultClientFormStep />;
      case 2:
        return <ScopesClientFormStep />;
      case 3:
        return <SystemClientFormStep />;
      case 4:
        return <CreateClientSuccessForm />;
    }
  };

  return (
    <DynamicModuleLoader reducers={reducers}>
      <VStack className="clients-form">
        <VStack className="mb-3 items-center justify-center">
          <Text>
            {currentStep} из {CREATE_CLIENT_FORM_STEPS}
          </Text>
          <Progress
            value={(currentStep * 100) / CREATE_CLIENT_FORM_STEPS}
            className="h-[4px] max-w-[60px]"
          />
        </VStack>
        {renderStepForm()}
      </VStack>
    </DynamicModuleLoader>
  );
};
