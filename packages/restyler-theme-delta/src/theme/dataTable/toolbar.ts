import { BasicTheme } from 'restyler';

export const toolbar: BasicTheme = {
  style: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 3,
    borderBottom: '1px solid',
    borderBottomColor: 'border'
  },
  components: {
    content: {
      style: {
        flex: '1 1 auto'
      }
    },
    extras: {
      style: {
        display: 'flex',
        gap: 2
      }
    }
  }
};
