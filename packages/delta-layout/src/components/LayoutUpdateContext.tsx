import { createContext } from 'react';
import { LayoutUpdateManager } from '../models';

const noop = () => {
  throw new Error('Not implemented');
};

export const LayoutUpdateContext = createContext<LayoutUpdateManager>({
  updates: {},
  update: noop,
  allow: noop,
  save: noop,
  cancel: noop,
  checkIfUpdating: noop
});
