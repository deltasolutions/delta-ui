import { useCallback, useRef } from 'react';
import { ArgumentTypes } from '../models';
export const useThrottledCallback = <T extends Function>(
  callback: T,
  delay: number
): ((...args: ArgumentTypes<T>) => void) => {
  const isThrottled = useRef<any>(null);
  const throttledCallback = useCallback(
    (...args) => {
      if (isThrottled.current) {
        return;
      }
      callback(...args);
      isThrottled.current = true;
      setTimeout(() => (isThrottled.current = false), delay);
    },
    [callback, delay]
  );
  return throttledCallback;
};
