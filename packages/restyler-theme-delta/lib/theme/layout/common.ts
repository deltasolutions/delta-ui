import { merge } from 'restyler';

export const headerHeight = '130px';
export const sidebarWidth = '250px';

export const createCommonExtras = (style: object = {}) =>
  merge(
    {},
    {
      style: {
        '& svg': {
          width: '1.6em',
          height: '1.6em',
          marginY: '-0.3em',
          verticalAlign: 'middle'
        },
        '& button': {
          cursor: 'pointer',
          '&:hover': { color: 'primary' }
        }
      },
      components: {
        content: {
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1
          }
        }
      }
    },
    style
  );

export const roundedMainSegmentKind = {
  style: {
    borderTopLeftRadius: 3,
    overflow: 'hidden'
  }
};
