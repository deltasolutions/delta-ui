import { NatsConnection } from 'nats.ws';

export interface NatsDataOperatorContext {
  connection: NatsConnection;
}
