import {
  useFloating,
  useInteractions,
  useClick,
  useRole,
  useDismiss,
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager,
} from '@floating-ui/react-dom-interactions';
import { jsx } from '@theme-ui/core';
import React, { cloneElement, Fragment, useState } from 'react';
import { Box, BoxProps } from './Box';

export interface DialogProps extends BoxProps {
  open?: boolean;
  render: (props: { close: () => void }) => React.ReactNode;
  children: JSX.Element;
}

export const Dialog = ({ render, open, children }: DialogProps) => {
  // const [open, setOpen] = useState(passedOpen);
  // const { reference, floating, context } = useFloating({
  //   open,
  //   onOpenChange: setOpen,
  // });
  // const { getReferenceProps, getFloatingProps } = useInteractions([
  //   // useClick(context),
  //   useRole(context),
  //   useDismiss(context),
  // ]);
  return (
    <FloatingPortal>
      {open && (
        <FloatingOverlay
          lockScroll
          style={{
            display: 'grid',
            placeItems: 'center',
            backgroundColor: 'rgba(0,0,0,.7)',
          }}
        >
          <FloatingFocusManager context={context}>
            <Box {...getFloatingProps({ ref: floating })}>
              {render({ close: () => setOpen(false) })}
            </Box>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  );
};
