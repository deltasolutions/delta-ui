import { BasicTheme } from 'restyler';

export const footer: BasicTheme = {
  style: ({ sidebar }) => ({
    flex: '0 0 auto',
    paddingY: sidebar ? 5 : 4,
    backgroundColor: 'exterior'
  }),
  components: {
    content: {
      style: {
        fontSize: 2,
        letterSpacing: '0.04em',
        color: 'onExterior',
        opacity: 0.6,
        // Always on dark.
        fontWeight: 300
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
