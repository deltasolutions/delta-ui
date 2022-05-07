import { useEffect, useRef, useState } from 'react';

export function useThrottledValue<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());
  useEffect(() => {
    if (Date.now() >= lastExecuted.current + interval) {
      lastExecuted.current = Date.now();
      setThrottledValue(value);
      return;
    } else {
      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, interval);
      return () => clearTimeout(timerId);
    }
  }, [value, interval]);
  return throttledValue;
}
