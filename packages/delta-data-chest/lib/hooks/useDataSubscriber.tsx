import { useEffect } from 'react';
import { DataOperation } from '../models';

export const useDataSubscriber = <Data, Seed>(
  fn: DataOperation<Data, Seed>,
  seed?: Seed
) => {
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
  }, [seed]);
};
