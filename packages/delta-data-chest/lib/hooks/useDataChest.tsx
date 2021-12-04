import { useCallback, useMemo, useRef, useState } from 'react';
import { merge } from 'restyler';
import {
  DataChest,
  DataChestOperator,
  DataChestOptions,
  DataChestSeeder,
  DataOperationMutatingResult,
  DataOperator,
  DataSubscription,
  OperatedData
} from '../models';

export const useDataChest = <
  Operator extends DataOperator<any>,
  Seeder extends DataChestSeeder<Operator>
>({
  initialData,
  operator,
  seeder
}: DataChestOptions<Operator, Seeder>): DataChest<Operator, Seeder> => {
  const activeSubscription = useRef<
    DataSubscription<OperatedData<Operator>> | undefined
  >(undefined);
  const [data, setData] = useState<OperatedData<Operator> | undefined>(
    initialData
  );
  const handleMutatingResult = useCallback(
    ({ data, patch }: DataOperationMutatingResult<OperatedData<Operator>>) => {
      if (data) {
        setData(data);
      } else if (patch) {
        setData(v => merge({}, v, patch));
      }
    },
    []
  );
  const subscribe = useCallback(
    async (
      subscription: DataSubscription<
        DataOperationMutatingResult<OperatedData<Operator>>
      >
    ) => {
      activeSubscription.current?.cancel();
      for await (const v of subscription) {
        handleMutatingResult(v);
      }
    },
    []
  );
  const chestOperator = useMemo(() => {
    return Object.entries(operator ?? {}).reduce(
      (p, [k, v]) => ({
        ...p,
        [k]: async (seed: any) => {
          const result = await v(seed ?? seeder?.[k]?.(data));
          if (!result) {
            return;
          }
          if (result.data || result.patch) {
            handleMutatingResult(result);
          }
          if (result.subscription) {
            subscribe(result.subscription);
          }
          return result;
        }
      }),
      {} as DataChestOperator<Operator, Seeder>
    );
  }, [operator, seeder]);
  return useMemo(
    () => ({
      data,
      setData,
      ...chestOperator
    }),
    [data, chestOperator]
  );
};
