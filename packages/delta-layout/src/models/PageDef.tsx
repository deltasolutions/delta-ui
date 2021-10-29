import { FeedDef } from './FeedDef';

export interface PageDef {
  id: string;
  title: string;
  subs?: PageDef[];
  path?: string;
  feed?: FeedDef;
  componentId?: string;
}
