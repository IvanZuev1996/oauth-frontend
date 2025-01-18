import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  EditClientFormData,
  EditClientFormSchema,
} from '../types/editClientForm';

export const initialEditClientFormData: EditClientFormData = {
  img: '',
  companyEmail: '',
  redirectUri: '',
  scopes: {},
  name: '',
};

const initialState: EditClientFormSchema = {
  data: initialEditClientFormData,
};

const editClientFormSlice = createSlice({
  initialState,
  name: 'editClientForm',
  reducers: {
    setEditClientFormData: (
      state,
      { payload }: PayloadAction<EditClientFormData>,
    ) => {
      state.data = payload;
    },
  },
});

export const {
  reducer: editClientFormReducer,
  actions: editClientFormActions,
} = editClientFormSlice;
