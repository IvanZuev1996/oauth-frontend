import { Plus, X } from 'lucide-react';
import { ChangeEvent, FC, useState } from 'react';

import { ClientScopeLimit } from '@/entities/Client';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Badge } from '@/shared/ui/Badge/Badge';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Separator } from '@/shared/ui/Separator/Separator';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { getClientModerationFormDataSelector } from '../../../../model/selectors/clientModerationSelectors';
import { clientModerationActions } from '../../../../model/slice/clientModerationSlice';

type Props = {
  ipListType: 'black' | 'white';
};

export const IPListForm: FC<Props> = ({ ipListType }) => {
  const dispatch = useAppDispatch();

  const data = useAppSelector(getClientModerationFormDataSelector);
  const ipList = ipListType === 'black' ? data.ipBlacklist : data.ipWhitelist;

  const [ipInputValue, setIpInputValue] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const onAddIpAddress = () => {
    if (ipList?.includes(ipInputValue)) {
      return setError('Такой IP уже есть');
    }
    if (ipInputValue.length < 8) return setError('Неверный IP');

    const newIpList = [...(ipList || []), ipInputValue];
    setIpInputValue('');
    setNewIpList(newIpList);
  };

  const onDeleteIpAddress = (ip: string) => {
    const newIpList = ipList?.filter((i) => i !== ip);
    setNewIpList(newIpList);
  };

  const setNewIpList = (newIpList: string[] | undefined) => {
    if (ipListType === 'black') {
      return dispatch(clientModerationActions.setIpBlacklist(newIpList));
    }
    dispatch(clientModerationActions.setIpWhitelist(newIpList));
  };

  const onChangeIpInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setError(undefined);
    setIpInputValue(e.target.value);
  };

  const isOpen = isChecked || Boolean(ipList?.length);

  return (
    <ClientScopeLimit
      option={ipListType === 'black' ? 'ipBlacklist' : 'ipWhitelist'}
      checked={isOpen}
      onChange={setIsChecked}
    >
      {isOpen && (
        <>
          <Separator className="my-2" />
          <HStack className="items-start">
            <Input
              value={ipInputValue}
              onChange={onChangeIpInputValue}
              placeholder="Введите IP адрес"
              error={error}
              className="w-full max-w-[240px]"
            />
            <Button onClick={onAddIpAddress} className="h-10">
              <Plus size={18} />
            </Button>
          </HStack>

          <div className="mt-3 grid w-full grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
            {ipList?.map((ip, idx) => (
              <Badge key={idx} variant="primary_outline" className="text-sm">
                <HStack className="justify-between">
                  <Text as="span" className="block truncate">
                    {ip}
                  </Text>

                  <X
                    size={18}
                    onClick={() => onDeleteIpAddress(ip)}
                    className="min-w-[18px] cursor-pointer opacity-60 transition-opacity hover:opacity-100"
                  />
                </HStack>
              </Badge>
            ))}
          </div>
        </>
      )}
    </ClientScopeLimit>
  );
};
