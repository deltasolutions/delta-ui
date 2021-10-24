import { FeedSectionOptions } from './FeedSectionOptions';

export interface FeedManager {
  isUpdating: boolean;
  targetSections: FeedSectionOptions[];
  moveItemToItem: (sourceId: string, targetId: string) => void;
  moveItemToSection: (sourceId: string, targetId: string) => void;
  moveSectionToSection: (sourceId: string, targetId: string) => void;
  removeSection: (id: string) => void;
  getSectionChildIds: (id: string) => string[];
}
