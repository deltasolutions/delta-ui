import { jsx } from '@theme-ui/core';
import { Children, ReactElement, ReactNode } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { Box, BoxProps } from '../containers';

export interface BreadcrumbsProps extends BoxProps {}

export const Breadcrumbs = ({ children, ...rest }: BreadcrumbsProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        '& > *': {
          color: 'onBackground',
        },
      }}
      {...rest}
    >
      {(Children.toArray(children) as ReactElement[])
        ?.reduce(
          (p, v, i) => [
            ...p,
            i > 0 ? (
              <FaAngleRight
                sx={{
                  whiteSpace: 'nowrap',
                  width: '1.1em',
                  height: '1.1em',
                }}
                key={i}
                size={24}
              />
            ) : null,
            v,
          ],
          [] as ReactNode[]
        )
        .filter(Boolean)}
    </Box>
  );
};
