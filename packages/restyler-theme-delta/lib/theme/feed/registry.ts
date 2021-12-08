import { BasicTheme } from 'restyler';

export const registry: BasicTheme = {
  style: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    width: '100%'
  },
  components: {
    query: {
      style: {}
    },
    content: {
      style: ({ theme: { colors } }) => ({
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '250px',
        marginTop: 3,
        overflowY: 'auto',
        background:
          `linear-gradient(${colors.surface} 30%, rgba(255, 255, 255, 0)),` +
          `linear-gradient(rgba(255, 255, 255, 0), ${colors.surface} 70%) 0 100%,` +
          'radial-gradient(farthest-side at 50% 0, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)),' +
          'radial-gradient(farthest-side at 50% 100%, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)) 0 100%',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'surface',
        backgroundSize: '100% 40px, 100% 40px, 100% 14px, 100% 14px',
        backgroundAttachment: 'local, local, scroll, scroll',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      })
    },
    item: {
      style: {
        cursor: 'pointer',
        '&:hover': {
          color: 'primary'
        },
        '& + &': {
          position: 'relative',
          marginTop: '17px',
          '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: '-8px',
            left: 0,
            width: '100%',
            height: 0,
            borderTop: '1px solid',
            borderTopColor: 'border',
            pointerEvents: 'none'
          }
        }
      }
    }
  }
};
