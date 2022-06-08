import { System } from '../types';

export const system = new Proxy({} as System, {
  get() {
    throw new Error('System must be provided');
  },
});
