import { jsx } from '@theme-ui/core';
import {
  isValidElement,
  useCallback,
  Fragment,
  ReactNode,
  ReactElement,
  useState,
} from 'react';
import { Alert, AlertProps, BasicQuestion } from '../components';
import { useLoader } from './useLoader';
import { NotificationOptions, useNotification } from './useNotification';
import { QuestionDescription, useQuestion } from './useQuestion';

export interface OperationOptions<OperationInput, OperationOutput> {
  deps: any[];
  loaderIds?: any[];
  getQuestion?: (input?: OperationInput) => QuestionDescription;
  getNotification?: <T extends boolean>(
    isOk: T,
    output: T extends true ? OperationOutput : Error
  ) => ReactNode | NotificationOptions;
  getAlert?: <T extends boolean>(
    isOk: T,
    output: T extends true ? OperationOutput : Error
  ) => ReactNode | AlertProps;
}

export const useOperation = <OperationInput, OperationOutput>(
  fn: (input?: OperationInput) => Promise<OperationOutput>,
  {
    deps,
    loaderIds,
    getQuestion,
    getNotification,
    getAlert,
  }: OperationOptions<OperationInput, OperationOutput>
) => {
  const [alerts, setAlerts] = useState<ReactElement<AlertProps>[]>([]);
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
        openNotification(
          isPlainObject(notification)
            ? (notification as NotificationOptions)
            : {
                color: isOk ? 'success' : 'error',
                duration: 5000,
                render: () => notification as ReactNode,
              }
        );
      }
      const alert = getAlert?.(isOk, (error ?? output)!);
      if (alert) {
        const props = (
          isPlainObject(alert)
            ? alert
            : {
                color: isOk ? 'info' : 'error',
                children: alert,
              }
        ) as AlertProps;
        const reactElement = (
          <Alert
            key={Math.random().toString().slice(-8)}
            onClose={() => {
              setAlerts(prior => prior.filter(v => v !== reactElement));
            }}
            {...props}
          />
        );
        setAlerts(prior => [...prior, reactElement]);
      }
      return undefined;
    },
    [openQuestion, openNotification, ...deps]
  );
  return [operation, alerts] as const;
};

const isPlainObject = (maybePlain: any) => {
  return (
    typeof maybePlain === 'object' &&
    !isValidElement(maybePlain) &&
    !Array.isArray(maybePlain) &&
    (maybePlain as any).type !== Fragment
  );
};
