import { FC } from 'react';

import { CheckedScope, useGetScopesListQuery } from '@/entities/Scope';
import { EmptyData } from '@/shared/ui/EmptyData/EmptyData';
import { Loader } from '@/shared/ui/Loader/Loader';
import { HStack } from '@/shared/ui/Stack';

import './EditableProxyRouteScopes.css';

type Props = {
  selectedScopes: string[];
  onChange: (updatedScopes: string[]) => void;
};

export const EditableProxyRouteScopes: FC<Props> = (props) => {
  const { selectedScopes, onChange } = props;
  const { data, isLoading, isFetching } = useGetScopesListQuery({
    query: undefined,
  });

  const onChangeHandler = (scopeKey: string) => {
    let updatedScopes: string[] | null = null;
    if (selectedScopes.includes(scopeKey)) {
      updatedScopes = selectedScopes.filter((s) => s !== scopeKey);
    } else {
      updatedScopes = [...selectedScopes, scopeKey];
    }
    onChange(updatedScopes);
  };

  if (isLoading || isFetching) {
    return (
      <HStack className="h-[120px] justify-center">
        <Loader />
      </HStack>
    );
  }

  return (
    <div className="proxy-route__scopes">
      {data?.rows.length ? (
        data.rows.map((scope) => (
          <CheckedScope
            key={scope.key}
            scope={scope}
            isActive={selectedScopes.includes(scope.key)}
            onChange={onChangeHandler}
          />
        ))
      ) : (
        <EmptyData text="Создайте свои права доступа, чтобы назначить на этот маршрут" />
      )}
    </div>
  );
};
