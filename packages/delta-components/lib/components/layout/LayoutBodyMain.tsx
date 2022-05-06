import { jsx } from '@theme-ui/core';
import { Fragment, HTMLAttributes } from 'react';
import { LAYOUT_BODY_PADDING } from '../../variables';

export interface LayoutBodyMainProps extends HTMLAttributes<HTMLDivElement> {}
export const LayoutBodyMain = ({ children, ...rest }: LayoutBodyMainProps) => {
  return (
    <div sx={{ width: '100%', paddingX: `${LAYOUT_BODY_PADDING}px` }} {...rest}>
      {children}
    </div>
  );
};
