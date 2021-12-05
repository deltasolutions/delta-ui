import { useCallback, useMemo, useRef, useState } from 'react';
import { merge } from 'restyler';
import {
  DataChest,
  DataOperationAsyncResult,
  DataOperationSyncResult,
  DataOperator,
  DataSubscription,
  OperatedData
} from '../models';

export const useDataChest = <Operator extends DataOperator<any>>(
  initialData:
    | OperatedData<Operator>
    | undefined
    | (() => OperatedData<Operator> | undefined),
  operator: Operator
): DataChest<Operator> => {
  const [data, setData] = useState<OperatedData<Operator> | undefined>(
    initialData
  );
  const activeSubscription = useRef<
    DataSubscription<OperatedData<Operator>> | undefined
  >(undefined);
  const handleOperationSyncResult = useCallback(
    ({ data, dataPatch }: DataOperationSyncResult<OperatedData<Operator>>) => {
      if (data) {
        setData(data);
      } else if (dataPatch) {
        setData(v => merge({}, v, dataPatch));
      }
    },
    []
  );
  const handleOperationAsyncResult = useCallback(
    async ({
      subscription
    }: DataOperationAsyncResult<OperatedData<Operator>>) => {
      if (!subscription) {
        return;
      }
      activeSubscription.current?.cancel();
      for await (const v of subscription) {
        handleOperationSyncResult(v);
      }
    },
    []
  );
  const chestOperator = useMemo(() => {
    return Object.entries(operator ?? {}).reduce(
      (p, [k, v]) => ({
        ...p,
        [k]: async (seed: any) => {
          const result = await v(seed);
          if (!result) {
            return;
          }
          handleOperationSyncResult(result);
          handleOperationAsyncResult(result);
          return result;
        }
      }),
      {} as Operator
    );
  }, [operator]);
  return useMemo(
    () => ({
      data,
      setData,
      ...chestOperator
    }),
    [data, chestOperator]
  );
};
