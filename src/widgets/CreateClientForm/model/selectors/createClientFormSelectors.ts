import { StateSchema } from '@/app/providers/StoreProvider';

import {
  initialCreateClientFormData,
  initialStep,
} from '../slice/createClientFormSlice';

export const getCreateClientFormDataSelector = (state: StateSchema) =>
  state.createClientForm?.data || initialCreateClientFormData;
export const getCreateClientFormStepSelector = (state: StateSchema) =>
  state.createClientForm?.step || initialStep;
