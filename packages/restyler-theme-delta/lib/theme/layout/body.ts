import { BasicTheme } from 'restyler';
import { roundedMainSegmentKind } from './common';

export const body: BasicTheme = {
  style: {
    flex: '1 0 auto',
    backgroundColor: 'background',
    color: 'onBackground'
  },
  kinds: {
    rounded: roundedMainSegmentKind
  },
  components: {
    content: {
      style: {
        padding: 4
      }
    }
  }
};
