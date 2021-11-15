import { BasicTheme } from 'restyler';

export const footer: BasicTheme = {
  style: {
    paddingY: 5,
    marginTop: 'auto',
    backgroundColor: 'exterior'
  },
  components: {
    content: {
      style: {
        fontSize: 2,
        letterSpacing: '0.04em',
        color: 'onExterior',
        // Always on dark.
        fontWeight: 300,
        '& > *': {
          opacity: 0.6,
          '&:hover': { opacity: 1 }
        }
      }
    },
    anchor: {
      style: {
        textDecoration: 'none',
        fontSize: 'inherit',
        fontWeight: 'inherit',
        letterSpacing: 'inherit',
        textTransform: 'uppercase',
        '& > img': {
          filter: 'grayscale(1) contrast(0) brightness(1.7) opacity(0.8)'
        },
        '&:hover': {
          '& > img': {
            filter: 'grayscale(1) contrast(0) brightness(1.5) opacity(1)'
          }
        }
      }
    }
  }
};
