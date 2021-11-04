import { NatsConnection } from 'nats.ws';

export interface NatsContextValue {
  connection?: NatsConnection;
}
