import { ClientStatusEnum } from '@/entities/Client';
import { ClientsList } from '@/widgets/ClientsList';

export const OnModerationPage = () => {
  return <ClientsList status={ClientStatusEnum.PENDING} />;
};
