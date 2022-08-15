import { useEffect, DependencyList, EffectCallback, useRef } from 'react';

export const useUpdateEffect = (fn: EffectCallback, deps: DependencyList) => {
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    return fn();
  }, deps);
};
