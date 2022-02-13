import { BasicTheme } from 'restyler';

const dimmed = 'rgba(0, 0, 0, 0.25)';

const selectionStyle = ({ isActive }) => ({
  backgroundColor: isActive ? dimmed : undefined
});

const titleStyle = ({ isActive }: { [key: string]: any }) => ({
  zIndex: 1,
  position: 'relative',
  paddingY: 2,
  paddingX: 4,
  color: 'inherit',
  fontWeight: 300,
  fontSize: 2,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  cursor: 'pointer',
  opacity: 0.6,
  '& svg': {
    width: '1.3em',
    height: '1.3em',
    marginRight: '0.5em',
    transform: 'translateY(-1.5px)',
    verticalAlign: 'middle'
  },
  '&:hover': {
    backgroundColor: isActive ? undefined : dimmed,
    color: 'primary',
    opacity: 1,
    '& svg': {
      color: 'primary'
    }
  }
});

export const menu: BasicTheme = {
  style: {},
  components: {
    item: {
      style: selectionStyle,
      components: {
        title: {
          style: titleStyle
        }
      }
    },
    group: {
      style: selectionStyle,
      components: {
        title: {
          style: titleStyle
        },
        items: {
          style: {}
        }
      }
    }
  }
};
