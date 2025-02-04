import {
  EnhancedStore,
  Reducer,
  ReducersMapObject,
  UnknownAction,
} from '@reduxjs/toolkit';

import { UserSchema } from '@/entities/User';
import { ClientModerationSchema } from '@/features/ClientModerationModal';
import { rtkApi } from '@/shared/api/rtkApi';
import { CreateClientFormSchema } from '@/widgets/CreateClientForm';
import { EditClientFormSchema } from '@/widgets/EditClientForm';

export interface StateSchema {
  user: UserSchema;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

  /** Async reducers here */
  createClientForm?: CreateClientFormSchema;
  editClientForm?: EditClientFormSchema;
  clientModeration?: ClientModerationSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reduce: (state: StateSchema, action: UnknownAction) => any;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}
