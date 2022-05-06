import { jsx } from '@theme-ui/core';
import { Children, cloneElement, HTMLAttributes, ReactElement } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { Box } from '../Box';
export interface BreadCrumbsProps extends HTMLAttributes<HTMLDivElement> {
  activeId: string;
}
export const BreadCrumbs = ({
  children,
  activeId,
  ...rest
}: BreadCrumbsProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}
      {...rest}
    >
      {Children.map(children, (child: ReactElement<any, any>, index) => {
        return cloneElement(child, {
          isActive: activeId === child.props.id
        });
      })?.reduce(
        (prev, curr, index) =>
          [
            prev,
            <FaAngleRight
              sx={{ whiteSpace: 'nowrap', minHeight: '24px', minWidth: '24px' }}
              key={index}
              size={24}
            />,
            curr
          ] as any
      )}
    </Box>
  );
};
