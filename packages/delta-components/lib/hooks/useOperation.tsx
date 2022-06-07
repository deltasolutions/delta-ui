import { jsx } from '@theme-ui/core';
import { isValidElement, useCallback, Fragment, ReactNode } from 'react';
import { BasicQuestion } from '../components';
import { useLoader } from './useLoader';
import { NotificationOptions, useNotification } from './useNotification';
import { QuestionDescription, useQuestion } from './useQuestion';

export interface OperationOptions<OperationInput, OperationOutput> {
  deps: any[];
  loaderIds?: any[];
  getNotification?: <T extends boolean>(
    isOk: T,
    output: T extends true ? OperationOutput : Error
  ) => ReactNode | NotificationOptions;
  getQuestion?: (input?: OperationInput) => QuestionDescription;
}

export const useOperation = <OperationInput, OperationOutput>(
  fn: (input?: OperationInput) => Promise<OperationOutput>,
  {
    deps,
    getNotification,
    getQuestion,
    loaderIds,
  }: OperationOptions<OperationInput, OperationOutput>
) => {
  const [_, load] = useLoader(loaderIds);
  const openQuestion = useQuestion<QuestionDescription>(
    ({ context: description, ...rest }) =>
      description instanceof Function ? (
        description(rest)
      ) : (
        <BasicQuestion onClose={rest.handleClose} {...description!} />
      ),
    { deps: [] }
  );
  const openNotification = useNotification();
  const operation = useCallback(
    async (input?: OperationInput): Promise<void> => {
      const questionDescription = getQuestion?.(input);
      const shouldContinue = questionDescription
        ? await openQuestion(questionDescription)
        : true;
      if (!shouldContinue) {
        return undefined;
      }
      let isOk = true;
      let output: OperationOutput | undefined;
      let error: Error | undefined;
      try {
        output = await load(fn(input));
      } catch (e) {
        error = e;
        isOk = false;
      }
      const notification = getNotification?.(isOk, (error ?? output)!);
      if (notification) {
        const notificationOptions: NotificationOptions =
          typeof notification === 'object' &&
          !isValidElement(notification) &&
          !Array.isArray(notification) &&
          (notification as any).type !== Fragment
            ? (notification as NotificationOptions)
            : {
                color: isOk ? 'success' : 'error',
                render: () => notification,
              };
        openNotification(notificationOptions);
      }
      return undefined;
    },
    [openQuestion, openNotification, ...deps]
  );
  return operation;
};
