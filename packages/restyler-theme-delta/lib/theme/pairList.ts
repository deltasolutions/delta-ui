import { BasicTheme } from 'restyler';

export const pairList: BasicTheme = {
  style: {
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    maxWidth: '100%',
    minWidth: 0
  },
  kinds: {
    row: {
      style: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: -2,
        '& > div': {
          marginLeft: 2,
          flex: '1 0 min(100%, 300px)'
        }
      }
    }
  },
  components: {
    item: {
      style: {
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
        padding: 0,
        display: 'flex',
        '&::after': {
          marginX: 1,
          display: 'block',
          flex: '1 0 1.5em',
          order: 2,
          content: `"${new Array(200).join(' .')}"`,
          opacity: 0.5,
          overflow: 'hidden',
          whiteSpace: 'nowrap'
        }
      },
      components: {
        left: {
          style: {
            order: 1,
            flex: '0 1 auto',
            fontSize: 2,
            letterSpacing: '0.04em',
            fontWeight: 'heading',
            textTransform: 'uppercase',
            color: 'onSurface',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }
        },
        right: {
          style: {
            flex: '0 1 auto',
            order: 3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }
        }
      }
    }
  }
};
