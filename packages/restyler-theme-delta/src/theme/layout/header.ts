import { BasicTheme } from 'restyler';
import { headerHeight, sidebarWidth } from './constants';

export const header: BasicTheme = {
  style: {
    margin: 0,
    paddingY: 5,
    color: 'onExterior',
    backgroundColor: 'exterior',
    height: headerHeight
  },
  components: {
    content: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: sidebarWidth,
        paddingLeft: 4,
        gap: 2
      }
    },
    extras: {
      style: {
        display: 'flex',
        gap: 2,
        flex: '0 0 auto',
        '& svg': {
          width: '2rem',
          height: '2rem',
          verticalAlign: 'middle'
        },
        '& button': {
          cursor: 'pointer',
          '&:hover': { color: 'primary' }
        }
      }
    }
  }
};
