import { BasicTheme } from 'restyler';

export const footer: BasicTheme = {
  style: {
    paddingY: 5,
    marginTop: 'auto',
    backgroundColor: 'exterior',
    fontSize: 2,
    letterSpacing: '0.04em',
    // Always on dark.
    fontWeight: 300
  },
  components: {
    anchor: {
      style: {
        color: 'onExterior',
        textDecoration: 'none',
        fontSize: 'inherit',
        fontWeight: 'inherit',
        letterSpacing: 'inherit',
        textTransform: 'uppercase',
        opacity: 0.6,
        transition: 'opacity 0.2s linear',
        '& > img': {
          transition: 'filter 0.2s linear',
          filter: 'grayscale(1) contrast(0) brightness(1.7) opacity(0.8)'
        },
        '&:hover': {
          opacity: 1,
          '& > img': {
            filter: 'grayscale(1) contrast(0) brightness(1.5) opacity(1)'
          }
        }
      }
    }
  }
};
