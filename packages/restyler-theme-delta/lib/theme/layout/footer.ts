import { BasicTheme } from 'restyler';

export const footer: BasicTheme = {
  style: {
    flex: '0 0 auto',
    backgroundColor: 'accentBackground',
    color: 'onBackground'
  },
  components: {
    content: {
      style: {
        paddingX: 4,
        paddingTop: 3,
        paddingBottom: 4,
        fontSize: 2,
        letterSpacing: '0.04em',
        opacity: 0.6
      }
    },
    anchor: {
      style: {
        '&, &:focus, &:visited': {
          textDecoration: 'none',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          letterSpacing: 'inherit',
          textTransform: 'uppercase'
        },
        '& img': {
          display: 'inline-block',
          width: '1.3em',
          height: '1.3em',
          marginRight: '0.4rem',
          verticalAlign: 'top',
          filter: 'contrast(0) grayscale(1) brightness(1.4)'
        }
      }
    }
  }
};
