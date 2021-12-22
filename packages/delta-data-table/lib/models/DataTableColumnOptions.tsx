import { ReactNode } from 'react';

export interface DataTableColumnOptions<T extends object> {
  key: string;
  header?: string;
  width?: number;
  render?: (datum: T) => ReactNode;
}
