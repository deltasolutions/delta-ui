import { jsx } from '@theme-ui/core';
import { Fragment, ReactNode, useCallback, useRef } from 'react';
import {
  Button,
  Question,
  QuestionBody,
  QuestionFooter,
  QuestionHeader,
  QuestionProps,
} from '../components';
import { DialogOptions, DialogProps, useDialog } from './useDialog';

export interface QuestionRendererProps<C>
  extends Omit<DialogProps<C>, 'handleClose'> {
  handleClose: (v: boolean) => void;
}

export interface QuestionRenderer<C> {
  (props: QuestionRendererProps<C>): JSX.Element;
}

export type QuestionDescription<C = never> =
  | {
      content: ReactNode;
      heading: ReactNode;
      okText?: string;
      cancelText?: string;
    }
  | QuestionRenderer<C>;

export const useQuestion = <C extends unknown = never>(
  description: QuestionDescription<C>,
  {
    deps,
    portal,
    onClose,
    ...questionProps
  }: DialogOptions & Partial<QuestionProps>
) => {
  const handleQuestionClose = useRef<undefined | ((v: boolean) => void)>();
  const openQuestion = useDialog<C>(
    ({ context, handleClose: handleSilentClose, ...transitionProps }) => {
      const handleClose = (v: boolean) => {
        handleQuestionClose.current?.(v);
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
            <QuestionHeader>{description.heading}</QuestionHeader>
            <QuestionBody>{description.content}</QuestionBody>
            <QuestionFooter>
              {/* TODO: Translate default text. */}
              <Button variant="text" onClick={() => handleClose(false)}>
                {description.cancelText ?? 'Cancel'}
              </Button>
              <Button variant="contained" onClick={() => handleClose(true)}>
                {description.okText ?? 'OK'}
              </Button>
            </QuestionFooter>
          </Fragment>
        );
      return (
        <Question {...questionProps} {...transitionProps}>
          {content}
        </Question>
      );
    },
    {
      deps,
      portal,
      onClose: () => {
        handleQuestionClose.current?.(false);
        onClose?.();
      },
    }
  );
  return useCallback(
    (context?: C) => {
      return new Promise<boolean>(resolve => {
        const close = openQuestion(context);
        handleQuestionClose.current = (v: boolean) => {
          resolve(v);
          close();
          handleQuestionClose.current = undefined;
        };
        return handleQuestionClose.current;
      });
    },
    [openQuestion]
  );
};
