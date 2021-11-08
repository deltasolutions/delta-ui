import { NatsConnection } from 'nats.ws';
import { DataChestSeeder } from './chests';
import { DataOperatorProvider, ProvidedDataOperator } from './operators';

export interface NatsContextValue {
  connection?: NatsConnection;
}

export interface NatsDataOperatorContext {
  connection?: NatsConnection;
}

export interface NatsDataOperatorOptions<
  Provider extends DataOperatorProvider<NatsDataOperatorContext>
> extends NatsDataOperatorContext {
  provider: Provider;
}

export interface NatsDataChestOptions<
  Provider extends DataOperatorProvider<NatsDataOperatorContext>,
  Seeder extends DataChestSeeder<ProvidedDataOperator<Provider>>
> {
  make?: (context: NatsDataOperatorContext) => ProvidedDataOperator<Provider>;
  provider?: Provider;
  seeder?: Seeder;
}
