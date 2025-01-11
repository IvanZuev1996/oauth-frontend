import { rtkApi } from '@/shared/api/rtkApi';

import { UploadedImage } from '../model/types/upload';

const uploadApi = rtkApi.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    uploadImage: builder.mutation<UploadedImage, FormData>({
      query: (body) => ({
        url: '/uploads',
        method: 'POST',
        body,
      }),
    }),

    deleteImage: builder.mutation<
      { status: 'success' | 'error' },
      Pick<UploadedImage, 'path'>
    >({
      query: (body) => ({
        url: '/uploads',
        method: 'DELETE',
        body,
      }),
    }),
  }),
});

export const { useUploadImageMutation, useDeleteImageMutation } = uploadApi;
