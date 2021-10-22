import { createContext } from 'react';
import { FeedSectionOptions } from '../../models';

export const ConfiguredFeedContext = createContext({
  sections: [] as FeedSectionOptions[],
  moveItemToItem: (sourceId: string, targetId: string) => {},
  moveItemToSection: (sourceId: string, targetId: string) => {},
  moveSectionToSection: (sourceId: string, targetId: string) => {}
});
