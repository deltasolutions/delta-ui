import { FeedSectionDef } from './FeedSectionDef';

export interface FeedManager {
  isUpdating: boolean;
  targetSections: FeedSectionDef[];
  moveItemToItem: (sourceId: string, targetId: string) => void;
  moveItemToSection: (sourceId: string, targetId: string) => void;
  moveSectionToSection: (sourceId: string, targetId: string) => void;
  removeItem: (id: string) => void;
  removeSection: (id: string) => void;
  getSectionChildIds: (id: string) => string[];
  addSection: () => void;
  addItemToSection: (componentId: string, sectionId: string) => void;
  setSectionColumns: (id: string, columns: FeedSectionDef['columns']) => void;
}
