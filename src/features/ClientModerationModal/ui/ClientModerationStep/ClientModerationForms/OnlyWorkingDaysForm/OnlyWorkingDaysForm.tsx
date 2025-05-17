import { ClientScopeLimit } from '@/entities/Client';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';

import { getClientModerationFormDataSelector } from '../../../../model/selectors/clientModerationSelectors';
import { clientModerationActions } from '../../../../model/slice/clientModerationSlice';

export const OnlyWorkingDaysForm = () => {
  const dispatch = useAppDispatch();
  const { workingDaysOnly } = useAppSelector(
    getClientModerationFormDataSelector,
  );

  const onCheckedChange = (checked: boolean) => {
    dispatch(clientModerationActions.setWorkingDaysOnly(checked));
  };

  return (
    <ClientScopeLimit
      option="workingDaysOnly"
      checked={workingDaysOnly ?? false}
      onChange={onCheckedChange}
    />
  );
};
