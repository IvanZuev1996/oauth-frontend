import { ArrowLeft, Check, TriangleAlert } from 'lucide-react';
import { FC } from 'react';

import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { getDayName, getHour } from '@/shared/lib/utils/dates';
import { formatWord } from '@/shared/lib/utils/formatWord';
import { Alert } from '@/shared/ui/Alert/Alert';
import { Button } from '@/shared/ui/Button/Button';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { getClientModerationFormDataSelector } from '../../model/selectors/clientModerationSelectors';

type Props = {
  onNextStep: () => void;
  onBack: () => void;
  isLoading?: boolean;
};

export const ClientApproveStep: FC<Props> = (props) => {
  const { isLoading, onBack, onNextStep } = props;
  const data = useAppSelector(getClientModerationFormDataSelector);

  const isClientHasLimits = Object.values(data).some(Boolean);

  return (
    <VStack>
      {isClientHasLimits ? (
        <VStack>
          <Text className="mt-2 text-base" weight="medium">
            Перепроверьте ограничения
          </Text>
          <ul className="w-full list-inside list-decimal space-y-2 rounded-md bg-secondary p-3 [&>li]:text-base">
            {data.workingDaysOnly && (
              <li>{`Приложение будет работать только в рабочие дни`}</li>
            )}
            {data.timeOfDay && (
              <li>{`Приложение будет работать только с ${getHour(data.timeOfDay.from)} до ${getHour(data.timeOfDay.to)} `}</li>
            )}
            {data.dayOfWeek && (
              <li>{`Приложение будет работать в следующие дни недели: \n ${data.dayOfWeek.map(getDayName).join(', ')} `}</li>
            )}
            {data.requestsPerMinute && (
              <li>{`На приложение будет наложено ограничение на кол-во запросов: ${formatWord(data.requestsPerMinute, ['запрос', 'запроса', 'запросов'])} в минуту `}</li>
            )}
            {data.ipWhitelist ? (
              <li>{`Это приложение сможет получать доступ только с этих IP адресов: ${data.ipWhitelist.join(', ')} `}</li>
            ) : (
              data.ipBlacklist && (
                <li>{`Эти IP адреса будут заблокированы для этого приложения: ${data.ipBlacklist.join(', ')} `}</li>
              )
            )}
          </ul>
        </VStack>
      ) : (
        <Alert variant="warning">
          <TriangleAlert size={18} />
          <Text>
            Вы не задали ограничения на это приложение. Приложение будет
            работать без ограничений в рамках запрошенных прав.
          </Text>
        </Alert>
      )}

      <HStack className="mt-5 justify-end">
        <Button variant="secondary" onClick={onBack}>
          <ArrowLeft /> Вернуться
        </Button>
        <Button onClick={onNextStep} isLoading={isLoading}>
          <Check />
          Принять и сохранить
        </Button>
      </HStack>
    </VStack>
  );
};
