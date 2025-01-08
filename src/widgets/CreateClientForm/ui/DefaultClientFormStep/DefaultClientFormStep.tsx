import { Input } from '@/shared/ui/Input/Input';
import { InputGroup } from '@/shared/ui/InputGroup/InputGroup';
import { VStack } from '@/shared/ui/Stack';

export const DefaultClientFormStep = () => {
  return (
    <VStack>
      <InputGroup label="Название Вашего приложения">
        <Input placeholder="Название приложения" />
      </InputGroup>

      <InputGroup label="Название Вашего приложения">
        <Input placeholder="Название приложения" />
      </InputGroup>
    </VStack>
  );
};
