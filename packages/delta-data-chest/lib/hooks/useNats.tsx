import { useContext } from 'react';
import { NatsContext } from '../components';

export const useNats = () => useContext(NatsContext);
