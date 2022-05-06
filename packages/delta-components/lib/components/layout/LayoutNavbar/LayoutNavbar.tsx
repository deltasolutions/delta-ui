import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import SimpleBar from 'simplebar-react';
import { ResizableBox, ResizableBoxProps } from '../../ResizableBox';

export interface LayoutNavbarProps extends ResizableBoxProps {}

export const LayoutNavbar = forwardRef<HTMLDivElement, LayoutNavbarProps>(
  (
    {
      children,
      onResize,
      width,
      maxWidth,
      minWidth,
      axis = ['e'],
      ...rest
    }: LayoutNavbarProps,
    ref
  ) => {
    return (
      <nav
        {...rest}
        sx={{
          display: 'flex',
          position: 'sticky',
          height: '100vh',
          top: 0,
          backgroundColor: 'background_press'
        }}
      >
        <ResizableBox
          minWidth={minWidth}
          onResize={onResize}
          axis={axis}
          width={width}
          maxWidth={maxWidth}
        >
          <SimpleBar
            sx={{ overflowY: 'auto', paddingRight: '11px', height: '100%' }}
          >
            {children}
          </SimpleBar>
        </ResizableBox>
      </nav>
    );
  }
);
