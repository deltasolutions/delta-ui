import { BasicTheme } from 'restyler';

export const heading: BasicTheme = {
  style: {
    marginTop: 2,
    marginBottom: 1,
    fontSize: 5,
    letterSpacing: '0.04em',
    fontWeight: 'heading',
    lineHeight: 'heading',
    color: 'inherit',
    '&:is(h1)': { mt: 3, mb: 2, fontSize: 8 },
    '&:is(h2)': { mt: 3, mb: 2, fontSize: 7 },
    '&:is(h3)': { mt: 3, mb: 2, fontSize: 6 },
    '&:is(h4)': { mt: 2, mb: 1, fontSize: 5 },
    '&:is(h5)': { mt: 2, mb: 1, fontSize: 4 },
    '&:is(h6)': { mt: 2, mb: 1, fontSize: 3 }
  },
  kinds: {
    modal: {
      style: {
        '&&': {
          textTransform: 'uppercase',
          color: 'inherit',
          fontSize: 4,
          letterSpacing: '0.04em'
        }
      }
    },
    layoutNavbar: {
      style: {
        '&&': {
          margin: 0,
          textTransform: 'uppercase',
          color: 'inherit',
          fontSize: 5,
          letterSpacing: '0.04em',
          // Always on dark.
          fontWeight: 300
        }
      }
    },
    feedItem: {
      style: {
        '&&': {
          marginY: 0,
          marginX: 0,
          textTransform: 'uppercase',
          color: 'inherit',
          fontSize: 4,
          fontWeight: 'heading',
          letterSpacing: '0.04em'
        }
      }
    }
  }
};
