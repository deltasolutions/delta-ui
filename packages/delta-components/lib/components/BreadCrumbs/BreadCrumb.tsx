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
        // TODO: Figure out how to remove nested styling.
        '& > a, button': {
          whiteSpace: 'nowrap',
          color: isActive ? 'text_base' : 'text_subdued',
          '&:hover, &:focus-visible, &:active': {
            color: 'text_base'
          }
        }
      }}
      {...rest}
    >
      {children}
    </span>
  );
};
