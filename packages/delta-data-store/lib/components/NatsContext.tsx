import { createContext } from 'react';
import { NatsContextValue } from '../models';

export const NatsContext = createContext<NatsContextValue>({});
