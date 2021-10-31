import { createContext } from 'react';
import { FeedManager } from '../../models';

const noop = () => {
  throw new Error('Not implemented');
};

export const defaultFeedContextValue: {
  manager: FeedManager;
} = {
  manager: {
    isActive: false,
    isUpdating: false,
    registry: [],
    targetSections: [],
    addItemToSection: noop,
    addSection: noop,
    getSectionChildIds: noop,
    moveItemToItem: noop,
    moveItemToSection: noop,
    moveSectionToSection: noop,
    removeItem: noop,
    removeSection: noop,
    setSectionColumns: noop
  }
};

export const FeedContext = createContext(defaultFeedContextValue);
