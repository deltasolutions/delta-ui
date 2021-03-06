import { useMemo } from 'react';
import { Chest, ChestInitializer } from '../models';
import { createChest } from '../utils';

export const useChest = <Data extends unknown>(
  initializer: ChestInitializer<Data>
): Chest<Data> => {
  return useMemo(() => createChest(initializer), []);
};
