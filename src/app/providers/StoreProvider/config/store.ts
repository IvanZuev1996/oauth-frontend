import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';

import { userReducer } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';

import { createReducerManager } from './reducerManager';
import { ReduxStoreWithManager, StateSchema } from './StateSchema';

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) {
  const rootReducer: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  };

  const reducerManager = createReducerManager(rootReducer);

  const store = configureStore({
    reducer: reducerManager.reduce,
    devTools: process.env.NODE_ENV === 'development',
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rtkApi.middleware),
  }) as ReduxStoreWithManager;

  store.reducerManager = reducerManager;

  return store;
}

export const store = createReduxStore();
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
