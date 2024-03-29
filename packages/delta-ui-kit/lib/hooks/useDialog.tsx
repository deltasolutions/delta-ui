import { jsx } from '@theme-ui/core';
import FocusTrap from 'focus-trap-react';
import {
  DependencyList,
  useCallback,
  useContext,
  useEffect,
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
  focusTrap?: boolean | FocusTrap.Props['focusTrapOptions'];
  onClose?: () => void;
}

export const useDialog = <C extends unknown = never>(
  render: DialogRenderFn<C>,
  options: DialogOptions
) => {
  const { floatingPortal } = useContext(SystemContext);
  const { deps, portal = floatingPortal, onClose, focusTrap } = options;
  const openDialog = usePortalled<HTMLDivElement, C>(
    ({ context, handleClose: handleImplicitClose }, overlayTransitionRef) => {
      const overlayRef = useRef<HTMLDivElement>(null);
      const mergedRef = useMemo(
        () => mergeRefs([overlayTransitionRef, overlayRef]),
        [overlayTransitionRef, overlayRef]
      );
      const handleClose = useCallback(() => {
        handleImplicitClose();
        onClose?.();
      }, []);
      useEffect(() => {
        const listener = e => {
          if (e.key === 'Escape') {
            handleClose();
          }
        };
        window.addEventListener('keydown', listener);
        return () => {
          window.removeEventListener('keydown', listener);
        };
      }, []);
      return (
        <FocusTrap
          active={focusTrap !== false}
          focusTrapOptions={{
            allowOutsideClick: true,
            escapeDeactivates: false,
            initialFocus: false,
            fallbackFocus: () => overlayRef.current ?? document.body,
            ...(typeof focusTrap === 'object' ? focusTrap : {}),
          }}
        >
          <Box
            ref={mergedRef}
            sx={{
              position: 'fixed',
              zIndex: 2000,
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              outline: 'none',
            }}
            tabIndex={-1}
            onMouseDown={e => {
              if (overlayRef.current === e.target) {
                handleClose();
              }
            }}
          >
            {render?.({ context, handleClose })}
          </Box>
        </FocusTrap>
      );
    },
    { deps: [onClose, ...deps], portal }
  );
  return openDialog;
};
