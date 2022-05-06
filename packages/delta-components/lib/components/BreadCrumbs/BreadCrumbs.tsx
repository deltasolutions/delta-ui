import { jsx } from '@theme-ui/core';
import {
  Children,
  cloneElement,
  HTMLAttributes,
  ReactElement,
  ReactNode
} from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { Box } from '../Box';

export interface BreadCrumbsProps extends HTMLAttributes<HTMLDivElement> {}

export const BreadCrumbs = ({ children, ...rest }: BreadCrumbsProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}
      {...rest}
    >
      {Children.map(children, (child: ReactElement<any, any>, index) =>
        cloneElement(child, {
          isActive: index === Children.count(children) - 1
        })
      )
        ?.reduce(
          (p, v, i) => [
            p,
            i > 0 ? (
              <FaAngleRight
                sx={{
                  whiteSpace: 'nowrap',
                  minHeight: '24px',
                  minWidth: '24px'
                }}
                key={i}
                size={24}
              />
            ) : null,
            v
          ],
          [] as ReactNode[]
        )
        .filter(Boolean)}
    </Box>
  );
};
