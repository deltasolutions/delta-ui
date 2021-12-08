import { BasicTheme } from 'restyler';

export const body: BasicTheme = {
  style: {
    flex: '1 0 auto',
    // Stretching inner LayoutContainer,
    // then will stretch content too.
    display: 'flex',
    alignItems: 'stretch'
  },
  components: {
    content: {
      style: {
        height: '100%',
        display: 'flex',
        alignItems: 'flex-start'
      }
    }
  }
};
