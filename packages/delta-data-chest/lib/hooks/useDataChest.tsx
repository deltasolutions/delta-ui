import { useCallback, useMemo, useRef, useState } from 'react';
import {
  DataChest,
  DataChestOperator,
  DataChestOptions,
  DataChestSeeder,
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
  const subscribe = useCallback(
    async (subscription: DataSubscription<OperatedData<Operator>>) => {
      activeSubscription.current?.cancel();
      for await (const v of subscription) {
        setData(v);
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
          if (result.data) {
            setData(result.data);
          } else if (result.subscription) {
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
