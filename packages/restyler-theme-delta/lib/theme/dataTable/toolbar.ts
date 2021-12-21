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
        flex: '1 1 auto',
        minWidth: 0
      }
    },
    switcher: {
      style: {
        ml: 4,
        display: 'flex',
        gap: 2
      }
    }
  }
};
