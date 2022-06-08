import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 1, ...rest }: HeadingProps, ref) => {
    const Tag = `h${level}` as const;
    return (
      <Tag
        ref={ref}
        sx={{
          margin: 0,
          color: 'inherit',
          fontSize: 7 - level,
          fontWeight: 600,
          padding: 0,
        }}
        {...rest}
      />
    );
  }
);
