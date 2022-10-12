import { ReactElement, ReactNode, RefObject } from 'react';

export interface Propose {
  id: ProposeKey;
  operators: ProposeOperator[];
  label: string;
  type?: 'date' | 'time' | 'number' | 'string';
  renderSelection: (options: RenderSelectionOptions) => ReactNode;
  renderDrop: (options?: RenderDropOptions) => ReactNode;
}

export interface BunchData {
  id: ProposeKey;
  operator?: string;
  value?: ProposeValue;
}

export interface RenderDropOptions {
  query?: ProposeQuery;
  handleClose: () => void;
  ref: RefObject<HTMLDivElement>;
  onItemClick: (v: string) => void;
  id?: ProposeQuery;
}
export interface RenderSelectionOptions {
  id: ProposeKey;
  value?: ProposeValue;
}

export type ProposeKey = string;
export type ProposeOperator = string;
export type ProposeValue = string;
export type ProposeQuery = string;
