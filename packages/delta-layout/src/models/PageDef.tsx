import { FeedDef } from './FeedDef';

export interface PageDef {
  id: string;
  path: string;
  groups: string[];
  feed?: FeedDef;
  componentId?: string;
}
