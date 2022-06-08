import { jsx } from '@theme-ui/core';
import {
  useMemo,
  useState,
  useEffect,
  TransitionEvent,
  useCallback,
  useRef,
  DependencyList,
} from 'react';
import { requestAnimationDelay } from '../utils';
import { useCleanableRef } from './useCleanableRef';
import { ForwardRefCRF, useForwardRef } from './useForwardRef';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export interface TransitionProps {
  isVisible: boolean;
  isEntering: boolean;
}

export type TransitionCRF<T, P = TransitionProps> = ForwardRefCRF<T, P>;

export interface TransitionOptions {
  deps: DependencyList;
  isMounted: boolean;
}

export const useTransition = <T extends HTMLElement>(
  crf: TransitionCRF<T>,
  { deps, isMounted }: TransitionOptions
) => {
  const Component = useForwardRef(crf, deps);
  const [isVisible, setIsVisible] = useState(!!isMounted);
  const [isEntering, setIsEntering] = useState(false);
  const [isReallyMounted, setIsReallyMounted] = useState(!!isMounted);

  const element = useRef<T>();
  const properties = useRef([] as string[]);
  const reflow = useCallback(() => {
    // Reflow should be called at the time of
    // non-existent property transitions, so
    // here we can reset the property registry.
    properties.current = [];
    // Reflowing DOM node via offset height calculation.
    // Returning the value in order it not being removed
    // by aggressive compilation optimizations.
    return element.current?.offsetHeight;
  }, []);
  const handlers = useMemo(
    () => ({
      transitionrun: ({ target, propertyName }) => {
        if (target !== element.current) {
          return;
        }
        properties.current.push(propertyName);
      },
      transitionend: ({ target, propertyName }: TransitionEvent) => {
        if (target !== element.current) {
          return;
        }
        properties.current = properties.current.filter(v => v !== propertyName);
        if (properties.current.length < 1) {
          // `setIsEntering` has to be before `setIsReallyMounted` call,
          // since this part of code runs in async and is not batched by React.
          // This means that in case of `setIsReallyMounted(false)` ran before
          // `setIsEntering`, component could pontentially be unmounted
          // and then used again.
          setIsEntering(false);
          setIsReallyMounted(isMounted);
        }
      },
    }),
    [isMounted]
  );

  const handleBinding = useCleanableRef<T>(
    (el: T) => {
      element.current = el;
      const handleAction = (action: 'add' | 'remove') =>
        Object.keys(handlers).forEach(event => {
          el[`${action}EventListener`](event, handlers[event]);
        });
      handleAction('add');
      return () => {
        handleAction('remove');
      };
    },
    [handlers]
  );

  useIsomorphicLayoutEffect(() => {
    reflow();
    if (isMounted) {
      if (isReallyMounted) {
        setIsVisible(true);
      } else {
        setIsReallyMounted(true);
        setIsEntering(true);
      }
    } else {
      setIsVisible(false);
      setIsEntering(false);
      const isActual = { current: true };
      requestAnimationDelay(() => {
        if (properties.current.length < 1 && isActual.current) {
          setIsReallyMounted(false);
        }
      });
      return () => {
        isActual.current = false;
      };
    }
    return undefined;
  }, [isMounted]);

  useEffect(() => {
    reflow();
    setIsVisible(isReallyMounted);
  }, [isReallyMounted]);

  return useMemo(
    () =>
      isReallyMounted ? (
        <Component
          ref={handleBinding}
          isEntering={isEntering}
          isVisible={isVisible}
        />
      ) : null,
    [Component, isReallyMounted, isVisible, isEntering, handleBinding]
  );
};
