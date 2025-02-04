import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';

import { clientModerationActions } from '../../../model/slice/clientModerationSlice';
import { getClientModerationFormDataSelector } from '../../../selectors/clientModerationSelectors';
import { ClientModerationForm } from '../../ClientModerationForm/ClientModerationForm';

export const OnlyWorkingDaysForm = () => {
  const dispatch = useAppDispatch();
  const { workingDaysOnly } = useAppSelector(
    getClientModerationFormDataSelector,
  );

  const onCheckedChange = (checked: boolean) => {
    dispatch(clientModerationActions.setWorkingDaysOnly(checked));
  };

  return (
    <ClientModerationForm
      option="workingDaysOnly"
      checked={workingDaysOnly ?? false}
      onChange={onCheckedChange}
    />
  );
};
