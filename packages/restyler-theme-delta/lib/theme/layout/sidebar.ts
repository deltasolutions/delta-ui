import { BasicTheme } from 'restyler';
import { headerHeight, sidebarWidth } from './constants';

export const sidebar: BasicTheme = {
  style: {
    position: 'relative',
    top: `calc(-${headerHeight} + 30px)`,
    left: 0,
    flex: `0 0 ${sidebarWidth}`,
    width: sidebarWidth,
    marginBottom: `calc(-${headerHeight} + 30px)`,
    color: 'onSurface',
    backgroundColor: 'surface',
    boxShadow: 3,
    borderRadius: 2,
    paddingTop: 4,
    paddingBottom: 3
  },
  components: {
    account: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        marginBottom: 3,
        paddingBottom: 3,
        borderBottom: '1px solid',
        borderBottomColor: 'border',
        '& svg': {
          width: '60px',
          height: '60px'
        },
        '& a': {
          fontWeight: 500
        }
      }
    }
  }
};
