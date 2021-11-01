import { useCallback } from '@storybook/react/node_modules/@storybook/addons';
import { useMemo } from 'react';

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
  const columns = useMemo(() => keys.map(key => ({ key, header: key })), []);
  const data = useMemo(
    () =>
      new Array(rowCount)
        .fill(undefined)
        .map(() => keys.reduce((p, v) => ({ ...p, [v]: randomize() }), {})),
    []
  );
  const output = { columns, data };
  return useMemo(() => output, Object.values(output));
};
