'use client';

import { Trash2 } from 'lucide-react';
import { FC, useEffect, useRef, useState } from 'react';

import { ScopeShortData, useLazyGetScopesListQuery } from '@/entities/Scope';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { PropsWithClassName } from '@/shared/types/general/general';
import { Button } from '@/shared/ui/Button/Button';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { Input } from '@/shared/ui/Input/Input';
import { InputGroup } from '@/shared/ui/InputGroup/InputGroup';
import { Loader } from '@/shared/ui/Loader/Loader';
import { Separator } from '@/shared/ui/Separator/Separator';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import './ScopesSearch.css';

type Props = PropsWithClassName & {
  scopes: ScopeShortData[];
  onChangeScopes: (scopes: ScopeShortData[]) => void;
};

export const ScopesSearch: FC<Props> = (props) => {
  const { scopes, className, onChangeScopes } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const [isHintsOpen, setIsHintsOpen] = useState(false);
  const [isHintsLoading, setIsHintsLoading] = useState(false);
  const [queryInput, setQueryInput] = useState('');

  const [fetchHints, { data: hints }] = useLazyGetScopesListQuery();

  useEffect(() => {
    fetchHints({});
  }, [fetchHints]);

  const updateQuery = async (query: string) => {
    await fetchHints({ query: query || undefined });
    setIsHintsLoading(false);
  };
  const debouncedFetchHints = useDebounce(updateQuery, 300);

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQueryInput(newValue);
    setIsHintsLoading(true);
    debouncedFetchHints(newValue);
  };

  const onChangeScope = (scope: ScopeShortData) => {
    const existScope = scopes.find((item) => item.key === scope.key);
    if (existScope) {
      return onDeleteScope(scope.key);
    }

    onChangeScopes([...scopes, scope]);
  };

  const onDeleteScope = (key: string) => {
    onChangeScopes(scopes.filter((item) => item.key !== key));
  };

  const renderHintsContent = () => {
    if (isHintsLoading) {
      return <Loader className="h-[200px]" size={22} />;
    }

    if (!hints || !hints.rows.length) {
      return (
        <VStack className="h-[60px] p-3">
          Ничего не найдено. Попробуйте изменить запрос
        </VStack>
      );
    }

    return hints?.rows.map((scope) => (
      <HStack
        key={scope.key}
        onClick={() => onChangeScope({ key: scope.key, title: scope.title })}
        className="scopes-search__hint"
      >
        <Checkbox
          checked={scopes.find((item) => item.key === scope.key) !== undefined}
          onCheckedChange={() =>
            onChangeScope({ key: scope.key, title: scope.title })
          }
        />
        <VStack className="gap-0">
          <Text as="span">{scope.title}</Text>
          <Text variant="secondary">{scope.key}</Text>
        </VStack>
      </HStack>
    ));
  };

  return (
    <VStack className={className}>
      <InputGroup label="Доступ к данным" className="relative">
        <Input
          ref={inputRef}
          value={queryInput}
          onChange={onChangeQuery}
          placeholder="Название доступа"
          onFocus={() => setIsHintsOpen(true)}
          onBlur={() => setIsHintsOpen(false)}
        />

        {isHintsOpen && (
          <VStack
            onMouseDown={(e) => e.preventDefault()}
            className="scopes-search__hints"
          >
            {renderHintsContent()}
          </VStack>
        )}
      </InputGroup>

      <VStack>
        {scopes.map((scope, idx) => (
          <VStack key={scope.key + idx}>
            <HStack>
              <VStack className="gap-0">
                <Text as="span">{scope.title}</Text>
                <Text variant="secondary" as="span">
                  {scope.key}
                </Text>
              </VStack>

              <Button
                variant="secondary"
                onClick={() => onDeleteScope(scope.key)}
              >
                <Trash2 size={18} />
              </Button>
            </HStack>

            <Separator />
          </VStack>
        ))}
      </VStack>
    </VStack>
  );
};
