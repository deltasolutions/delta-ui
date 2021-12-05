import { useEffect } from 'react';
import { DataOperation } from '../models';

export const useDataSubscriber = (fn: DataOperation<any>, seed?: any) => {
  useEffect(() => {
    if (!seed) {
      return;
    }
    const promise = fn(seed).catch();
    return () => {
      promise.then(result => {
        result?.subscription?.cancel();
      });
    };
  }, [fn, seed]);
};
