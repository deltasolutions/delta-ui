import { BasicTheme } from 'restyler';

export const section: BasicTheme = {
  style: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  },
  kinds: {
    dragReady: {
      style: {
        padding: 3,
        cursor: 'move',
        backgroundColor: 'accentBackground',
        borderRadius: 2
      }
    },
    dragActive: {
      style: {
        padding: 3,
        visibility: 'hidden'
      }
    },
    dropReady: {
      style: {
        padding: 3,
        borderRadius: 2,
        backdropFilter: 'sepia(1)'
      }
    }
  },
  components: {
    actions: {
      style: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center',
        gap: 2,
        opacity: 0.7,
        color: 'onBackground',
        fontSize: 4
      }
    }
  }
};
