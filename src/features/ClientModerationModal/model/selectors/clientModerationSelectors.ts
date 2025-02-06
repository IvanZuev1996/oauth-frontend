import { StateSchema } from '@/app/providers/StoreProvider';

import { defaultClientModerationData } from '../slice/clientModerationSlice';

export const getClientModerationFormDataSelector = (state: StateSchema) =>
  state.clientModeration?.data || defaultClientModerationData;
