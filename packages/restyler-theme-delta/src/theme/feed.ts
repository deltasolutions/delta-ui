import { keyframes } from '@emotion/react';
import { BasicTheme } from 'restyler';

const loaderAnimation = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' }
});

export const feed: BasicTheme = {
  style: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 4
  },
  components: {
    section: {
      style: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      },
      kinds: {
        dragReady: {
          style: {
            padding: 3,
            cursor: 'move',
            backdropFilter: 'invert(0.1)',
            borderRadius: 2,
            '&:hover': {
              backdropFilter: 'invert(0.15)'
            }
          }
        },
        dragActive: {
          style: {
            padding: 3,
            visibility: 'hidden'
          }
        },
        dropReady: {
          style: {
            padding: 3,
            borderRadius: 2,
            backdropFilter: 'sepia(1)'
          }
        }
      },
      components: {
        actions: {
          style: {
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            color: 'onBackground',
            fontSize: 4,
            opacity: 0.7
          }
        }
      }
    },
    item: {
      style: {
        width: '100%',
        overflow: 'hidden',
        color: 'onSurface',
        backgroundColor: 'surface',
        boxShadow: 2,
        borderRadius: 2,
        position: 'relative'
      },
      kinds: {
        dragReady: {
          style: {
            cursor: 'move',
            filter: 'opacity(0.65) grayscale(1)',
            '&:hover': { filter: 'unset' }
          }
        },
        dragActive: {
          style: {
            visibility: 'hidden'
          }
        },
        dropReady: {
          style: {
            filter: 'sepia(1)'
          }
        }
      },
      components: {
        loader: {
          style: ({ isVisible }) => ({
            position: 'absolute',
            top: '50%',
            right: '50%',
            transform: 'translate(-50%, -50%)',
            width: '22px',
            height: '22px',
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
            position: 'relative',
            py: 3,
            px: 3,
            borderBottom: '1px solid',
            borderBottomColor: 'border'
          }
        },
        body: {
          style: ({ isLoading }) => ({
            paddingY: 3,
            paddingX: 3,
            transition: 'filter 0.2s linear, opacity 0.2s linear',
            filter: isLoading ? 'grayscale(1)' : 'grayscale(0)',
            opacity: isLoading ? 0.5 : 1,
            pointerEvents: isLoading ? 'none' : 'all',
            '&:not(:last-of-type)': {
              borderBottom: '1px solid',
              borderBottomColor: 'border'
            }
          })
        },
        footer: {},
        table: {
          style: ({ isLoading }) => ({
            transition: 'filter 0.2s linear, opacity 0.2s linear',
            filter: isLoading ? 'grayscale(1)' : 'grayscale(0)',
            opacity: isLoading ? 0.5 : 1,
            pointerEvents: isLoading ? 'none' : 'all'
          })
        },
        tabs: {}
      }
    }
  }
};
