import { HStack } from '@/shared/ui/Stack';
import { CreateClientForm } from '@/widgets/CreateClientForm';

export const NewClientPage = () => {
  return (
    <HStack className="justify-center">
      <CreateClientForm />
    </HStack>
  );
};
