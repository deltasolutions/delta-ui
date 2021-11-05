import { useCallback, useMemo } from 'react';
import {
  DataOperation,
  NatsDataHandler,
  NatsDataHandlerOptions
} from '../models';

export const createNatsDataHandler = <
  Data,
  Seed,
  Operations extends {
    [operation: string]: string | DataOperation<Data, Seed>;
  }
>({
  connection,
  operations,
  pack,
  unpack
}: NatsDataHandlerOptions<Data, Seed, Operations>): NatsDataHandler<
  Data,
  Seed,
  Operations
> => {
  const createRequestOperation = useCallback(
    (subject: string, shouldReturn = false) => {
      return async (seed: Seed) => {
        const packed = pack(seed);
        const response = await connection.request(subject, packed);
        if (!shouldReturn) {
          return;
        }
        const unpacked = unpack(response);
        return { data: unpacked };
      };
    },
    [connection]
  );
  return useMemo(
    () =>
      Object.entries(operations).reduce(
        (p, [k, v]) => ({ ...p, [k]: v }),
        {} as NatsDataHandler<Data, Seed, Operations>
      ),
    [connection, operations, pack, unpack]
  );
};

// const operations = {
//   fetch: 'A'
// };
// const h = createNatsDataHandler<number, number, typeof operations>({
//   connection: null as any,
//   operations,
//   pack: null as any,
//   unpack: null as any
// });

// h.fetch(1);
