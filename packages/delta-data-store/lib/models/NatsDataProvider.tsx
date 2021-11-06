import { NatsConnection } from 'nats.ws';
import { DataOperationResult } from './DataOperation';

export interface NatsDataProviderOptions {
  connection: NatsConnection;
}

export interface NatsDataProvider<Data> {
  [operation: string]: (
    options: NatsDataProviderOptions,
    seed: any
  ) => Promise<DataOperationResult<Data> | void>;
}
