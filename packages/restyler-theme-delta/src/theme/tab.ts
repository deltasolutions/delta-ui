import { BasicTheme } from 'restyler';

export const tab: BasicTheme = {
  components: {
    group: {
      style: {
        display: 'flex'
      }
    },
    option: {
      style: ({ isActive }) => ({
        paddingX: 3,
        paddingY: 3,
        borderBottom: '2px solid transparent',
        color: 'inherit',
        cursor: 'pointer',
        fontSize: 2,
        fontWeight: 'heading',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        '&:hover': { color: 'primary' },
        ...(isActive ? { color: 'primary', borderBottomColor: 'primary' } : {})
      })
    }
  }
};
