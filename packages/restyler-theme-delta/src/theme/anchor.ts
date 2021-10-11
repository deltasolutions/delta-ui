import { BasicTheme } from 'restyler';

export const anchor: BasicTheme = {
  style: {
    color: 'primary',
    cursor: 'pointer',
    outline: 'none',
    textDecoration: 'none',
    '&:hover, &:focus': {
      textDecoration: 'underline'
    }
  }
};
