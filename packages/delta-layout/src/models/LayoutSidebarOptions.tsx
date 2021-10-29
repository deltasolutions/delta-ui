import { ReactNode } from 'react';
import { PageDef } from './PageDef';

export interface LayoutSidebarOptions {
  account: ReactNode;
  pages: PageDef[];
  onAccountClick?: () => void;
}
