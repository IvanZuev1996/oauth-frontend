import { StateSchema } from '@/app/providers/StoreProvider';

export const getClientModerationFormDataSelector = (state: StateSchema) =>
  state.clientModeration?.data || {};
