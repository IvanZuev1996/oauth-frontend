import { useState } from 'react';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';

import { getClientModerationFormDataSelector } from '../../../selectors/clientModerationSelectors';
import { ClientModerationForm } from '../../ClientModerationForm/ClientModerationForm';

export const GeoBlackListForm = () => {
  const dispatch = useAppDispatch();
  const { geoBlacklist } = useAppSelector(getClientModerationFormDataSelector);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <ClientModerationForm
      option="geoBlacklist"
      checked={Boolean(geoBlacklist)}
      onChange={setIsChecked}
    />
  );
};
