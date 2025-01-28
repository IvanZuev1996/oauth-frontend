'use client';

import { CloudAlert } from 'lucide-react';
import { FC } from 'react';

import {
  ClientScopes,
  ClientStatusAlert,
  ClientWithScopeDetails,
} from '@/entities/Client';
import { CopiedField } from '@/features/CopiedField';
import { formatDate } from '@/shared/lib/utils/formatDate';
import { Loader } from '@/shared/ui/Loader/Loader';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import './ClientDetails.css';

type Props = {
  data?: ClientWithScopeDetails;
  isLoading: boolean;
};

export const ClientDetails: FC<Props> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <HStack className="client-details__loader">
        <Loader />
      </HStack>
    );
  }

  if (!data) {
    return (
      <VStack className="client-details__error">
        <CloudAlert className="text-destructive" />
        <Text variant="error" className="text-base">
          Не удалось загрузить данные
        </Text>
      </VStack>
    );
  }

  return (
    <VStack>
      <ClientStatusAlert status={data.status} className="mb-5" />

      <div className="client-details">
        <CopiedField field="Почта для связи" value={data.companyEmail} />
        <CopiedField field="ClientID" value={data.clientId} />
        <CopiedField
          field="Последнее изменение"
          value={formatDate(data.updatedAt)}
          withCopy={false}
        />
        <CopiedField
          field="Client secret"
          value={data.clientSecret || 'Ваше приложение пока на рассмотрении'}
        />

        <VStack>
          <Text weight="medium" className="text-base">
            Запрашиваемые права
          </Text>
          <ClientScopes scopes={data.scopes} />
        </VStack>

        <CopiedField field="Redirect URI" value={data.redirectUri} />
      </div>
    </VStack>
  );
};
