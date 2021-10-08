import { BasicTheme } from 'restyler';

export const table: BasicTheme = {
  style: {
    width: '100%',
    borderSpacing: 0,
    fontSize: 3,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  components: {
    head: {
      style: {
        backgroundColor: 'accentSurface',
        userSelect: 'none',
        fontWeight: 'heading',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        fontSize: 2,
        '& th, & td': {
          borderBottom: '1px solid',
          borderBottomColor: 'border'
        }
      }
    },
    body: {
      style: {
        '& tr:not(:first-of-type) td': {
          borderTop: '1px solid',
          borderTopColor: 'border'
        }
      }
    },
    row: {
      style: {
        '&:hover': { backgroundColor: 'accentSurface' }
      }
    },
    cell: {
      style: {
        padding: 3,
        minWidth: '50px',
        textAlign: 'left',
        '&:last-of-type:not(:first-of-type)': {
          textAlign: 'right'
        },
        // Expansion stretch fix.
        '&:first-of-type:last-of-type': {
          maxWidth: 0
        }
      },
      kinds: {
        empty: {
          style: {
            textAlign: 'center',
            fontWeight: 'heading',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            fontSize: 2
          }
        },
        hoverable: {
          style: { cursor: 'pointer' }
        },
        query: {
          style: {
            backgroundColor: 'surface',
            '& input': {
              padding: 0,
              width: 'calc(100% - 1.7em)',
              border: 'none',
              color: 'inherit',
              fontSize: 'inherit',
              backgroundColor: 'transparent',
              fontWeight: 'inherit',
              textTransform: 'inherit',
              lineHeight: 'inherit',
              fontFamily: 'inherit',
              outline: 'none'
            },
            '& svg': {
              verticalAlign: 'middle',
              width: '1.7em',
              height: '1.7em',
              cursor: 'pointer',
              '&:hover': {
                color: 'primary'
              }
            }
          }
        }
      }
    },
    caption: {
      style: {
        paddingX: 3,
        paddingY: 2,
        color: 'onSurface',
        backgroundColor: 'accentSurface',
        textAlign: 'left',
        fontWeight: 400
      }
    }
  }
};
