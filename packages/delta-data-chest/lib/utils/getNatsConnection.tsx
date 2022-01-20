import { ConnectionOptions, NatsConnection } from 'nats.ws';
import { hash } from 'restyler';

let defaultConnectionOptions: ConnectionOptions | undefined = undefined;

export const setDefaultNatsConnectionOptions = (options: ConnectionOptions) => {
  defaultConnectionOptions = options;
};

const connections = new Map<string, NatsConnection>();

export const getNatsConnection = async (options?: ConnectionOptions) => {
  if (!options) {
    options = defaultConnectionOptions;
  }
  if (!options) {
    throw new Error('Either options must be provided or default options set');
  }
  const id = hash(options);
  if (!connections.has(id)) {
    const { connect } = await import('nats.ws');
    const connection = await connect(options);
    connections.set(id, connection);
    connection.closed().finally(() => connections.delete(id));
  }
  return connections.get(id)!;
};
