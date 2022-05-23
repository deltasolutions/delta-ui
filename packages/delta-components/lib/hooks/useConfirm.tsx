import { jsx } from '@theme-ui/core';
import { Fragment, ReactNode, useCallback, useRef } from 'react';
import {
  Button,
  Confirm,
  ConfirmBody,
  ConfirmFooter,
  ConfirmHeader,
  ConfirmProps,
} from '../components';
import { DialogOptions, DialogRendererProps, useDialog } from './useDialog';

export interface ConfirmRendererProps<C>
  extends Omit<DialogRendererProps<C>, 'handleClose'> {
  handleClose: (v: boolean) => void;
}

export interface ConfirmRenderer<C> {
  (props: ConfirmRendererProps<C>): JSX.Element;
}

export type ConfirmDescription<C = never> =
  | {
      content: ReactNode;
      heading: ReactNode;
      okText?: string;
      cancelText?: string;
    }
  | ConfirmRenderer<C>;

export const useConfirm = <C extends unknown = never>(
  description: ConfirmDescription<C>,
  {
    deps,
    portal,
    onClose,
    ...confirmProps
  }: DialogOptions & Partial<ConfirmProps>
) => {
  const handleConfirmClose = useRef<undefined | ((v: boolean) => void)>();
  const openConfirm = useDialog<C>(
    ({ context, handleClose: handleSilentClose, ...transitionProps }) => {
      const handleClose = (v: boolean) => {
        handleConfirmClose.current?.(v);
        handleSilentClose();
      };
      const content =
        description instanceof Function ? (
          description({
            context: context as C,
            handleClose,
            ...transitionProps,
          })
        ) : (
          <Fragment>
            <ConfirmHeader>{description.heading}</ConfirmHeader>
            <ConfirmBody>{description.content}</ConfirmBody>
            <ConfirmFooter>
              {/* TODO: Translate default text. */}
              <Button variant="text" onClick={() => handleClose(false)}>
                {description.cancelText ?? 'Cancel'}
              </Button>
              <Button variant="contained" onClick={() => handleClose(true)}>
                {description.okText ?? 'OK'}
              </Button>
            </ConfirmFooter>
          </Fragment>
        );
      return (
        <Confirm {...confirmProps} {...transitionProps}>
          {content}
        </Confirm>
      );
    },
    {
      deps,
      portal,
      onClose: () => {
        handleConfirmClose.current?.(false);
        onClose?.();
      },
    }
  );
  return useCallback(
    (context?: C) => {
      return new Promise<boolean>(resolve => {
        const close = openConfirm(context);
        handleConfirmClose.current = (v: boolean) => {
          resolve(v);
          close();
          handleConfirmClose.current = undefined;
        };
        return handleConfirmClose.current;
      });
    },
    [openConfirm]
  );
};
