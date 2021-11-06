import { NatsConnection, ConnectionOptions } from 'nats.ws';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { hash } from 'restyler';
import { NatsContext } from './NatsContext';

export interface NatsProviderProps extends ConnectionOptions {
  children: ReactNode;
}

export const NatsProvider = ({ children, ...options }: NatsProviderProps) => {
  const [connection, setConnection] = useState<NatsConnection | undefined>(
    undefined
  );
  const update = useCallback(async () => {
    try {
      const { connect } = await import('nats.ws/lib/src/mod'); // FIXME
      const nc = await connect(options);
      setConnection(nc);
      console.log('Connected to NATS network');
      return () => {
        nc.close();
      };
    } catch (e) {
      console.warn('Failed to connect to NATS network', e);
      return;
    }
  }, [hash(options)]);
  useEffect(() => {
    update();
  }, []);
  const contextValue = useMemo(() => ({ connection }), [connection]);
  return (
    <NatsContext.Provider value={contextValue}>{children}</NatsContext.Provider>
  );
};
