import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
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
          maxWidth={maxWidth}
          minWidth={minWidth}
          width={width}
          onResize={onResize}
        >
          <Box
            sx={{
              height: '100vh',
              display: 'flex',
              width: '100%',
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

// '[data-simplebar]': {
//   position: 'relative',
//   flexDirection: 'column',
//   flexWrap: 'wrap',
//   justifyContent: 'flex-start',
//   alignContent: 'flex-start',
//   alignItems: 'flex-start',
// },
// '.simplebar-wrapper': {
//   overflow: 'hidden',
//   width: 'inherit',
//   height: 'inherit',
//   maxWidth: 'inherit',
//   maxHeight: 'inherit',
// },
// '.simplebar-mask': {
//   direction: 'inherit',
//   position: 'absolute',
//   overflow: 'hidden',
//   padding: '0',
//   margin: '0',
//   left: '0',
//   top: '0',
//   bottom: '0',
//   right: '0',
//   width: 'auto',
//   height: 'auto',
//   zIndex: 0,
// },
// '.simplebar-offset': {
//   direction: 'inherit',
//   boxSizing: 'inherit',
//   resize: 'none',
//   position: 'absolute',
//   top: '0',
//   left: '0',
//   bottom: '0',
//   right: '0',
//   padding: '0',
//   margin: '0',
//   WebkitOverflowScrolling: 'touch',
// },
// '.simplebar-content-wrapper': {
//   direction: 'inherit',
//   boxSizing: 'border-box',
//   position: 'relative',
//   display: 'block',
//   height: '100%',
//   width: 'auto',
//   maxWidth: '100%',
//   maxHeight: '100%',
//   scrollbarWidth: 'none',
//   msOverflowStyle: 'none',
// },
// '.simplebar-content-wrapper::-webkit-scrollbar,.simplebar-hide-scrollbar::-webkit-scrollbar':
//   {
//     width: '0',
//     height: '0',
//   },
// '.simplebar-content:after,.simplebar-content:before': {
//   content: "' '",
//   display: 'table',
// },
// '.simplebar-placeholder': {
//   maxHeight: '100%',
//   maxWidth: '100%',
//   width: '100%',
//   pointerEvents: 'none',
// },
// '.simplebar-height-auto-observer-wrapper': {
//   boxSizing: 'inherit',
//   height: '100%',
//   width: '100%',
//   maxWidth: '1px',
//   position: 'relative',
//   cssFloat: 'left',
//   maxHeight: '1px',
//   overflow: 'hidden',
//   zIndex: -1,
//   padding: '0',
//   margin: '0',
//   pointerEvents: 'none',
//   flexGrow: 'inherit',
//   flexShrink: 0,
//   flexBasis: '0',
// },
// '.simplebar-height-auto-observer': {
//   boxSizing: 'inherit',
//   display: 'block',
//   opacity: 0,
//   position: 'absolute',
//   top: '0',
//   left: '0',
//   height: '1000%',
//   width: '1000%',
//   minHeight: '1px',
//   minWidth: '1px',
//   overflow: 'hidden',
//   pointerEvents: 'none',
//   zIndex: -1,
// },
// '.simplebar-track': {
//   zIndex: 1,
//   position: 'absolute',
//   right: '0',
//   bottom: '0',
//   pointerEvents: 'none',
//   overflow: 'hidden',
// },
// '[data-simplebar].simplebar-dragging .simplebar-content': {
//   pointerEvents: 'none',
//   userSelect: 'none',
//   WebkitUserSelect: 'none',
// },
// '[data-simplebar].simplebar-dragging .simplebar-track': {
//   pointerEvents: 'all',
// },
// '.simplebar-scrollbar': {
//   position: 'absolute',
//   left: '0',
//   right: '0',
//   minHeight: '10px',
// },
// '.simplebar-scrollbar:before': {
//   position: 'absolute',
//   content: "''",
//   backgroundColor: 'outline',
//   borderRadius: '7px',
//   left: '2px',
//   right: '2px',
//   opacity: 0,
//   transition: 'opacity .2s .5s linear',
//   top: '2px',
//   bottom: '2px',
// },
// '.simplebar-scrollbar.simplebar-visible:before': {
//   opacity: 0.5,
//   transitionDelay: '0s',
//   transitionDuration: '0s',
// },
// '.simplebar-track.simplebar-vertical': {
//   top: '0',
//   width: '11px',
// },
// '.simplebar-track.simplebar-horizontal': {
//   left: '0',
//   height: '11px',
// },
// '.simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
//   right: 'auto',
//   left: '0',
//   top: '0',
//   bottom: '0',
//   minHeight: '0',
//   minWidth: '10px',
//   width: 'auto',
// },
// '[data-simplebar-direction=rtl] .simplebar-track.simplebar-vertical':
//   {
//     right: 'auto',
//     left: '0',
//   },
// '.simplebar-dummy-scrollbar-size': {
//   direction: 'rtl',
//   position: 'fixed',
//   opacity: 0,
//   visibility: 'hidden',
//   height: '500px',
//   width: '500px',
//   overflowY: 'hidden',
//   overflowX: 'scroll',
//   msOverflowStyle: 'scrollbar',
// },
// '.simplebar-dummy-scrollbar-size>div': {
//   width: '200%',
//   height: '200%',
//   margin: '10px 0',
// },
// '.simplebar-hide-scrollbar': {
//   position: 'fixed',
//   left: '0',
//   visibility: 'hidden',
//   overflowY: 'scroll',
//   scrollbarWidth: 'none',
//   msOverflowStyle: 'none',
// },
