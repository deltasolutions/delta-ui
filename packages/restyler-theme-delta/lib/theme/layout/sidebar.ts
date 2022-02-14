import { BasicTheme } from 'restyler';
import { createCommonExtras, headerHeight, sidebarWidth } from './common';

export const sidebar: BasicTheme = {
  style: {
    zIndex: 1,
    position: 'sticky',
    height: '100vh',
    left: 0,
    top: 0,
    flex: `0 0 ${sidebarWidth}`,
    width: sidebarWidth,
    color: 'onExterior',
    backgroundColor: 'exterior'
  },
  components: {
    content: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }
    },
    extras: createCommonExtras({
      style: {
        flex: '0 0 auto',
        paddingTop: 3,
        paddingBottom: 4,
        '& svg': {
          opacity: 0.6,
          '&:hover': {
            opacity: 1
          }
        }
      }
    })
  }
};
