import { NatsConnection } from 'nats.ws';
import { DataOperatorProvider } from './operators';

export interface NatsContextValue {
  connection?: NatsConnection;
}

export interface NatsDataOperatorContext {
  connection: NatsConnection;
}

export interface NatsDataOperatorOptions<
  Data,
  Provider extends DataOperatorProvider<Data, NatsDataOperatorContext>
> {
  connection: NatsConnection;
  provider: Provider;
}
