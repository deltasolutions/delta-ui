import { useMemo } from 'react';
import { DataTableColumn, DataTableTab } from './types';

export interface CoercedColumnsOptions {
  tab: DataTableTab;
  shouldExclude?: boolean;
}

export const useCoercedColumns = (
  columns: DataTableColumn[],
  {
    tab: { columnOrder = [], columnExclusions = [], columnSizes = {} },
    shouldExclude = true
  }: CoercedColumnsOptions
): DataTableColumn[] => {
  return useMemo(() => {
    const orderedAccessorsSet = new Set(columnOrder);
    const orderedAccessors = columnOrder
      .slice()
      .concat(
        columns.filter(v => !orderedAccessorsSet.has(v.key)).map(v => v.key)
      );
    const exclusionsSet = new Set(columnExclusions);
    const filteredAccessors = orderedAccessors.filter(
      v => !exclusionsSet.has(v)
    );
    const columnsMap: Record<string, DataTableColumn> = columns.reduce(
      (p, v) => ({ ...p, [v.key]: v }),
      {}
    );
    const coerced: DataTableColumn[] = (
      shouldExclude ? filteredAccessors : orderedAccessors
    ).reduce(
      (p, v) => [
        ...p,
        columnSizes[v]
          ? { ...columnsMap[v], width: columnSizes[v] }
          : columnsMap[v]
      ],
      []
    );
    return coerced;
  }, [columns, columnOrder, columnExclusions, columnSizes]);
};
