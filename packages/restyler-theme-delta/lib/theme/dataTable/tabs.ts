import { BasicTheme } from 'restyler';

export const tabs: BasicTheme = {
  style: { display: 'flex', alignItems: 'center' },
  components: {
    item: {
      style: ({ isActive }) => ({
        position: 'relative',
        paddingY: '0.5em',
        paddingX: '0.75em',
        borderRadius: '100vw',
        backgroundColor: isActive ? 'accentSurface' : 'transparent',
        cursor: 'pointer',
        border: '1px solid',
        height: '2.4em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: isActive ? 'border' : 'transparent',
        '& svg': {
          width: '1.5em',
          height: '1.5em'
        },
        '&:hover': isActive
          ? {}
          : {
              color: 'primary'
            }
      })
    }
  }
};
