import { NatsConnection } from 'nats.ws';
import { NatsDataProvider } from './NatsDataProvider';

export interface NatsDataDispatcherOptions<Data> {
  connection: NatsConnection;
  provider: NatsDataProvider<Data>;
}
