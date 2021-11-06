import { useMemo, useState } from 'react';
import {
  DataChest,
  DataChestOperator,
  DataChestOptions,
  DataChestSeeder,
  DataOperator
} from '../models';

export const useDataChest = <
  Data,
  Operator extends DataOperator<Data>,
  Seeder extends DataChestSeeder<Data, Operator>
>({
  operator,
  seeder,
  isLive
}: DataChestOptions<Data, Operator, Seeder>): DataChest<
  Data,
  Operator,
  Seeder
> => {
  const [data, setData] = useState<Data | undefined>(undefined);
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
      {} as DataChestOperator<Data, Operator, Seeder>
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
