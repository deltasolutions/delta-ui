import { ReactNode } from 'react';

export interface ComplexSearchProposal {
  key: string;
  label: string;
  operators: ComplexSearchOperator[];
  getOptions?: (query?: string) => string[] | Promise<string[]>;
  getSelectionQuery?: (value: string) => string;
  renderSelection?: (value: string) => ReactNode;
  renderOption?: (option?: string) => ReactNode;
}

export interface ComplexSearchOperator {
  key: string;
  label: string;
}

export interface ComplexSearchSegment {
  key?: string;
  operator?: string;
  value?: string;
}
