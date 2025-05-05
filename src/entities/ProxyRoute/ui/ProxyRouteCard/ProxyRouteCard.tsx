import { Pencil } from 'lucide-react';
import { FC } from 'react';

import { cn } from '@/shared/lib/utils/cn';
import { RestMethods } from '@/shared/types/general/general';
import { RestMethod } from '@/shared/ui/RestMethod/RestMethod';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { ProxyRoute } from '../../model/types/proxyRoute';

import './ProxyRouteCard.css';

type Props = {
  proxyRoute: ProxyRoute;
};

export const ProxyRouteCard: FC<Props> = ({ proxyRoute }) => {
  const config: Record<RestMethods, string> = {
    GET: 'bg-green-600/5 border-green-600/20 hover:bg-green-600/10',
    POST: 'bg-yellow-700/5 border-yellow-700/20 hover:bg-yellow-700/10',
    PUT: 'bg-blue-700/5 border-blue-700/20 hover:bg-blue-700/10',
    PATCH: 'bg-purple-700/5 border-purple-700/20 hover:bg-purple-700/10',
    DELETE: 'bg-red-700/5 border-red-700/20 hover:bg-red-700/10',
  };

  const className = config[proxyRoute.method];

  return (
    <HStack className={cn('proxy-card', className)}>
      <RestMethod method={proxyRoute.method} />
      <VStack className="gap-0">
        <Text weight="medium">{proxyRoute.name}</Text>
        <Text variant="secondary">{proxyRoute.externalPath}</Text>
      </VStack>

      <Pencil size={16} />
    </HStack>
  );
};
