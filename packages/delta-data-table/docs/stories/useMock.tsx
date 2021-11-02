import { useCallback, useMemo } from 'react';

export interface MockDataOptions {
  columnCount: number;
  rowCount: number;
}

export const useMock = ({ columnCount, rowCount }: MockDataOptions) => {
  const randomize = useCallback(() => Math.random().toString().slice(-4), []);
  const keys = useMemo(
    () => new Array(columnCount).fill(undefined).map(randomize),
    []
  );
  const generate = useCallback(
    () =>
      new Array(rowCount)
        .fill(undefined)
        .map(() => keys.reduce((p, v) => ({ ...p, [v]: randomize() }), {})),
    [keys]
  );
  const getNextChunk = useCallback(async () => {
    await new Promise<void>(resolve => setTimeout(resolve, 1000));
    return { data: generate(), hasNextChunk: true };
  }, [generate]);
  const columns = useMemo(() => keys.map(key => ({ key, header: key })), []);
  const data = useMemo(generate, []);
  return useMemo(
    () => ({
      initialContent: {
        columns,
        data,
        hasNextChunk: true
      },
      getNextChunk
    }),
    [data, columns, getNextChunk]
  );
};
