import { useState } from 'react';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';

import { getClientModerationFormDataSelector } from '../../../selectors/clientModerationSelectors';
import { ClientModerationForm } from '../../ClientModerationForm/ClientModerationForm';

export const IPWhiteListForm = () => {
  const dispatch = useAppDispatch();
  const { ipWhitelist } = useAppSelector(getClientModerationFormDataSelector);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <ClientModerationForm
      option="ipWhitelist"
      checked={Boolean(ipWhitelist)}
      onChange={setIsChecked}
    />
  );
};
