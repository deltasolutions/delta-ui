import { keyframes } from '@emotion/react';
import { BasicTheme } from 'restyler';

const loaderAnimation = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' }
});

export const cell: BasicTheme = {
  style: {
    padding: 3,
    minWidth: '50px',
    display: 'inline-block',
    verticalAlign: 'middle',
    textAlign: 'left',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  kinds: {
    empty: {
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& svg': {
          width: '1.5em',
          height: '1.5em'
        }
      }
    },
    loader: {
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& svg': {
          width: '1.5em',
          height: '1.5em',
          animation: `${loaderAnimation} 2s infinite linear`
        }
      }
    }
  }
};
