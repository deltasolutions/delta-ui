import { BasicTheme } from 'restyler';

export const dataTable: BasicTheme = {
  style: {},
  components: {
    body: {
      style: {}
    },
    row: {
      style: {
        alignItems: 'center',
        borderBottom: '1px solid transparent',
        fontSize: 3,
        lineHeight: '1.5rem',
        '&:hover': { backgroundColor: 'accentSurface' },
        '&:not(:last-child)': {
          borderBottomColor: 'border'
        }
      },
      kinds: {
        head: {
          style: {
            backgroundColor: 'accentSurface',
            borderBottom: '1px solid',
            borderBottomColor: 'border',
            userSelect: 'none',
            fontWeight: 'heading',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            fontSize: 2
          }
        }
      }
    },
    cell: {
      style: {
        padding: 3,
        minWidth: '50px',
        display: 'inline-block',
        verticalAlign: 'middle',
        textAlign: 'left',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }
  }
};
