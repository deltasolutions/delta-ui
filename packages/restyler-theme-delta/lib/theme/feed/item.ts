import { keyframes } from '@emotion/react';
import { BasicTheme } from 'restyler';

const loaderAnimation = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' }
});

export const item: BasicTheme = {
  style: {
    width: '100%',
    overflow: 'hidden',
    color: 'onSurface',
    backgroundColor: 'surface',
    boxShadow: 2,
    borderRadius: 3,
    position: 'relative'
  },
  components: {
    loader: {
      style: ({ isVisible }) => ({
        position: 'absolute',
        top: 3,
        right: 3,
        width: '1.3rem',
        height: '1.3rem',
        transition: 'opacity 0.2s linear',
        opacity: 1,
        ...(isVisible ? {} : { opacity: 0 }),
        '&::after': {
          display: 'block',
          content: '""',
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          borderRadius: '100vw',
          border: '3px solid',
          borderColor: 'border',
          borderTopColor: 'accentBorder',
          animation: `${loaderAnimation} 1.4s infinite linear`
        }
      })
    },
    header: {
      style: {
        px: 3,
        py: 3,
        borderBottom: '1px solid',
        borderBottomColor: 'border'
      },
      kinds: {
        tabs: {
          style: {
            py: 0
          }
        }
      }
    },
    body: {
      style: ({ isLoading }) => ({
        paddingX: 3,
        paddingY: 3,
        opacity: isLoading ? 0.5 : 1,
        filter: isLoading ? 'grayscale(1)' : 'grayscale(0)',
        pointerEvents: isLoading ? 'none' : undefined,
        transition: 'opacity 0.2s linear, filter 0.2s linear',
        '&:not(:last-of-type)': {
          borderBottom: '1px solid',
          borderBottomColor: 'border'
        }
      }),
      kinds: {
        table: {
          style: { px: 0, py: 0 }
        }
      }
    },
    footer: {
      style: {
        px: 3,
        py: 3
      }
    }
  }
};
