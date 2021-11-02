import { useMemo, useState } from 'react';
import {
  DataTableColumnDef,
  DataTableContentManager,
  DataTableContentManagerOptions
} from '../models';

export const useDataTableContentManager = <T extends object>({
  tabManager: {
    activeTab: {
      columnOrder = defaultColumnOrder,
      columnExclusions = defaultColumnExclusions,
      columnSizes = defaultColumnSizes
    }
  },
  initialData,
  initialColumns,
  getNextChunk
}: DataTableContentManagerOptions<T>): DataTableContentManager<T> => {
  const [data, setData] = useState(initialData);
  const [columns, setColumns] = useState(initialColumns);
  const coercedColumns = useMemo(() => {
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
    const coerced: DataTableColumnDef[] = filteredKeys.reduce(
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
  const manager = {
    data,
    setData,
    columns,
    setColumns,
    coercedColumns,
    initialData,
    initialColumns,
    getNextChunk
  };
  return useMemo(() => manager, Object.values(manager));
};

const defaultColumnOrder = [];
const defaultColumnExclusions = [];
const defaultColumnSizes = {};
