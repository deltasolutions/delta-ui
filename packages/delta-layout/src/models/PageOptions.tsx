import { FeedOptions } from './FeedOptions';

export interface PageOptions {
  feed: FeedOptions;
  groups: string[];
  path: string;
  title: string;
}
