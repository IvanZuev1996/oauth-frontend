import { FC } from 'react';

import { cn } from '@/shared/lib/utils/cn';
import { PropsWithClassName } from '@/shared/types/general/general';

export const PercentIcon: FC<PropsWithClassName> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('mb-[2px] inline', props.className)}
    >
      <path
        fill="#FDD821"
        stroke="#f61c3d"
        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      />
      <path strokeWidth="1.5" stroke="#f61c3d" d="m15 9-6 6" />
      <path strokeWidth="1.5" stroke="#f61c3d" d="M9 9h.01" />
      <path strokeWidth="1.5" stroke="#f61c3d" d="M15 15h.01" />
    </svg>
  );
};
