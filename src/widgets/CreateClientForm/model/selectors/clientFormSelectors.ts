import { StateSchema } from '@/app/providers/StoreProvider';

import { initialClientFormData, initialStep } from '../slice/clientFormSlice';

export const getClientFormDataSelector = (state: StateSchema) =>
  state.clientForm?.data || initialClientFormData;
export const getClientFormStepSelector = (state: StateSchema) =>
  state.clientForm?.step || initialStep;
