import { useCallback, useMemo } from 'react';
import {
  NatsDataDispatcher,
  NatsDataDispatcherOptions,
  NatsDataProvider
} from '../models';

export const createNatsDataDispatcher = <
  Data,
  Provider extends NatsDataProvider<Data>
>({
  connection,
  provider
}: NatsDataDispatcherOptions<Data>): NatsDataDispatcher<Provider> => {
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
        {} as NatsDataDispatcher<Provider>
      ),
    [provider, createDataOperation]
  );
};

// const provider = {
//   fetch: (_, id: string) => null as any
// };
// const dispatcher = createNatsDataDispatcher<number, typeof provider>({
//   connection: null as any,
//   provider
// });
// dispatcher.fetch('');
