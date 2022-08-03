import { jsx } from '@theme-ui/core';
import { DependencyList, useCallback } from 'react';
import { ForwardRefCRF, useForwardRef } from './useForwardRef';
import { ImperativePortal } from './useImperativePortal';

export interface PortalledProps<C = never> {
  handleClose: () => void;
  context?: C;
}

export type PortalledCRF<T, C = never> = ForwardRefCRF<T, PortalledProps<C>>;

export interface PortalledOptions {
  deps: DependencyList;
  portal: ImperativePortal;
}

export const usePortalled = <T extends HTMLElement, C = never>(
  crf: PortalledCRF<T, C>,
  { deps, portal: { push, remove } }: PortalledOptions
) => {
  const Component = useForwardRef(crf, deps);
  const open = useCallback(
    (context?: C) => {
      const key = Math.random().toString().slice(-8);
      const handleClose = () => remove(child);
      const child = (
        <Component key={key} context={context} handleClose={handleClose} />
      );
      push(child);
      return handleClose;
    },
    [push, remove, ...deps]
  );
  return open;
};
