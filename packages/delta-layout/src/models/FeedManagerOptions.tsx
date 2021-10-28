import { FeedComponentDef } from './FeedComponentDef';
import { FeedSectionDef } from './FeedSectionDef';

export interface FeedManagerOptions {
  sections: FeedSectionDef[];
  registry: FeedComponentDef[];
}
