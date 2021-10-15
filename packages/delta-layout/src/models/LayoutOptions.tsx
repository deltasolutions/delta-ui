import { ReactNode } from 'react';

export interface LayoutOptions {
  heading?: ReactNode;
  logoSrc?: string;
  actions?: LayoutAction[];
  account?: ReactNode;
  onAccountClick?: () => void;
}

export interface LayoutAction {
  icon?: ReactNode;
  tooltip?: string;
  onClick?: () => void;
}
