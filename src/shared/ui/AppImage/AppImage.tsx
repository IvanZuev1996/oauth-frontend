import Image from 'next/image';
import React from 'react';

import { backendUrl } from '@/shared/const/system';

type Props = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  customUrl?: string;
  className?: string;
};

export const AppImage: React.FC<Props> = (props) => {
  const src = props.customUrl ? props.src : `${backendUrl}${props.src}`;

  return (
    <Image
      draggable={false}
      src={src}
      width={props.width}
      height={props.height}
      alt={props.alt || ''}
      className={props.className}
    />
  );
};
