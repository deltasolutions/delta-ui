import { BasicTheme } from 'restyler';

const titleStyle = {
  zIndex: 1,
  position: 'relative',
  padding: 2,
  color: 'inherit',
  fontWeight: 'heading',
  textTransform: 'uppercase',
  fontSize: 2,
  letterSpacing: '0.04em',
  cursor: 'pointer',
  '& svg': {
    width: '1.3em',
    height: '1.3em',
    marginRight: '0.4em',
    transform: 'translateY(-1.5px)',
    verticalAlign: 'middle'
  },
  '&:hover': {
    opacity: 1,
    color: 'primary',
    svg: {
      color: 'primary'
    }
  }
};

export const menu: BasicTheme = {
  style: {
    paddingX: 3
  },
  components: {
    item: {
      style: ({ isActive }) => ({
        position: 'relative',
        '&:not(:first-of-type)': { marginTop: 1 },
        '&::before': {
          zIndex: 0,
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          left: isActive ? 0 : '15px',
          width: '100%',
          height: '100%',
          borderRadius: 2,
          backgroundColor: isActive ? 'accentSurface' : 'transparent',
          transition: 'all 0.2s'
        }
      }),
      components: {
        title: {
          style: titleStyle
        }
      }
    },
    group: {
      style: {
        '&:not(:first-of-type)': { marginTop: '1' }
      },
      components: {
        title: { style: titleStyle },
        items: { style: { paddingTop: 1, paddingLeft: 4 } }
      }
    }
  }
};
