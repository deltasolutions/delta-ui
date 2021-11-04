import { NatsConnection } from 'nats.ws';
import { DataOperation } from './DataOperation';

export interface NatsDataHandlerOptions<Data, Seed> {
  connection: NatsConnection;
  operations: {
    [operation: string]: string | DataOperation<Data, Seed>;
  };
  pack: (seed: Seed) => any;
  unpack: (raw: any) => Data;
}
