import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import SimpleBar from 'simplebar-react';
import { Box } from '../../Box';
import { ResizableBox, ResizableBoxProps } from '../../ResizableBox';

export interface LayoutSidebarProps extends ResizableBoxProps {}

export const LayoutSidebar = forwardRef<HTMLDivElement, LayoutSidebarProps>(
  (
    {
      children,
      onResize,
      width,
      maxWidth,
      minWidth,
      axis = ['e'],
      ...rest
    }: LayoutSidebarProps,
    ref
  ) => {
    return (
      <Box
        ref={ref}
        sx={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          backgroundColor: 'exterior',
          color: 'onExterior',
        }}
        {...rest}
      >
        <ResizableBox
          axis={axis}
          width={width}
          minWidth={minWidth}
          maxWidth={maxWidth}
          onResize={onResize}
        >
          <Box
            sx={{
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {children}
          </Box>
        </ResizableBox>
      </Box>
    );
  }
);
