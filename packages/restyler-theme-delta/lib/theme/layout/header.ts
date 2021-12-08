import { BasicTheme } from 'restyler';
import { headerHeight, sidebarWidth } from './constants';

export const header: BasicTheme = {
  style: ({ sidebar }) => ({
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'flex-end',
    margin: 0,
    paddingTop: 4,
    paddingBottom: 3,
    color: 'onExterior',
    backgroundColor: 'exterior',
    height: sidebar ? headerHeight : undefined
  }),
  components: {
    content: {
      style: ({ sidebar }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: sidebar ? sidebarWidth : 0,
        paddingLeft: sidebar ? 4 : undefined,
        gap: 2
      })
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
