import { ComponentDef } from './ComponentDef';
import { FeedSectionDef } from './FeedSectionDef';

export interface FeedManagerOptions {
  sections: FeedSectionDef[];
  registry: ComponentDef[];
}
