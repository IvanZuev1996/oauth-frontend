import { VStack } from '@/shared/ui/Stack';
import Image from 'next/image';
import { Text } from '@/shared/ui/Text/Text';

export const CreateClientSuccessForm = () => {
  return (
    <VStack className="mt-5 items-center justify-center">
      <Image src={'/success-icon.svg'} alt="Успешно" width={60} height={60} />
      <Text weight="medium" className="text-lg">
        Клиент успешно создан!
      </Text>
      <Text variant="secondary" className="text-center">
        Сейчас вы будете перенаправлены на <br /> страницу списка клиентов
      </Text>
    </VStack>
  );
};
