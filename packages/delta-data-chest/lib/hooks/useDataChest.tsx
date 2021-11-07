import { useMemo, useState } from 'react';
import {
  DataChest,
  DataChestOperator,
  DataChestOptions,
  DataChestSeeder,
  DataOperator,
  OperatedData
} from '../models';

export const useDataChest = <
  Operator extends DataOperator<any>,
  Seeder extends DataChestSeeder<Operator>
>({
  operator,
  seeder,
  isLive
}: DataChestOptions<Operator, Seeder>): DataChest<Operator, Seeder> => {
  const [data, setData] = useState<OperatedData<Operator> | undefined>(
    undefined
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
            // for await (const data of result.subscription) {
            //   // ...
            // }
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
