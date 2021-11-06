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

export interface NatsProviderProps {
  children: ReactNode;
  connectOptions: ConnectionOptions;
}

export const NatsProvider = ({
  children,
  connectOptions
}: NatsProviderProps) => {
  const [connection, setConnection] = useState<NatsConnection | undefined>(
    undefined
  );
  const update = useCallback(async () => {
    try {
      const { connect } = await import('nats.ws/lib/src/mod'); // FIXME
      const nc = await connect(connectOptions);
      setConnection(nc);
      console.log('Connected to NATS network');
      // const done = nc.closed();
      // const e = await done;
      // if (e) {
      //   console.warn('Error while disconnecting from NATS network', e);
      // }
      return () => {
        nc.close();
      };
    } catch (e) {
      console.warn('Failed to connect to NATS network', e);
      return;
    }
  }, [hash(connectOptions)]);
  useEffect(() => {
    update();
  }, []);
  const contextValue = useMemo(() => ({ connection }), [connection]);
  return (
    <NatsContext.Provider value={contextValue}>{children}</NatsContext.Provider>
  );
};
