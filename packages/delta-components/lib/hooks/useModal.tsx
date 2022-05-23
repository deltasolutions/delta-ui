import { FloatingOverlay } from '@floating-ui/react-dom-interactions';
import { jsx } from '@theme-ui/core';
import {
  DependencyList,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';
import { Modal, ModalProps, SystemContext } from '../components';
import { ImperativePortal } from './useImperativePortal';
import {
  PortalledTransitionerProps,
  usePortalledTransition,
} from './usePortalledTransition';
import { useSharedRef } from './useSharedRef';
import { useTransition } from './useTransition';

export interface ModalRendererProps<C = never>
  extends PortalledTransitionerProps<C> {}

export interface ModalOptions extends Omit<ModalProps, 'children'> {
  deps: DependencyList;
  portal?: ImperativePortal;
  onClose?: () => void;
}

export const useModal = <C extends unknown = never>(
  render: (props: ModalRendererProps<C>) => ReactNode,
  options: ModalOptions
) => {
  const { floatingPortal } = useContext(SystemContext);
  const { deps, portal = floatingPortal, onClose, ...modalProps } = options;
  const openModal = usePortalledTransition<HTMLDivElement, C>(
    (
      { context, handleClose: handleImplicitClose, ...overlayTransitionProps },
      overlayTransitionRef
    ) => {
      const overlayRef = useRef<HTMLDivElement>(null);
      const sharedRef = useSharedRef(null, [overlayTransitionRef, overlayRef]);
      const modalRef = useRef<HTMLDivElement>(null);
      const handleClose = useCallback(() => {
        handleImplicitClose();
        onClose?.();
      }, []);
      const modalTransition = useTransition<HTMLDivElement>(
        (modalTransitionProps, modalTransitionRef) => {
          const sharedRef = useSharedRef(null, [modalTransitionRef, modalRef]);
          const content = useMemo(
            () =>
              render?.({ context, handleClose, ...modalTransitionProps }) ??
              null,
            []
          );
          return (
            <Modal ref={sharedRef} {...modalProps} {...modalTransitionProps}>
              {content}
            </Modal>
          );
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
          {modalTransition}
        </FloatingOverlay>
      );
    },
    { deps: [onClose, ...deps], portal }
  );
  return openModal;
};
