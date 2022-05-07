import { jsx } from '@theme-ui/core';
import { HTMLAttributes } from 'react';

export interface BreadCrumbProps extends HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
}

export const BreadCrumb = ({
  children,
  isActive,
  ...rest
}: BreadCrumbProps) => {
  return (
    <span
      sx={{
        '& > a, button': {
          whiteSpace: 'nowrap',
          color: isActive ? 'onBackgroundAccent' : 'inherit',
          '&:hover, &:focus-visible, &:active': {
            color: 'onBackgroundAccent'
          }
        }
      }}
      {...rest}
    >
      {children}
    </span>
  );
};
