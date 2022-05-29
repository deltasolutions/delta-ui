import { jsx } from '@theme-ui/core';
import {
  DependencyList,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';
import { Box, SystemContext } from '../components';
import { mergeRefs } from '../utils';
import { ImperativePortal } from './useImperativePortal';
import { PortalledProps, usePortalled } from './usePortalled';

export interface DialogProps<C extends unknown = never>
  extends PortalledProps<C> {}

export interface DialogRenderFn<C extends unknown = never> {
  (props: DialogProps<C>): JSX.Element;
}

export interface DialogOptions {
  deps: DependencyList;
  portal?: ImperativePortal;
  blurable?: boolean;
  onClose?: () => void;
}

export const useDialog = <C extends unknown = never>(
  render: DialogRenderFn<C>,
  options: DialogOptions
) => {
  const { floatingPortal } = useContext(SystemContext);
  const { deps, portal = floatingPortal, onClose, blurable } = options;
  const openDialog = usePortalled<HTMLDivElement, C>(
    ({ context, handleClose: handleImplicitClose }, overlayTransitionRef) => {
      const overlayRef = useRef<HTMLDivElement>(null);
      const mergedRef = useMemo(
        () => mergeRefs([overlayTransitionRef, overlayRef]),
        []
      );
      const handleClose = useCallback(() => {
        handleImplicitClose();
        onClose?.();
      }, []);
      return (
        <Box
          ref={mergedRef}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
          }}
          onClick={e => {
            if (overlayRef.current === e.target) {
              handleClose();
            }
          }}
        >
          {render?.({ context, handleClose })}
        </Box>
      );
    },
    { deps: [onClose, ...deps], portal }
  );
  return openDialog;
};
