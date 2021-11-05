import { NatsConnection } from 'nats.ws';
import { DataOperation } from './DataOperation';

export interface NatsDataHandlerOptions<
  Data,
  Seed,
  Operations extends {
    [operation: string]: string | DataOperation<Data, Seed>;
  }
> {
  connection: NatsConnection;
  operations: Operations;
  pack: (seed: Seed) => any;
  unpack: (raw: any) => Data;
}
