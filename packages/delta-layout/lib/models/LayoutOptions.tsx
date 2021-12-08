import { LayoutFooterOptions } from './LayoutFooterOptions';
import { LayoutHeaderOptions } from './LayoutHeaderOptions';
import { LayoutSidebarOptions } from './LayoutSidebarOptions';

export interface LayoutOptions {
  header?: LayoutHeaderOptions;
  footer?: LayoutFooterOptions;
  sidebar?: LayoutSidebarOptions;
}
