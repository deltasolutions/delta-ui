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
        borderBottom: '1px solid',
        borderBottomColor: 'border',
        fontSize: 3,
        '&:hover': { backgroundColor: 'accentSurface' }
      },
      kinds: {
        head: {
          style: {
            backgroundColor: 'accentSurface',
            userSelect: 'none',
            fontWeight: 'heading',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            fontSize: 2,
            borderBottom: '1px solid',
            borderBottomColor: 'border'
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
