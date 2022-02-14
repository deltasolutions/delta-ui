import { BasicTheme } from 'restyler';
import { createCommonExtras } from './common';

export const navbar: BasicTheme = {
  style: {
    zIndex: 1,
    position: 'sticky',
    left: 0,
    top: 0,
    color: 'onExterior',
    backgroundColor: 'exterior'
  },
  components: {
    content: {
      style: {
        display: 'flex',
        paddingX: 4,
        paddingTop: 4,
        paddingBottom: 3
      }
    },
    extras: createCommonExtras({
      style: {
        marginLeft: 'auto'
      }
    })
  }
};
