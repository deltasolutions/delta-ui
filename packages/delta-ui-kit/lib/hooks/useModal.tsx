import { jsx } from '@theme-ui/core';
import { Modal, ModalProps } from '../components';
import { DialogOptions, DialogRenderFn, useDialog } from './useDialog';

export const useModal = <C extends unknown = never>(
  render: DialogRenderFn<C>,
  { deps, portal, onClose, ...modalProps }: DialogOptions & Partial<ModalProps>
) => {
  return useDialog<C>(
    ({ context, handleClose }) => {
      return render?.({
        context: context as C,
        handleClose,
        ...modalProps,
      });
    },
    {
      deps,
      portal,
      onClose,
    }
  );
};
