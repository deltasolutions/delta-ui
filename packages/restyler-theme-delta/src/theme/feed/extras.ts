import { BasicTheme } from 'restyler';

export const extras: BasicTheme = {
  style: {
    display: 'flex',
    gap: 2,
    '& button': {
      width: '2.5rem',
      height: '2.5rem',
      borderRadius: '50%',
      backgroundColor: 'accentBackground'
    }
  }
};
