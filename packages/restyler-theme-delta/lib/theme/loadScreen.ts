import { keyframes } from '@emotion/react';
import { BasicTheme } from 'restyler';

const loaderAnimation = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' }
});

export const loadScreen: BasicTheme = {
  style: {
    zIndex: 9900,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'background'
  },
  components: {
    spinner: {
      style: {
        position: 'absolute',
        top: '50%',
        right: '50%',
        width: '2rem',
        height: '2rem',
        transform: 'translate(-50%, -50%)',
        '&::after': {
          display: 'block',
          content: '""',
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          borderRadius: '50%',
          border: '2px solid',
          borderColor: 'border',
          borderTopColor: 'accentBorder',
          animation: `${loaderAnimation} 1.4s infinite linear`
        }
      }
    }
  }
};
