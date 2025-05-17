import { StateSchema } from '@/app/providers/StoreProvider';

import { initialEditClientFormData } from '../slice/editClientFormSlice';

export const getEditClientFormDataSelector = (state: StateSchema) =>
  state.editClientForm?.data || initialEditClientFormData;
