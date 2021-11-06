import { NatsConnection } from 'nats.ws';
import { NatsDataProvider } from './NatsDataProvider';

export interface NatsDataOperatorOptions<Data> {
  connection: NatsConnection;
  provider: NatsDataProvider<Data>;
}
