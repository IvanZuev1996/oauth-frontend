import { ClientItem } from '@/entities/Client';
import { HStack } from '@/shared/ui/Stack';

import './ClientsList.css';

export const ClientsList = () => {
  return (
    <HStack className="clients-list">
      <ClientItem />
      <ClientItem />
    </HStack>
  );
};
