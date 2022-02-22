import { BasicTheme } from 'restyler';

export const pairList: BasicTheme = {
  style: {
    padding: 0,
    margin: 0,
    paddingY: 3,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    minWidth: 0
  },
  components: {
    item: {
      style: {
        width: '100%',
        paddingX: 3,
        maxWidth: '100%',
        minWidth: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 3,
        '&:not(:first-of-type)': {
          marginTop: 3,
          paddingTop: 3,
          borderTop: '1px solid',
          borderTopColor: 'border'
        }
      },
      components: {
        title: {
          style: {
            order: 1,
            flex: '0 0 auto',
            fontSize: 2,
            letterSpacing: '0.04em',
            fontWeight: 'heading',
            textTransform: 'uppercase',
            color: 'onSurface',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }
        },
        content: {
          style: {
            flex: '0 1 auto',
            order: 3
          }
        }
      }
    }
  }
};
