import { useMemo } from 'react';
import {
  DataChestSeeder,
  DataOperatorProvider,
  NatsDataChestOptions,
  NatsDataOperatorContext,
  ProvidedDataOperator
} from '../models';
import { makeNatsDataOperator } from '../utils';
import { useDataChest } from './useDataChest';
import { useNats } from './useNats';

export const useNatsDataChest = <
  Provider extends DataOperatorProvider<NatsDataOperatorContext>,
  Seeder extends DataChestSeeder<ProvidedDataOperator<Provider>>
>({
  initialData,
  make,
  provider,
  seeder
}: NatsDataChestOptions<Provider, Seeder>) => {
  const { getConnection } = useNats();
  const operator = useMemo(() => {
    if (!make && !provider) {
      throw new Error('Either `make` or `provider` must be given');
    }
    return make
      ? make({ getConnection })
      : makeNatsDataOperator({ getConnection, provider: provider! });
  }, [getConnection]);
  return useDataChest({ initialData, operator, seeder });
};
