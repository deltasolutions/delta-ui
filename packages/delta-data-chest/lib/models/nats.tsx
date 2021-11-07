import { NatsConnection } from 'nats.ws';
import { DataOperatorProvider } from './operators';

export interface NatsContextValue {
  connection?: NatsConnection;
}

export interface NatsDataOperatorContext {
  connection?: NatsConnection;
}

export interface NatsDataOperatorOptions<
  Provider extends DataOperatorProvider<NatsDataOperatorContext>
> {
  connection?: NatsConnection;
  provider: Provider;
}