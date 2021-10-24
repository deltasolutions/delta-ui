import { createContext } from 'react';
import { FeedManager } from '../../models';

const noop = () => {
  throw new Error('Not implemented');
};

export const ManageableFeedContext = createContext<FeedManager>({
  isUpdating: false,
  targetSections: [],
  moveItemToItem: noop,
  moveItemToSection: noop,
  moveSectionToSection: noop,
  removeSection: noop,
  getSectionChildIds: noop,
  addSection: noop
});
