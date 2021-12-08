import { BasicTheme } from 'restyler';

const createFeedSectionKind = (gap: number | string) => ({
  style: {
    '&, & > div': { gap, minWidth: 0 }
  }
});

export const masonry: BasicTheme = {
  componenets: {
    column: {}
  },
  kinds: {
    feedSectionContent: createFeedSectionKind(4),
    updatingFeedSectionContent: createFeedSectionKind(3)
  }
};
