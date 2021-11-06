import { useCallback, useMemo } from 'react';
import {
  NatsDataOperator,
  NatsDataOperatorOptions,
  NatsDataProvider
} from '../models';

export const createNatsDataOperator = <
  Data,
  Provider extends NatsDataProvider<Data>
>({
  connection,
  provider
}: NatsDataOperatorOptions<Data>): NatsDataOperator<Provider> => {
  const createDataOperation = useCallback(
    (fn: Provider[string]) => (seed: any) => fn({ connection }, seed),
    [connection]
  );
  return useMemo(
    () =>
      Object.entries(provider).reduce(
        (p, [k, v]) => ({
          ...p,
          [k]: createDataOperation(v as any)
        }),
        {} as NatsDataOperator<Provider>
      ),
    [provider, createDataOperation]
  );
};

// const provider = {
//   fetch: (_, id: string) => null as any
// };
// const operator = createNatsDataOperator<number, typeof provider>({
//   connection: null as any,
//   provider
// });
// operator.fetch('');
