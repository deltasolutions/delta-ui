import { createContext } from 'react';
import { FeedSectionOptions } from '../../models';

export const ConfiguredFeedContext = createContext({
  sections: [] as FeedSectionOptions[],
  moveItem: (sourceId: string, targetId: string) => {}
});
