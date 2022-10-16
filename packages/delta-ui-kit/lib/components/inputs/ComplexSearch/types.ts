import { ReactNode } from 'react';

export interface ComplexSearchPropose {
  id: string;
  label: string;
  operators: string[];
  getItems: (query) => unknown[] | Promise<unknown[]>;
  renderSelectial: (datum) => ReactNode;
  renderOption: (datum) => ReactNode;
}

export interface ComplexSearchItemType {
  id?: string;
  operator?: string;
  value?: string;
}
