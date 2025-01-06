import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.data = payload;
    },
  },
});

export const { reducer: userReducer, actions: userActions } = userSlice;
