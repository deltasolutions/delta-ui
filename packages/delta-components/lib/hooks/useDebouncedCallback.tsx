import { useCallback, useRef } from 'react';
import { ArgumentTypes } from '../models';

export const useDebouncedCallback = <T extends Function>(
  callback: T,
  delay: number
): ((...args: ArgumentTypes<T>) => void) => {
  const timer = useRef<any>(null);
  return useCallback(
    (...args) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};
