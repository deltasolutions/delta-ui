import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes, ReactElement } from 'react';
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading = forwardRef<HTMLHeadElement, HeadingProps>(
  ({ level = 1, ...rest }: HeadingProps, ref) => {
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
        ref={ref}
        {...rest}
      />
    );
  }
);
