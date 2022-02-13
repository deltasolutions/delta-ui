import { BasicTheme } from 'restyler';
import { roundedMainSegmentKind } from './common';

export const header: BasicTheme = {
  style: {
    backgroundColor: 'accentBackground',
    color: 'onBackground'
  },
  kinds: {
    rounded: roundedMainSegmentKind
  },
  components: {
    content: {
      style: {
        paddingX: 4,
        paddingTop: 4,
        paddingBottom: 3
      }
    },
    extras: {
      style: {}
    }
  }
};
