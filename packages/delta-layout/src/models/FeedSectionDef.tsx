import { MasonryProps } from 'restyler';
import { FeedItemDef } from './FeedItemDef';

export interface FeedSectionDef {
  id: string;
  items: FeedItemDef[];
  columns?: MasonryProps['columns'];
}
