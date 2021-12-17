import { BasicTheme } from 'restyler';

export const tabs: BasicTheme = {
  style: {
    flex: '1 1 auto',
    minWidth: 0,
    display: 'flex',
    alignItems: 'center'
  },
  components: {
    item: {
      style: ({ isActive }) => ({
        position: 'relative',
        display: 'block',
        flex: '0 1 auto',
        minWidth: '3em',
        height: '2.4em',
        paddingY: '0.5em',
        paddingX: '0.75em',
        border: '1px solid',
        borderRadius: '100vw',
        backgroundColor: isActive ? 'accentSurface' : 'transparent',
        cursor: isActive ? 'move' : 'pointer',
        borderColor: isActive ? 'border' : 'transparent',
        '&:hover': isActive
          ? {}
          : {
              color: 'primary'
            }
      }),
      components: {
        content: {
          style: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '100%',
            verticalAlign: 'middle'
          }
        },
        dropIcon: {
          style: {
            zIndex: 10,
            position: 'absolute',
            top: '100%',
            right: '0',
            transform: 'translateX(50%)',
            '& svg': {
              width: '2em',
              height: '2em',
              color: 'primary'
            }
          }
        }
      }
    }
  }
};
