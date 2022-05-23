import { jsx } from '@theme-ui/core';
import {
  createRef,
  DependencyList,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { useForwardRef } from './useForwardRef';
import { ImperativePortal } from './useImperativePortal';
import {
  Transitioner,
  TransitionerProps,
  useTransition,
} from './useTransition';
import { useUpdateEffect } from './useUpdateEffect';

interface WrapProps<C> {
  onUnmount: () => void;
  context?: C;
}

interface WrapHandlers {
  handleClose: () => void;
}

export interface PortalledTransitionerProps<C = never>
  extends TransitionerProps {
  handleClose: () => void;
  context?: C;
}

export type PortalledTransitioner<T, C = never> = Transitioner<
  T,
  PortalledTransitionerProps<C>
>;

export interface PortalledTransitionOptions {
  deps: DependencyList;
  portal: ImperativePortal;
}

export const usePortalledTransition = <T extends HTMLElement, C = never>(
  transitioner: PortalledTransitioner<T, C>,
  { deps, portal: { push, remove } }: PortalledTransitionOptions
) => {
  const Component = useForwardRef(transitioner, deps);
  const Wrap = useMemo(
    () =>
      forwardRef<WrapHandlers, WrapProps<C>>(({ onUnmount, context }, ref) => {
        const [isMounted, setIsMounted] = useState(false);
        const handleClose = useCallback(() => setIsMounted(false), []);
        const transition = useTransition<T>(
          (props, ref) => (
            <Component
              ref={ref}
              context={context}
              handleClose={handleClose}
              {...props}
            />
          ),
          { deps: [], isMounted }
        );
        useEffect(() => {}, [isMounted]);
        useEffect(() => {
          setIsMounted(true);
        }, []);
        useImperativeHandle(ref, () => ({ handleClose }), []);
        useUpdateEffect(() => {
          if (!transition) {
            onUnmount();
          }
        }, [transition]);
        return transition;
      }),
    [...deps]
  );
  const open = useCallback(
    (context?: C) => {
      const ref = createRef<WrapHandlers>();
      const key = crypto.randomUUID();
      const child = (
        <Wrap
          key={key}
          ref={ref}
          context={context}
          onUnmount={() => remove(child)}
        />
      );
      push(child);
      return () => {
        ref.current?.handleClose();
      };
    },
    [push, remove, ...deps]
  );
  return open;
};
