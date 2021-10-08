import { BasicTheme } from 'restyler';

export const tab: BasicTheme = {
  components: {
    group: {
      style: {
        display: 'flex',
        borderBottom: '1px solid',
        borderBottomColor: 'border'
      }
    },
    option: {
      style: ({ isActive }) => ({
        marginBottom: '-1px',
        paddingX: 3,
        paddingY: 3,
        borderBottom: '2px solid transparent',
        color: 'inherit',
        cursor: 'pointer',
        fontSize: 2,
        fontWeight: 'heading',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        transition: 'all 0.2s',
        '&:hover': { color: 'primary' },
        ...(isActive ? { color: 'primary', borderBottomColor: 'primary' } : {})
      })
    }
  }
};
