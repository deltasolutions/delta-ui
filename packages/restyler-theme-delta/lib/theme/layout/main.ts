import { BasicTheme } from 'restyler';

export const main: BasicTheme = {
  style: {
    flex: '1 1 auto',
    backgroundColor: 'exterior',
    color: 'onExterior'
  },
  components: {
    content: {
      style: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }
    }
  }
};
