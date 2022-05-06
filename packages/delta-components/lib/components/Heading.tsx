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
        ...headingStyles[tag],
        margin: 0,
        padding: 0
      }}
      {...rest}
    />
  );
};

export const headingStyles = {
  h1: {
    fontSize: '26px',
    fontWeight: 600,
    color: 'text_base'
  },
  h2: {
    fontSize: '22px',
    fontWeight: 600,
    color: 'text_base'
  },
  h3: {
    fontSize: '18px',
    fontWeight: 600,
    color: 'text_base'
  },
  h4: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'text_base'
  },
  h5: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'text_base'
  },
  h6: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'text_base'
  }
};
