import { useMemo } from 'react';
import {
  DataOperatorProvider,
  NatsDataOperatorContext,
  ProvidedDataOperator
} from '../models';
import { useDataChest } from './useDataChest';
import { useNats } from './useNats';

export const useNatsDataChest = <
  Provider extends DataOperatorProvider<NatsDataOperatorContext>
>(
  makeOperator: (
    context: NatsDataOperatorContext
  ) => ProvidedDataOperator<Provider>
) => {
  const { connection } = useNats();
  const operator = useMemo(() => makeOperator({ connection }), [connection]);
  const seeder = useMemo(() => ({}), []);
  return useDataChest({ operator, seeder });
};
