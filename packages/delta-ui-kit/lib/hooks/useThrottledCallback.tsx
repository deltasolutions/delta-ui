import { useCallback, useRef } from 'react';

export const useThrottledCallback = <T extends (...args: any) => any>(
  callback: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  const throttled = useRef<boolean>();
  const throttledCallback = useCallback(
    (...args) => {
      if (throttled.current) {
        return;
      }
      callback(...args);
      throttled.current = true;
      setTimeout(() => (throttled.current = false), delay);
    },
    [callback, delay]
  );
  return throttledCallback;
};
