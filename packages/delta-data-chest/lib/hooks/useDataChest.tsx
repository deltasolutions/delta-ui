import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { DataChest, DataChestInitializer } from '../models';

export const useDataChest = <Data extends unknown>(
  initializer: DataChestInitializer<Data>
): DataChest<Data> => {
  const dataRef = useRef<Data>(
    initializer instanceof Function ? initializer() : initializer
  );
  const usesRef = useRef(new Set<() => void>());
  const use = useCallback<DataChest<Data>['get']>(() => {
    const [_, update] = useReducer(v => (v + 1) % 1000, 0);
    useEffect(() => {
      usesRef.current.add(update);
      return () => {
        usesRef.current.delete(update);
      };
    }, []);
    return dataRef.current;
  }, []);
  const get = useCallback<DataChest<Data>['get']>(() => dataRef.current, []);
  const set = useCallback<DataChest<Data>['set']>(update => {
    dataRef.current =
      update instanceof Function ? update(dataRef.current) : update;
    usesRef.current.forEach(fn => fn());
  }, []);
  return useMemo(() => ({ use, get, set }), []);
};
