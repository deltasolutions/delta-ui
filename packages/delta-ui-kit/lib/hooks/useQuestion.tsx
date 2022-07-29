import { jsx } from '@theme-ui/core';
import { ReactNode, useCallback, useRef } from 'react';
import { BasicQuestion, Question, QuestionProps } from '../components';
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
      content?: ReactNode;
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
  const hasCustomDescription = description instanceof Function;
  const questionRef = useRef<HTMLDivElement>(null);
  const openQuestion = useDialog<C>(
    ({ context, handleClose: handleImplicitClose }) => {
      const handleClose = (v: boolean) => {
        handleQuestionClose.current?.(v);
        handleImplicitClose();
      };
      const content = hasCustomDescription ? (
        description({
          context: context as C,
          handleClose,
        })
      ) : (
        <BasicQuestion onClose={handleClose} {...description} />
      );
      return (
        <Question ref={questionRef} {...questionProps}>
          {content}
        </Question>
      );
    },
    {
      deps,
      portal,
      focusTrap: {
        initialFocus: () => {
          const buttons = Array.from(
            questionRef.current?.querySelectorAll('button') ?? []
          );
          return buttons[buttons.length - 1];
        },
      },
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
