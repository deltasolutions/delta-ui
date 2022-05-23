import { jsx } from '@theme-ui/core';
import { Modal, ModalProps } from '../components';
import { DialogOptions, DialogRenderer, useDialog } from './useDialog';

export const useModal = <C extends unknown = never>(
  render: DialogRenderer<C>,
  { deps, portal, onClose, ...modalProps }: DialogOptions & Partial<ModalProps>
) => {
  return useDialog<Partial<ModalProps>>(
    ({ context, handleClose, ...transitionProps }) => {
      const content = render?.({
        context: context as C,
        handleClose,
        ...transitionProps,
      });
      return (
        <Modal {...modalProps} {...transitionProps}>
          {content}
        </Modal>
      );
    },
    {
      deps,
      portal,
      onClose,
    }
  );
};