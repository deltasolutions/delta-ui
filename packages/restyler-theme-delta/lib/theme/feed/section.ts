import { BasicTheme } from 'restyler';

export const section: BasicTheme = {
  style: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  },
  kinds: {
    small: {
      style: { maxWidth: '550px' }
    },
    medium: {
      style: { maxWidth: '700px' }
    },
    large: {
      style: { maxWidth: '1000px' }
    }
  }
};
