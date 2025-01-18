import { Reducer } from '@reduxjs/toolkit';
import { ReactNode, useEffect } from 'react';
import { useStore } from 'react-redux';

import {
  ReduxStoreWithManager,
  StateSchema,
  StateSchemaKey,
} from '@/app/providers/StoreProvider';

import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';

export type ReducerList = {
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface DynamicModuleLoaderProps {
  reducers: ReducerList;
  children: ReactNode;
  removeAfterUnmount?: boolean;
  onReducersMounted?: () => void;
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
  const {
    reducers,
    children,
    removeAfterUnmount = true,
    onReducersMounted,
  } = props;
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const mountedReducers = store.reducerManager.getReducerMap();

    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateSchemaKey];

      // Добавляем reducer только если он не вмонтирован
      if (!mounted) {
        store.reducerManager.add(name as StateSchemaKey, reducer);
        dispatch({ type: `@INIT ${name} Reducer` });
      }

      onReducersMounted?.();
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@DESTROY ${name} Reducer` });
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
