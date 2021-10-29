import { LayoutHeaderOptions } from './LayoutHeaderOptions';
import { LayoutSidebarOptions } from './LayoutSidebarOptions';
export interface LayoutOptions {
  header?: LayoutHeaderOptions;
  sidebar?: LayoutSidebarOptions;
  logoSrc?: string;
}
