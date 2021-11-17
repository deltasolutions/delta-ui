import { BasicTheme } from 'restyler';

export const container: BasicTheme = {
  style: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  components: {
    content: {
      style: {
        width: '80%',
        maxWidth: '1150px',
        '@media screen and (max-width: 500px)': {
          width: 'calc(100% - 2.5rem)'
        }
      }
    }
  }
};
