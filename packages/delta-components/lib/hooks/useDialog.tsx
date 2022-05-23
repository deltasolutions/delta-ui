import { FloatingOverlay } from '@floating-ui/react-dom-interactions';
import { jsx } from '@theme-ui/core';
import {
  cloneElement,
  DependencyList,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';
import { SystemContext } from '../components';
import { ImperativePortal } from './useImperativePortal';
import {
  PortalledTransitionerProps,
  usePortalledTransition,
} from './usePortalledTransition';
import { useSharedRef } from './useSharedRef';
import { useTransition } from './useTransition';

export interface DialogRendererProps<C extends unknown = never>
  extends PortalledTransitionerProps<C> {}

export interface DialogRenderer<C extends unknown = never> {
  (props: DialogRendererProps<C>): JSX.Element;
}

export interface DialogOptions {
  deps: DependencyList;
  portal?: ImperativePortal;
  onClose?: () => void;
}

export const useDialog = <C extends unknown = never>(
  render: DialogRenderer<C>,
  options: DialogOptions
) => {
  const { floatingPortal } = useContext(SystemContext);
  const { deps, portal = floatingPortal, onClose, ...dialogProps } = options;
  const openDialog = usePortalledTransition<HTMLDivElement, C>(
    (
      {
        context,
        handleClose: handleImplicitClose,
        children: _,
        ...overlayTransitionProps
      },
      overlayTransitionRef
    ) => {
      const overlayRef = useRef<HTMLDivElement>(null);
      const sharedRef = useSharedRef(null, [overlayTransitionRef, overlayRef]);
      const dialogRef = useRef<HTMLDivElement>(null);
      const handleClose = useCallback(() => {
        handleImplicitClose();
        onClose?.();
      }, []);
      const dialogTransition = useTransition<HTMLDivElement>(
        (dialogTransitionProps, dialogTransitionRef) => {
          const sharedRef = useSharedRef(null, [
            dialogTransitionRef,
            dialogRef,
          ]);
          const content = useMemo(
            () =>
              render?.({ context, handleClose, ...dialogTransitionProps }) ??
              null,
            []
          );
          return content
            ? cloneElement(content, {
                ref: sharedRef,
                ...dialogProps,
                ...dialogTransitionProps,
              })
            : null;
        },
        {
          deps: [],
          isMounted: overlayTransitionProps.isVisible,
        }
      );
      return (
        <FloatingOverlay
          lockScroll
          ref={sharedRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            opacity: overlayTransitionProps.isVisible ? 1 : 0,
            transition: 'opacity 0.2s',
          }}
          onClick={e => {
            if (overlayRef.current === e.target) {
              handleClose();
            }
          }}
        >
          {dialogTransition}
        </FloatingOverlay>
      );
    },
    { deps: [onClose, ...deps], portal }
  );
  return openDialog;
};
