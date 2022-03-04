import { ReactNode } from 'react';

export interface DataTableColumnOptions<T extends object> {
  key: string;
  header?: ReactNode;
  width?: number;
  render?: (datum: T, index: number) => ReactNode;
}
