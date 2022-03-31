import { ReactNode } from 'react';

export interface DataTableColumnOptions<T extends object> {
  key: string;
  header?: ReactNode;
  description?: ReactNode;
  query?: string;
  width?: number;
  render?: (datum: T, index: number) => ReactNode;
}
