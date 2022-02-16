import { BasicTheme } from 'restyler';

export const handle: BasicTheme = {
  style: {
    position: 'relative',
    zIndex: 1,
    display: 'inline-block',
    marginLeft: '-1em',
    marginRight: '-1em',
    width: '2em',
    height: '3em',
    verticalAlign: 'middle',
    background: 'transparent',
    cursor: 'col-resize',
    color: 'onSurface',
    filter: 'opacity(0)',
    '&:hover': {
      color: 'primary',
      filter: 'opacity(1)'
    }
  },
  components: {
    icon: {
      style: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        '& svg': {
          width: '1.5em',
          height: '1.5em',
          transform: 'translate(-50%, -50%) rotate(90deg)'
        }
      }
    }
  }
};
