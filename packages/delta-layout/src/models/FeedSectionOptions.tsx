import { MasonryProps } from 'restyler';
import { FeedItemOptions } from './FeedItemOptions';

export interface FeedSectionOptions {
  items: (string | FeedItemOptions)[];
  columns?: MasonryProps['columns'];
}
