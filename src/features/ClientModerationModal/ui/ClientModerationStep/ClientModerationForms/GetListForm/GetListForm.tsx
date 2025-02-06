import { FC, useState } from 'react';

import { ClientScopeLimit } from '@/entities/Client';

type Props = {
  geoListType: 'black' | 'white';
};

export const GetListForm: FC<Props> = ({ geoListType }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <ClientScopeLimit
      option={geoListType === 'black' ? 'geoBlacklist' : 'geoWhitelist'}
      checked={isChecked}
      onChange={setIsChecked}
      className="pointer-events-none select-none opacity-50"
    />
  );
};
