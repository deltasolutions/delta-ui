import { BasicTheme } from 'restyler';

export const toolbar: BasicTheme = {
  style: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    padding: 3,
    borderBottom: '1px solid',
    borderBottomColor: 'border'
  },
  components: {
    content: {
      style: {
        flex: '1 1 auto',
        minWidth: 0
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
