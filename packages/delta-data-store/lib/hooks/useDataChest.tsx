import { useCallback, useEffect, useState } from 'react';
import { DataChest, DataChestOptions } from '../models';

export const useDataChest = <D, S, H>({
  initialSeed,
  isManual,
  fetch
}: DataChestOptions<D, S>): DataChest<D, S> => {
  const [data, setData] = useState<D | undefined>(undefined);
  const [seed, setSeed] = useState<S>(initialSeed);
  const sync = useCallback(async () => {
    setData(await fetch(seed));
  }, [seed, fetch]);
  useEffect(() => {
    !isManual && sync();
  }, [isManual, sync]);
  return {
    data,
    seed,
    setData,
    setSeed,
    sync,
    fetch
  };
};
