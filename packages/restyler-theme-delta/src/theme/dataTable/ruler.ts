import { BasicTheme } from 'restyler';

export const ruler: BasicTheme = {
  style: {
    zIndex: 2,
    position: 'fixed',
    top: 0,
    left: 0,
    width: 0,
    height: '100vh',
    borderRight: '2px dashed',
    borderRightColor: 'primary',
    pointerEvents: 'none'
  }
};
