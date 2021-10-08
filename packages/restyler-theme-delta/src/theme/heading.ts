import { BasicTheme } from 'restyler';

export const heading: BasicTheme = {
  style: {
    marginTop: 2,
    marginBottom: 1,
    fontSize: 5,
    letterSpacing: '0.04em',
    fontWeight: 'heading',
    lineHeight: 'heading',
    color: 'inherit'
  },
  kinds: {
    1: { style: { mt: 3, mb: 2, fontSize: 8 } },
    2: { style: { mt: 3, mb: 2, fontSize: 7 } },
    3: { style: { mt: 3, mb: 2, fontSize: 6 } },
    4: { style: { mt: 2, mb: 1, fontSize: 5 } },
    5: { style: { mt: 2, mb: 1, fontSize: 4 } },
    6: { style: { mt: 2, mb: 1, fontSize: 3 } },
    layout: {
      style: {
        margin: 0,
        textTransform: 'uppercase',
        color: 'inherit',
        fontSize: 6,
        letterSpacing: '0.04em',
        // Always on dark.
        fontWeight: 300
      }
    },
    feedItem: {
      style: {
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
};
