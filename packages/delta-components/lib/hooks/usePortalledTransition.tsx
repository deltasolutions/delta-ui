import { jsx } from '@theme-ui/core';
import {
  DependencyList,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useForwardRef } from './useForwardRef';
import { ImperativePortal } from './useImperativePortal';
import { PortalledProps, usePortalled } from './usePortalled';
import { TransitionCRF, TransitionProps, useTransition } from './useTransition';
import { useUpdateEffect } from './useUpdateEffect';

export type PortalledTransitionProps<C = never> = PortalledProps<C> &
  TransitionProps;

export type PortalledTransitionCRF<T, C = never> = TransitionCRF<
  T,
  PortalledTransitionProps<C>
>;

export interface PortalledTransitionOptions {
  deps: DependencyList;
  portal: ImperativePortal;
}

export const usePortalledTransition = <T extends HTMLElement, C = never>(
  crf: PortalledTransitionCRF<T, C>,
  { deps, portal }: PortalledTransitionOptions
) => {
  const handleUnmountFns = useMemo(() => new WeakMap<() => void>(), []);
  const Component = useForwardRef(crf, deps);
  const open = usePortalled<T, C>(
    forwardRef(({ context, handleClose }) => {
      const [isMounted, setIsMounted] = useState(false);
      const handleUnmount = useCallback(() => setIsMounted(false), []);
      handleUnmountFns.set(handleClose, handleUnmount);
      const transition = useTransition<T>(
        (props, ref) => (
          <Component
            ref={ref}
            context={context}
            handleClose={handleUnmount}
            {...props}
          />
        ),
        { deps: [], isMounted }
      );
      useEffect(() => {
        setIsMounted(true);
      }, []);
      useUpdateEffect(() => {
        if (!transition) {
          handleClose();
        }
      }, [transition]);
      return transition;
    }),
    {
      deps,
      portal,
    }
  );
  const openTransition = useCallback(
    (context?: C) => {
      const close = open(context);
      return () => {
        const fn = handleUnmountFns.get(close) ?? close;
        fn();
      };
    },
    [...deps]
  );
  return openTransition;
};
