import { NatsConnection } from 'nats.ws';
import { DataOperatorProvider } from './DataOperatorProvider';
import { NatsDataOperatorContext } from './NatsDataOperatorContext';

export interface NatsDataOperatorOptions<
  Data,
  Provider extends DataOperatorProvider<Data, NatsDataOperatorContext>
> {
  connection: NatsConnection;
  provider: Provider;
}
