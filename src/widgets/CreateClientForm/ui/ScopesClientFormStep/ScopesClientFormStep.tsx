import { useGetScopesListQuery } from '@/entities/Scope';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Button } from '@/shared/ui/Button/Button';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { Loader } from '@/shared/ui/Loader/Loader';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { getCreateClientFormDataSelector } from '../../model/selectors/createClientFormSelectors';
import { createClientFormActions } from '../../model/slice/createClientFormSlice';

export const ScopesClientFormStep = () => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector(getCreateClientFormDataSelector);

  const {
    data: scopes,
    isLoading,
    isFetching,
  } = useGetScopesListQuery({ query: undefined });

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
        {isLoading || isFetching ? (
          <HStack className="h-[200px] justify-center">
            <Loader />
          </HStack>
        ) : (
          scopes?.rows.map((scope) => (
            <HStack className="items-start" key={scope.key}>
              <Checkbox
                id={scope.key}
                name={scope.key}
                checked={formData.scope.includes(scope.key)}
                onCheckedChange={() => onChangeScopes(scope.key)}
                className="mt-1 rounded-[4px]"
              />
              <VStack className="gap-0">
                <Text as="label" htmlFor={scope.key} className="text-base">
                  {scope.title}
                </Text>
                <Text variant="secondary">{scope.key}</Text>
              </VStack>
            </HStack>
          ))
        )}
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
