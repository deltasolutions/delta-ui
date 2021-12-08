import { ReactNode } from 'react';
import { LayoutMenuOptions } from './LayoutMenuOptions';

export interface LayoutSidebarOptions {
  account: {
    title: ReactNode;
    onClick?: () => void;
  };
  menu: LayoutMenuOptions;
}
