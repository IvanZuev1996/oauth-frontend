import Image from 'next/image';
import React from 'react';

type Props = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  className?: string;
};
export const AppImage: React.FC<Props> = (props) => {
  return (
    <Image
      draggable={false}
      src={props.src}
      width={props.width}
      height={props.height}
      alt={props.alt || ''}
      className={props.className}
    />
  );
};
