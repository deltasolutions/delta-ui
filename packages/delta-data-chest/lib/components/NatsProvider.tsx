import { NatsConnection, ConnectionOptions } from 'nats.ws';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from 'react';
import { NatsContext } from './NatsContext';

export interface NatsProviderProps extends ConnectionOptions {
  children: ReactNode;
}

export const NatsProvider = ({ children, ...options }: NatsProviderProps) => {
  const connection = useRef<NatsConnection | undefined>(undefined);
  const checkIfConnected = useCallback(() => !!connection.current, []);
  const getConnection = useCallback(async () => {
    if (!connection.current) {
      const { connect } = await import('nats.ws');
      connection.current = await connect(options);
    }
    return connection.current;
  }, [options]);
  useEffect(() => {
    return () => {
      connection.current?.close();
    };
  }, []);
  const contextValue = useMemo(
    () => ({ checkIfConnected, getConnection }),
    [checkIfConnected, getConnection]
  );
  return (
    <NatsContext.Provider value={contextValue}>{children}</NatsContext.Provider>
  );
};
