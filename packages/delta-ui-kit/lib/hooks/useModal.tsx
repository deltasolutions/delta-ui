import { jsx } from '@theme-ui/core';
import { Modal, ModalProps } from '../components';
import { DialogOptions, DialogRenderFn, useDialog } from './useDialog';

export const useModal = <C extends unknown = never>(
  render: DialogRenderFn<C>,
  { deps, portal, onClose, ...modalProps }: DialogOptions & Partial<ModalProps>
) => {
  return useDialog<Partial<ModalProps>>(
    ({ context, handleClose }) => {
      const content = render?.({
        context: context as C,
        handleClose,
      });
      return <Modal {...modalProps}>{content}</Modal>;
    },
    {
      deps,
      portal,
      onClose,
    }
  );
};
