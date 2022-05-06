import {
  useFloating,
  useInteractions,
  useClick,
  useRole,
  useDismiss,
  useId,
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager
} from '@floating-ui/react-dom-interactions';
import { jsx } from '@theme-ui/core';
import React, { cloneElement, Fragment, useState } from 'react';
import { Box, BoxProps } from './Box';
export interface DialogProps extends BoxProps {
  open?: boolean;
  render: (props: { close: () => void }) => React.ReactNode;
  children: JSX.Element;
}

export const Dialog = ({
  render,
  open: passedOpen = false,
  children
}: DialogProps) => {
  const [open, setOpen] = useState(passedOpen);

  const { reference, floating, context } = useFloating({
    open,
    onOpenChange: setOpen
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context)
  ]);

  return (
    <Fragment>
      {cloneElement(
        children,
        getReferenceProps({ ref: reference, ...children.props })
      )}
      <FloatingPortal>
        {open && (
          <FloatingOverlay
            lockScroll
            style={{
              display: 'grid',
              placeItems: 'center',
              background: 'rgba(0,0,0,0.7)'
            }}
          >
            <FloatingFocusManager context={context}>
              <Box
                {...getFloatingProps({
                  ref: floating
                })}
              >
                {render({
                  close: () => setOpen(false)
                })}
              </Box>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </Fragment>
  );
};
