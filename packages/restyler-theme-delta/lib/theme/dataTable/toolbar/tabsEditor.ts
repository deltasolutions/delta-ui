import { BasicTheme } from 'restyler';

export const tabsEditor: BasicTheme = {
  style: {},
  components: {
    list: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      },
      components: {
        item: {
          style: {
            display: 'flex',
            gap: 2
          }
        }
      }
    }
  }
};
