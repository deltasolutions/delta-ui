import { LayoutHeaderOptions } from './LayoutHeaderOptions';
import { LayoutSidebarOptions } from './LayoutSidebarOptions';
import { PageDef } from './PageDef';
export interface LayoutOptions {
  pages: PageDef[];
  header?: LayoutHeaderOptions;
  sidebar?: LayoutSidebarOptions;
  logoSrc?: string;
}
