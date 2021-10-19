import { createContext } from 'react';
import { LayoutEditManager } from '../models';

const noop = () => {
  throw new Error('Not implemented');
};

export const LayoutEditContext = createContext<LayoutEditManager>({
  updates: {},
  edit: noop,
  save: noop,
  cancel: noop
});
