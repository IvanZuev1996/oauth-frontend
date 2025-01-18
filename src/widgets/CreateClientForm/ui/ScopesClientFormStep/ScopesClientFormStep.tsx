import { clientScopes } from '@/shared/config/scopes/scopesConfig';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Button } from '@/shared/ui/Button/Button';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { getCreateClientFormDataSelector } from '../../model/selectors/createClientFormSelectors';
import { createClientFormActions } from '../../model/slice/createClientFormSlice';

export const ScopesClientFormStep = () => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector(getCreateClientFormDataSelector);

  const onChangeScopes = (scopeKey: string) => {
    if (formData.scope.includes(scopeKey)) {
      dispatch(
        createClientFormActions.setCreateClientFormData({
          ...formData,
          scope: formData.scope.filter((scope) => scope !== scopeKey),
        }),
      );
      return;
    }

    return dispatch(
      createClientFormActions.setCreateClientFormData({
        ...formData,
        scope: [...formData.scope, scopeKey],
      }),
    );
  };

  const onChangeStep = (type: 'prev' | 'next') => {
    if (type === 'prev') {
      return dispatch(createClientFormActions.setPrevCreateClientFormStep());
    }
    dispatch(createClientFormActions.setNextCreateClientFormStep());
  };

  return (
    <VStack>
      <Text weight="medium" className="text-lg">
        Выберите данные, которые необходимы приложению:
      </Text>
      <VStack className="mt-3">
        {Object.entries(clientScopes).map(([serviceKey, service], idx) => (
          <VStack key={idx}>
            <Text className="text-base" weight="medium">
              {service.name}
            </Text>
            {service.scopes.map((scope) => {
              const scopeKey = `${serviceKey}:${scope.key}`;
              return (
                <HStack className="items-start pl-2" key={scope.key}>
                  <Checkbox
                    id={scopeKey}
                    name={scopeKey}
                    checked={formData.scope.includes(scopeKey)}
                    onCheckedChange={() => onChangeScopes(scopeKey)}
                    className="mt-1 rounded-[4px]"
                  />
                  <VStack className="gap-0">
                    <Text as="label" htmlFor={scopeKey} className="text-base">
                      {scope.name}
                    </Text>
                    <Text variant="secondary">{scopeKey}</Text>
                  </VStack>
                </HStack>
              );
            })}
          </VStack>
        ))}
      </VStack>

      <VStack className="mt-3">
        <Button
          className="w-full"
          disabled={!formData.scope.length}
          onClick={() => onChangeStep('next')}
        >
          Сохранить и продолжить
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => onChangeStep('prev')}
        >
          Вернуться назад
        </Button>
      </VStack>
    </VStack>
  );
};
