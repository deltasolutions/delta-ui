import { jsx } from '@theme-ui/core';
import { HTMLAttributes, ReactElement } from 'react';
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading = ({ level = 1, ...rest }: HeadingProps) => {
  const tag = `h${level}`;
  const Tag: any = tag;
  //TODO FIX any
  return (
    <Tag
      sx={{
        margin: 0,
        color: 'onSurfaceVariant',
        fontSize: 6 - level,
        fontWeight: 600,
        padding: 0
      }}
      {...rest}
    />
  );
};
