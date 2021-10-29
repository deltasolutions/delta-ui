import { ReactNode } from 'react';

export interface LayoutOptions {
  heading?: ReactNode;
  headerExtras?: ReactNode;
  logoSrc?: string;
  account?: ReactNode;
  onAccountClick?: () => void;
}
