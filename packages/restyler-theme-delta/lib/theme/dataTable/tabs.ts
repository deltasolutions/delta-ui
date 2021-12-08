import { BasicTheme } from 'restyler';

export const tabs: BasicTheme = {
  style: { display: 'flex', alignItems: 'center' },
  components: {
    item: {
      style: ({ isMain, isActive }) => ({
        padding: 2,
        borderRadius: '50%',
        backgroundColor: isActive ? 'accentSurface' : 'transparent',
        cursor: 'pointer',
        border: '1px solid',
        width: '2.4em',
        height: '2.4em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: isActive ? 'border' : 'transparent',
        '& svg': {
          width: '1.7em',
          height: '1.7em'
        },
        '& [data-role="title"]': { display: 'block' },
        '& [data-role="close"]': { display: 'none' },
        '&:hover': isActive
          ? isMain
            ? {}
            : {
                '& [data-role="title"]': { display: 'none' },
                '& [data-role="close"]': { display: 'block' }
              }
          : {
              color: 'primary'
            }
      })
    }
  }
};
