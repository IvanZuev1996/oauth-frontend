import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { StateSchema } from '@/app/providers/StoreProvider';

/**
 * @description User typed redux-selector
 */
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;
