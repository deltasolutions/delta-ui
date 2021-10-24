import { ReactNode } from 'react';

export interface LayoutOptions {
  heading?: ReactNode;
  logoSrc?: string;
  actions?: ReactNode;
  account?: ReactNode;
  onAccountClick?: () => void;
}
