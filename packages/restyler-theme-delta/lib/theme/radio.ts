import { BasicTheme } from 'restyler';

export const radio: BasicTheme = {
  components: {
    option: {
      style: {
        '& + &': { marginTop: 2 }
      },
      components: {
        checker: {
          style: ({ isActive, disabled }) => {
            const createStateStyle = (
              borderColor,
              checkerColor,
              checkerSize
            ) => ({
              border: disabled ? '1px dashed' : '1px solid',
              borderColor,
              marginRight: 2,
              borderRadius: '100vw',
              backgroundColor: 'white',
              position: 'relative',
              display: 'inline-block',
              width: '1rem',
              height: '1rem',
              verticalAlign: 'middle',
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: checkerSize,
                height: checkerSize,
                borderRadius: '100vw',
                transition: 'all 0.2s',
                backgroundColor: checkerColor
              }
            });
            return isActive
              ? createStateStyle('primary', 'primary', '0.5rem')
              : createStateStyle('border', 'white', 0);
          }
        },
        label: {
          style: { cursor: 'pointer' }
        }
      }
    },
    group: {}
  }
};
