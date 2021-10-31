import { ComponentDef } from './ComponentDef';
import { FeedSectionDef } from './FeedSectionDef';

export interface FeedManager {
  isActive: boolean;
  isUpdating: boolean;
  registry: ComponentDef[];
  targetSections: FeedSectionDef[];
  addItemToSection: (componentId: string, sectionId: string) => void;
  addSection: () => void;
  getSectionChildIds: (id: string) => string[];
  moveItemToItem: (sourceId: string, targetId: string) => void;
  moveItemToSection: (sourceId: string, targetId: string) => void;
  moveSectionToSection: (sourceId: string, targetId: string) => void;
  removeItem: (id: string) => void;
  removeSection: (id: string) => void;
  setSectionColumns: (id: string, columns: FeedSectionDef['columns']) => void;
}
