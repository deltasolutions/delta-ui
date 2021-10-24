import { FeedSectionDef } from './FeedSectionDef';

export interface FeedManager {
  isUpdating: boolean;
  targetSections: FeedSectionDef[];
  moveItemToItem: (sourceId: string, targetId: string) => void;
  moveItemToSection: (sourceId: string, targetId: string) => void;
  moveSectionToSection: (sourceId: string, targetId: string) => void;
  removeSection: (id: string) => void;
  getSectionChildIds: (id: string) => string[];
  addSection: () => void;
}
