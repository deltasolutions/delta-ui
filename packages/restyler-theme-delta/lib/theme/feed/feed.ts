import { BasicTheme } from 'restyler';
import { item } from './item';
import { section } from './section';

export const feed: BasicTheme = {
  style: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    width: '100%'
  },
  components: {
    item,
    section
  }
};
