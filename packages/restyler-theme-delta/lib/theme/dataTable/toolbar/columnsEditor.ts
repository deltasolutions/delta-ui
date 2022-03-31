import { BasicTheme } from 'restyler';

export const columnsEditor: BasicTheme = {
  style: {
    display: 'flex',
    gap: 3
  },
  components: {
    list: {
      style: {
        flex: '1 1 100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '300px'
      },
      components: {
        title: {
          style: {
            flex: '0 0 auto',
            fontSize: 2,
            fontWeight: 'heading',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }
        },
        query: {
          style: {
            flex: '0 0 auto'
          }
        },
        content: {
          style: ({ isDroppable }) => ({
            flex: '1 1 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            paddingRight: 1,
            borderRadius: 2,
            overflow: 'hidden',
            overflowY: 'scroll',
            opacity: isDroppable ? 0.5 : 1,
            '& svg': {
              width: '1.7rem',
              height: '1.7rem',
              margin: 'auto'
            }
          })
        },
        item: {
          style: {
            width: '100%',
            px: 2,
            py: 2,
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
            backgroundColor: 'secondary'
          }
        }
      }
    }
  }
};
