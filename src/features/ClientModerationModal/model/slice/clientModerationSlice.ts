import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ClientScopesOptions } from '@/entities/Client';
import { FromToOptions } from '@/shared/types/general/general';

import { ClientModerationSchema } from '../types/clientModeration';

export const defaultClientModerationData: ClientScopesOptions = {};

const initialState: ClientModerationSchema = {
  data: defaultClientModerationData,
};

const clientModerationSlice = createSlice({
  initialState,
  name: 'clientModeration',
  reducers: {
    setWorkingDaysOnly: (state, { payload }: PayloadAction<boolean>) => {
      state.data.workingDaysOnly = payload;
    },
    setTimeOfDay: (
      state,
      { payload }: PayloadAction<FromToOptions | undefined>,
    ) => {
      state.data.timeOfDay = payload;
    },
    setDayOfWeek: (state, { payload }: PayloadAction<number[] | undefined>) => {
      state.data.dayOfWeek = payload;
    },

    setRequestsPerMinute: (
      state,
      { payload }: PayloadAction<number | undefined>,
    ) => {
      state.data.requestsPerMinute = payload;
    },

    setIpWhitelist: (
      state,
      { payload }: PayloadAction<string[] | undefined>,
    ) => {
      state.data.ipWhitelist = payload;
    },
    setIpBlacklist: (
      state,
      { payload }: PayloadAction<string[] | undefined>,
    ) => {
      state.data.ipBlacklist = payload;
    },
    setGeoWhitelist: (
      state,
      { payload }: PayloadAction<string[] | undefined>,
    ) => {
      state.data.geoWhitelist = payload;
    },
    setGeoBlacklist: (
      state,
      { payload }: PayloadAction<string[] | undefined>,
    ) => {
      state.data.geoBlacklist = payload;
    },
  },
});

export const {
  reducer: clientModerationReducer,
  actions: clientModerationActions,
} = clientModerationSlice;
