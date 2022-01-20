import { useEffect, useReducer } from 'react';
import { Chest, ChestInitializer } from '../models';

export const makeChest = <Data extends unknown>(
  initializer: ChestInitializer<Data>
): Chest<Data> => {
  const dataHolder = {
    current: initializer instanceof Function ? initializer() : initializer
  };
  const updaters = new Set<() => void>();
  const use: Chest<Data>['get'] = () => {
    const [_, update] = useReducer(v => (v + 1) % 1000, 0);
    useEffect(() => {
      updaters.add(update);
      return () => {
        updaters.delete(update);
      };
    }, []);
    return dataHolder.current;
  };
  const get: Chest<Data>['get'] = () => dataHolder.current;
  const set: Chest<Data>['set'] = update => {
    dataHolder.current =
      update instanceof Function ? update(dataHolder.current) : update;
    updaters.forEach(fn => fn());
  };
  return { use, get, set };
};
