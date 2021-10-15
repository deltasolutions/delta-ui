import { ReactNode } from 'react';
import { LayoutActionOptions } from './LayoutActionOptions';

export interface LayoutOptions {
  heading?: ReactNode;
  logoSrc?: string;
  actions?: ReactNode;
  account?: ReactNode;
  onAccountClick?: () => void;
}
