import { BasicTheme } from 'restyler';
import { actions } from './actions';
import { item } from './item';
import { registry } from './registry';
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
    actions,
    section,
    item,
    registry
  }
};
