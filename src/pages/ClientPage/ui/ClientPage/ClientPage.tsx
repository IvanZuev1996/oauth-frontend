'use client';

import { FC } from 'react';

import { useGetClientDataQuery } from '@/entities/Client';
import { ClientDetails } from '@/widgets/ClientDetails';

import { ClientPageHeader } from '../ClientPageHeader/ClientPageHeader';

import './ClientPage.css';

type Props = {
  clientId: string;
};

export const ClientPage: FC<Props> = ({ clientId }) => {
  const { data, isLoading, isFetching } = useGetClientDataQuery({ clientId });

  return (
    <>
      <ClientPageHeader data={data} />
      <ClientDetails data={data} isLoading={isLoading || isFetching} />
    </>
  );
};
