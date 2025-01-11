import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ClientFormData, ClientFormSchema } from '../types/clientForm';

export const initialStep = 1;
export const initialClientFormData: ClientFormData = {
  uploadedImage: '',
  email: '',
  redirectUri: '',
  scope: [],
  serviceName: '',
};

const initialState: ClientFormSchema = {
  step: initialStep,
  data: initialClientFormData,
};

const clientFormSlice = createSlice({
  initialState,
  name: 'clientForm',
  reducers: {
    setNextClientFormStep: (state) => {
      state.step += 1;
    },
    setPrevClientFormStep: (state) => {
      if (state.step === 1) return;
      state.step -= 1;
    },
    setClientFormData: (state, { payload }: PayloadAction<ClientFormData>) => {
      state.data = payload;
    },
  },
});

export const { reducer: clientFormReducer, actions: clientFormActions } =
  clientFormSlice;
