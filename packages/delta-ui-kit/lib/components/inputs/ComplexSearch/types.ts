import { ReactNode } from 'react';

export interface ComplexSearchProposal {
  key: string;
  label: string;
  operators: ComplexSearchOperator[];
  getOptions?: (query) => ComplexSearchDatum[] | Promise<ComplexSearchDatum[]>;
  getOptionValue?: (option: ComplexSearchDatum) => string;
  getSelectionQuery?: (datum: ComplexSearchDatum) => string;
  renderSelection?: (datum: ComplexSearchDatum) => ReactNode;
  renderOption?: (datum: ComplexSearchDatum) => ReactNode;
}

export interface ComplexSearchOperator {
  key: string;
  label: string;
}

interface ComplexSearchDatum {
  //TODO maybe add better types for datum
  [key: PropertyKey]: any;
}

export interface ComplexSearchSegment {
  key?: string;
  operator?: string;
  value?: string;
}
