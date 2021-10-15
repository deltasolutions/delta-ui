import { ReactNode } from 'react';

export interface LayoutActionOptions {
  icon?: ReactNode;
  tooltip?: string;
  onClick?: () => void;
}
