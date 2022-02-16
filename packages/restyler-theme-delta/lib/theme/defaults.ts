import { BasicTheme } from 'restyler';

export const defaults: BasicTheme = {
  style: {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    border: 'none',
    font: 'inherit',
    fontSize: 'inherit',
    color: 'inherit',
    backgroundColor: 'transparent',
    '&::selection': {
      backgroundColor: 'primary',
      color: 'onPrimary',
      borderRadius: 2
    }
  }
};
