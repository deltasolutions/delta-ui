import { createContext } from 'react';
import { NatsContextValue } from '../models';

export const NatsContext = createContext<NatsContextValue>({
  checkIfConnected: () => false,
  getConnection: () => {
    throw new Error('Context must be provided');
  }
});
