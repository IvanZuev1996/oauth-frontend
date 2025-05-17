import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/app/providers/StoreProvider';

/**
 * @description Use typed redux-dispatch
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
