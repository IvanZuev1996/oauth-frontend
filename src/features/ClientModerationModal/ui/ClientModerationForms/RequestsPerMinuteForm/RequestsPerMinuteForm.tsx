import React from 'react';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { InputGroup } from '@/shared/ui/InputGroup/InputGroup';
import { NumericInput } from '@/shared/ui/NumericInput/NumericInput';
import { Separator } from '@/shared/ui/Separator/Separator';

import { clientModerationActions } from '../../../model/slice/clientModerationSlice';
import { getClientModerationFormDataSelector } from '../../../selectors/clientModerationSelectors';
import { ClientModerationForm } from '../../ClientModerationForm/ClientModerationForm';

export const RequestsPerMinuteForm = () => {
  const dispatch = useAppDispatch();
  const { requestsPerMinute } = useAppSelector(
    getClientModerationFormDataSelector,
  );

  const onCheckedChange = (checked: boolean) => {
    if (checked) {
      return dispatch(clientModerationActions.setRequestsPerMinute(10));
    }
    dispatch(clientModerationActions.setRequestsPerMinute());
  };

  const onChangeRequestsPerMinute = (value: string) => {
    const parsedValue = +value < 0 ? 1 : +value;
    dispatch(clientModerationActions.setRequestsPerMinute(parsedValue));
  };

  return (
    <ClientModerationForm
      option="requestsPerMinute"
      checked={requestsPerMinute !== undefined}
      onChange={onCheckedChange}
    >
      {requestsPerMinute !== undefined && (
        <>
          <Separator className="my-2" />
          <InputGroup label="Кол-во запросов в минуту">
            <NumericInput
              value={requestsPerMinute || 1}
              max={100_000}
              onChange={onChangeRequestsPerMinute}
            />
          </InputGroup>
        </>
      )}
    </ClientModerationForm>
  );
};
