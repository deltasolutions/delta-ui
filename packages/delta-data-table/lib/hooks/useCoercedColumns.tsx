import { useMemo } from 'react';
import { DataTableTabDef, DataTableColumnDef } from '../models';

export interface CoercedColumnsOptions {
  tab: DataTableTabDef;
  shouldExclude?: boolean;
}

export const useCoercedColumns = (
  columns: DataTableColumnDef[],
  {
    tab: { columnOrder = [], columnExclusions = [], columnSizes = {} },
    shouldExclude = true
  }: CoercedColumnsOptions
): DataTableColumnDef[] => {
  return useMemo(() => {
    const orderedKeySet = new Set(columnOrder);
    const orderedKeys = columnOrder
      .slice()
      .concat(columns.filter(v => !orderedKeySet.has(v.key)).map(v => v.key));
    const exclusionSet = new Set(columnExclusions);
    const filteredKeys = orderedKeys.filter(v => !exclusionSet.has(v));
    const columnMap: { [key: string]: DataTableColumnDef } = columns.reduce(
      (p, v) => ({ ...p, [v.key]: v }),
      {}
    );
    const coerced: DataTableColumnDef[] = (
      shouldExclude ? filteredKeys : orderedKeys
    ).reduce(
      (p, v) => [
        ...p,
        columnSizes[v]
          ? { ...columnMap[v], width: columnSizes[v] }
          : columnMap[v]
      ],
      []
    );
    return coerced;
  }, [columns, columnOrder, columnExclusions, columnSizes]);
};
