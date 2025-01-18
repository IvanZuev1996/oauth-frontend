import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  CreateClientFormData,
  CreateClientFormSchema,
} from '../types/createClientForm';

export const initialStep = 1;
export const initialCreateClientFormData: CreateClientFormData = {
  uploadedImage: '',
  email: '',
  redirectUri: '',
  scope: [],
  serviceName: '',
};

const initialState: CreateClientFormSchema = {
  step: initialStep,
  data: initialCreateClientFormData,
};

const createClientFormSlice = createSlice({
  initialState,
  name: 'createClientForm',
  reducers: {
    setNextCreateClientFormStep: (state) => {
      state.step += 1;
    },
    setPrevCreateClientFormStep: (state) => {
      if (state.step === 1) return;
      state.step -= 1;
    },
    setCreateClientFormData: (
      state,
      { payload }: PayloadAction<CreateClientFormData>,
    ) => {
      state.data = payload;
    },
  },
});

export const {
  reducer: createClientFormReducer,
  actions: createClientFormActions,
} = createClientFormSlice;
