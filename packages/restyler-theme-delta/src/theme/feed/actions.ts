import { BasicTheme } from 'restyler';

export const actions: BasicTheme = {
  style: {
    display: 'flex',
    gap: 2,
    '& button': {
      width: '2.5rem',
      height: '2.5rem',
      borderRadius: '50%',
      backdropFilter: 'invert(0.1)',
      '&:hover': {
        backdropFilter: 'invert(0.15)'
      }
    }
  }
};
