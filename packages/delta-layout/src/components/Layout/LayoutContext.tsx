import { createContext } from 'react';
import { LayoutContextValue } from '../../models';

export const LayoutContext = createContext<LayoutContextValue>(
  {} as any // FIXME
);
